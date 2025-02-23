import axios from "axios";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import "./Register.css"; // Özel CSS dosyası

const errorMessages = {
  ad: "Adınızı En az 3 karakter giriniz.",
  soyad: "Soyadınızı En az 3 karakter giriniz.",
  email: "Geçerli bir email adresi giriniz",
  password:
    "En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 sembol ve 1 rakam içermelidir",
};

const initialValues = {
  ad: "",
  soyad: "",
  email: "",
  password: "",
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Register() {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({
    ad: false,
    soyad: false,
    email: false,
    password: false,
  });
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const isFormValid =
      formData.ad.trim().length >= 3 &&
      formData.soyad.trim().length >= 3 &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password);
    setIsValid(isFormValid);
  }, [formData]);

  const validateField = (name, value) => {
    switch (name) {
      case "ad":
      case "soyad":
        return value.trim().length >= 3;
      case "email":
        return emailRegex.test(value);
      case "password":
        return passwordRegex.test(value);
      default:
        return true;
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: !validateField(name, value) });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;

    setIsLoading(true);
    setSubmitMessage("");
    setUserId(null);

    try {
      const response = await axios.post(
        "https://reqres.in/api/users",
        formData
      );
      console.log(response);
      setSubmitMessage("Kayıt başarılı! 🎉");
      setSubmitSuccess(true);
      setUserId(response.data.id);
    } catch (error) {
      console.warn(error);
      setSubmitMessage("Kayıt sırasında bir hata oluştu. 😢");
      setSubmitSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <CardHeader className="card-header">Kayıt Ol</CardHeader>
        <CardBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="ad">Ad</Label>
              <Input
                id="ad"
                name="ad"
                placeholder="Adınızı giriniz"
                type="text"
                onChange={handleChange}
                value={formData.ad}
                invalid={errors.ad}
                className="form-input"
              />
              {errors.ad && (
                <FormFeedback data-cy="error-ad">
                  {errorMessages.ad}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="soyad">Soyad</Label>
              <Input
                id="soyad"
                name="soyad"
                placeholder="Soyadınızı giriniz"
                type="text"
                onChange={handleChange}
                value={formData.soyad}
                invalid={errors.soyad}
                className="form-input"
              />
              {errors.soyad && (
                <FormFeedback data-cy="error-soyad">
                  {errorMessages.soyad}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                placeholder="Emailinizi giriniz"
                type="email"
                onChange={handleChange}
                value={formData.email}
                invalid={errors.email}
                className="form-input"
              />
              {errors.email && (
                <FormFeedback data-cy="error-email">
                  {errorMessages.email}
                </FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="password">Şifre</Label>
              <Input
                id="password"
                name="password"
                placeholder="Güçlü bir şifre giriniz"
                type="password"
                onChange={handleChange}
                value={formData.password}
                invalid={errors.password}
                className="form-input"
              />
              {errors.password && (
                <FormFeedback data-cy="error-password">
                  {errorMessages.password}
                </FormFeedback>
              )}
            </FormGroup>
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              className="submit-button"
            >
              {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
            </Button>
            {submitMessage && (
              <Alert
                color={submitSuccess ? "success" : "danger"}
                className="submit-message"
              >
                {submitMessage}
              </Alert>
            )}
          </Form>
        </CardBody>
        {submitSuccess && userId && (
          <CardFooter className="card-footer">
            <strong>Kullanıcı ID:</strong> {userId}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
