import type { LoginFormData, RegisterFormData } from "@/types/auth";

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm(data: LoginFormData): FieldErrors<LoginFormData> {
  const errors: FieldErrors<LoginFormData> = {};

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "E-mail inválido";
  }

  if (!data.password) {
    errors.password = "Informe sua senha";
  } else if (data.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres";
  }

  return errors;
}

export function validateRegisterForm(
  data: RegisterFormData,
): FieldErrors<RegisterFormData> {
  const errors: FieldErrors<RegisterFormData> = {};

  if (!data.name.trim()) {
    errors.name = "Informe seu nome";
  }

  if (!data.email.trim()) {
    errors.email = "Informe seu e-mail";
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.email = "E-mail inválido";
  }

  if (!data.password) {
    errors.password = "Informe uma senha";
  } else if (data.password.length < 6) {
    errors.password = "A senha deve ter pelo menos 6 caracteres";
  }

  if (!data.confirmPassword) {
    errors.confirmPassword = "Confirme sua senha";
  } else if (data.password !== data.confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem";
  }

  return errors;
}

export function hasErrors<T extends object>(errors: FieldErrors<T>) {
  return Object.keys(errors).length > 0;
}
