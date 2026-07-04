"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AuthCard } from "@/components/auth/auth-card";
import { AuthDivider } from "@/components/auth/auth-divider";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/components/ui/toast";
import { loginWithCredentials } from "@/lib/auth/actions";
import {
  hasErrors,
  validateLoginForm,
} from "@/lib/auth/validation";
import { useAuthStore } from "@/store/auth-store";
import type { LoginFormData } from "@/types/auth";

const initialForm: LoginFormData = {
  email: "",
  password: "",
};

interface LoginFormProps {
  redirect?: string;
}

export function LoginForm({ redirect }: LoginFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const setUser = useAuthStore((state) => state.setUser);
  const setLoading = useAuthStore((state) => state.setLoading);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof LoginFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateLoginForm(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    setLoading(true);

    const result = await loginWithCredentials(form);

    setSubmitting(false);
    setLoading(false);

    if (result.error || !result.user) {
      showToast(result.error ?? "Não foi possível entrar");
      return;
    }

    setUser(result.user);
    showToast(`Bem-vindo, ${result.user.name}`);
    router.push(redirect && redirect.startsWith("/") ? redirect : "/");
  };

  return (
    <AuthCard
      title="Entrar"
      subtitle="Acesse sua conta para continuar comprando"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField label="E-mail" htmlFor="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
          />
        </FormField>

        <FormField label="Senha" htmlFor="password" error={errors.password}>
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={form.password}
            onChange={(event) =>
              setForm((current) => ({
                ...current,
                password: event.target.value,
              }))
            }
          />
        </FormField>

        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
        >
          {submitting ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <AuthDivider />

      <p className="text-center text-sm text-muted">
        Não tem uma conta?{" "}
        <Link href="/cadastro" className="text-accent hover:underline">
          Criar conta
        </Link>
      </p>

      <p className="mt-4 text-center text-xs text-muted">
        Demo: demo@auratech.com / 123456
      </p>
    </AuthCard>
  );
}
