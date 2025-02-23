describe("Register Form Testleri", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // Uygulamanızın URL'sini buraya yazın
  });

  it("Başarılı form gönderimi - Kullanıcı ID gözüküyor", () => {
    // Form alanlarını doldur
    cy.get("#ad").type("Ahmet");
    cy.get("#soyad").type("Yılmaz");
    cy.get("#email").type("ahmet.yilmaz@example.com");
    cy.get("#password").type("Password123!");

    // Submit butonuna tıkla
    cy.get(".submit-button").click();

    // Kullanıcı ID'sinin görüntülendiğini kontrol et
    cy.get(".card-footer").should("be.visible").contains("Kullanıcı ID:");
  });

  it("Email yanlış girildiğinde hata mesajı görünüyor ve buton disabled", () => {
    // Form alanlarını doldur (email yanlış)
    cy.get("#ad").type("Ahmet");
    cy.get("#soyad").type("Yılmaz");
    cy.get("#email").type("yanlis-email");
    cy.get("#password").type("Password123!");

    // Hata mesajının görüntülendiğini kontrol et
    cy.get('[data-cy="error-email"]')
      .should("be.visible")
      .contains("Geçerli bir email adresi giriniz");

    // Submit butonunun disabled olduğunu kontrol et
    cy.get(".submit-button").should("be.disabled");
  });

  it("Email ve password yanlış girildiğinde 2 hata mesajı görünüyor ve buton disabled", () => {
    // Form alanlarını doldur (email ve password yanlış)
    cy.get("#ad").type("Ahmet");
    cy.get("#soyad").type("Yılmaz");
    cy.get("#email").type("yanlis-email");
    cy.get("#password").type("yanlis");

    // Hata mesajlarının görüntülendiğini kontrol et
    cy.get('[data-cy="error-email"]')
      .should("be.visible")
      .contains("Geçerli bir email adresi giriniz");
    cy.get('[data-cy="error-password"]')
      .should("be.visible")
      .contains(
        "En az 8 karakter, 1 büyük harf, 1 küçük harf, 1 sembol ve 1 rakam içermelidir"
      );

    // Submit butonunun disabled olduğunu kontrol et
    cy.get(".submit-button").should("be.disabled");
  });
});
