export function validateEmail(email: string): string | null {
  if (!email.trim()) {
    return "El email es requerido";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Formato de email inválido";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "La contraseña es requerida";
  }
  if (password.length < 4) {
    return "La contraseña debe tener al menos 4 caracteres";
  }
  return null;
}

export function validateTransferValue(value: string): string | null {
  const num = Number.parseFloat(value);
  if (!value.trim()) {
    return "El valor es requerido";
  }
  if (Number.isNaN(num) || num <= 0) {
    return "El valor debe ser un número positivo";
  }
  return null;
}

export function validatePayeerDocument(doc: string): string | null {
  if (!doc.trim()) {
    return "El documento del destinatario es requerido";
  }
  if (doc.length < 5) {
    return "Número de documento inválido";
  }
  return null;
}

export function validateLoginForm(email: string, password: string): Record<string, string> {
  const errors: Record<string, string> = {};
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  return errors;
}
