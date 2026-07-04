"use client";

import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { BRAZILIAN_STATES, type CheckoutFormData } from "@/types/checkout";

interface AddressFormProps {
  values: CheckoutFormData;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
}

export function AddressForm({ values, onChange }: AddressFormProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField label="CEP" htmlFor="cep">
        <Input
          id="cep"
          autoComplete="postal-code"
          placeholder="00000-000"
          value={values.cep}
          onChange={(event) => onChange("cep", event.target.value)}
        />
      </FormField>

      <FormField label="Número" htmlFor="number">
        <Input
          id="number"
          placeholder="123"
          value={values.number}
          onChange={(event) => onChange("number", event.target.value)}
        />
      </FormField>

      <FormField label="Rua" htmlFor="street" className="sm:col-span-2">
        <Input
          id="street"
          autoComplete="street-address"
          placeholder="Nome da rua"
          value={values.street}
          onChange={(event) => onChange("street", event.target.value)}
        />
      </FormField>

      <FormField label="Complemento" htmlFor="complement">
        <Input
          id="complement"
          placeholder="Apto, bloco..."
          value={values.complement}
          onChange={(event) => onChange("complement", event.target.value)}
        />
      </FormField>

      <FormField label="Bairro" htmlFor="neighborhood">
        <Input
          id="neighborhood"
          placeholder="Bairro"
          value={values.neighborhood}
          onChange={(event) => onChange("neighborhood", event.target.value)}
        />
      </FormField>

      <FormField label="Cidade" htmlFor="city">
        <Input
          id="city"
          autoComplete="address-level2"
          placeholder="Cidade"
          value={values.city}
          onChange={(event) => onChange("city", event.target.value)}
        />
      </FormField>

      <FormField label="Estado" htmlFor="state">
        <select
          id="state"
          value={values.state}
          onChange={(event) => onChange("state", event.target.value)}
          className="flex h-10 w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground transition-all duration-200 hover:border-muted focus-visible:border-accent focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_var(--accent-muted)]"
        >
          {BRAZILIAN_STATES.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </FormField>
    </div>
  );
}
