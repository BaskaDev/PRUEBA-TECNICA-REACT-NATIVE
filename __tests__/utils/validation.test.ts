import {
  validateEmail,
  validatePassword,
  validateTransferValue,
  validatePayeerDocument,
  validateLoginForm,
} from "../../src/shared/utils/validation";

describe("validateEmail", () => {
  it("returns null for valid email", () => {
    expect(validateEmail("test@example.com")).toBeNull();
  });

  it("returns error for empty email", () => {
    expect(validateEmail("")).toBe("El email es requerido");
  });

  it("returns error for invalid format", () => {
    expect(validateEmail("invalid")).toBe("Formato de email inválido");
  });
});

describe("validatePassword", () => {
  it("returns null for valid password", () => {
    expect(validatePassword("1234")).toBeNull();
  });

  it("returns error for empty password", () => {
    expect(validatePassword("")).toBe("La contraseña es requerida");
  });

  it("returns error for short password", () => {
    expect(validatePassword("12")).toBe("La contraseña debe tener al menos 4 caracteres");
  });
});

describe("validateTransferValue", () => {
  it("returns null for valid positive number", () => {
    expect(validateTransferValue("100")).toBeNull();
  });

  it("returns error for empty value", () => {
    expect(validateTransferValue("")).toBe("El valor es requerido");
  });

  it("returns error for zero", () => {
    expect(validateTransferValue("0")).toBe("El valor debe ser un número positivo");
  });

  it("returns error for negative", () => {
    expect(validateTransferValue("-10")).toBe("El valor debe ser un número positivo");
  });
});

describe("validatePayeerDocument", () => {
  it("returns null for valid document", () => {
    expect(validatePayeerDocument("12345678900")).toBeNull();
  });

  it("returns error for empty document", () => {
    expect(validatePayeerDocument("")).toBe("El documento del destinatario es requerido");
  });

  it("returns error for short document", () => {
    expect(validatePayeerDocument("12")).toBe("Número de documento inválido");
  });
});

describe("validateLoginForm", () => {
  it("returns empty errors for valid inputs", () => {
    const errors = validateLoginForm("test@test.com", "1234");
    expect(Object.keys(errors)).toHaveLength(0);
  });

  it("returns errors for invalid inputs", () => {
    const errors = validateLoginForm("bad", "12");
    expect(errors.email).toBe("Formato de email inválido");
    expect(errors.password).toBe("La contraseña debe tener al menos 4 caracteres");
  });
});
