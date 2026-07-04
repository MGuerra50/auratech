/**
 * Stub auth actions — replace with NextAuth signIn/signUp when integrating.
 * Session shape aligns with future NextAuth Session.user fields:
 * id, name, email
 */
import type { AuthResult, LoginFormData, RegisterFormData } from "@/types/auth";

const MOCK_DELAY_MS = 600;
const registeredEmails = new Set<string>(["demo@auratech.com"]);

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function loginWithCredentials(
  data: LoginFormData,
): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS);

  if (data.email === "demo@auratech.com" && data.password === "123456") {
    return {
      user: {
        id: "user-demo",
        name: "Usuário Demo",
        email: data.email,
      },
    };
  }

  if (registeredEmails.has(data.email) && data.password.length >= 6) {
    return {
      user: {
        id: `user-${data.email}`,
        name: data.email.split("@")[0],
        email: data.email,
      },
    };
  }

  return { error: "E-mail ou senha inválidos" };
}

export async function registerUser(
  data: RegisterFormData,
): Promise<AuthResult> {
  await delay(MOCK_DELAY_MS);

  if (registeredEmails.has(data.email)) {
    return { error: "Este e-mail já está cadastrado" };
  }

  registeredEmails.add(data.email);

  return {
    user: {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
    },
  };
}
