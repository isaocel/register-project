describe("İlk Ziyaret", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
  });
});

describe("Başarılı Form Gönderimi", () => {
  it("Form başarıyla gönderildiğinde kullanıcı ID gözüküyor", () => {
    cy.visit("http://localhost:5173");
    cy.get("#ad").type("İsa");
    cy.get("#soyad").type("Öcel");
    cy.get("#email").type("isaocel@gmail.com");
    cy.get("#password").type("Password123!.?");
    cy.get(".submit-button").click();

    cy.get(".card-footer").should("be.visible").contains("ID:");
  });
});

describe("Hatalı Form Gönderimi - Email Yanlış", () => {
  it("Email yanlış girildiğinde hata mesajı görünüyor ve buton disabled", () => {
    cy.visit("http://localhost:5173");
    cy.get("#ad").type("Ahmet");
    cy.get("#soyad").type("Yılmaz");
    cy.get("#email").type("yanlis-email");
    cy.get("#password").type("Password123!.?");
    cy.get(".form-feedback")
      .should("be.visible")
      .contains("Geçerli bir email adresi giriniz");
    cy.get(".submit-button").should("be.disabled");
  });
});
