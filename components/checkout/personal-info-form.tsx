"use client";

import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import type { CheckoutFormData } from "@/types/checkout";

interface PersonalInfoFormProps {
  values: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

export function PersonalInfoForm({ values, onChange }: PersonalInfoFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField label="Nome completo" htmlFor="fullName" className="sm:col-span-2">
        <Input
          id="fullName"
          autoComplete="name"
          placeholder="Seu nome completo"
          value={values.fullName}
          onChange={(event) => onChange("fullName", event.target.value)}
        />
      </FormField>

      <FormField label="E-mail" htmlFor="email">
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="seu@email.com"
          value={values.email}
          onChange={(event) => onChange("email", event.target.value)}
        />
      </FormField>

      <FormField label="Telefone" htmlFor="phone">
        <Input
          id="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(11) 99999-9999"
          value={values.phone}
          onChange={(event) => onChange("phone", event.target.value)}
        />
      </FormField>
    </div>
  );
}
