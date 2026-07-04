import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Criar conta | Aura Tech",
  description: "Cadastre-se na Aura Tech",
};

export default function RegisterPage() {
  return <RegisterForm />;
}
