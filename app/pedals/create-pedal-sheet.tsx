"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

const createPedalFormSchema = z.object({
  acquired_at: z.string().refine((date) => {
    return !isNaN(Date.parse(date))
  }, "Data de aquisição inválida"),
  brand: z.string().min(2).max(100),
  img_url: z.string().optional(),
  name: z.string().min(2).max(100),
  price: z.number().positive("O preço deve ser um número positivo"),
  type: z.enum([
    "gain",
    "modulation",
    "ambience",
    "pitch",
    "dynamics",
    "other",
  ]),
})

type CreatePedalFormData = z.infer<typeof createPedalFormSchema>

export default function CreatePedalSheet() {
  const form = useForm<CreatePedalFormData>({
    resolver: zodResolver(createPedalFormSchema),
  })

  function onSubmit(data: CreatePedalFormData) {
    console.log(data)
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button>Adicionar Pedal</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Adicionar Novo Pedal</SheetTitle>
          <SheetDescription>Preencha os campos para adicionar</SheetDescription>
        </SheetHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 px-4"
        >
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="name">Nome</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="brand"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="brand">Marca</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </SheetContent>
    </Sheet>
  )
}
