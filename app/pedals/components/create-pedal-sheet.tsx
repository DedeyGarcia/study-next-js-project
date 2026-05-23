"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { apiFetch } from "@/lib/api-client"
import { queryKeys } from "@/lib/query-keys"
import {
  CreatePedalFormData,
  createPedalFormSchema,
  CreatePedalRequest,
  pedalTypeDict,
  pedalTypeOptions,
} from "@/types/pedals"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"

interface CreatePedalSheetProps {
  disabled?: boolean
}

export default function CreatePedalSheet({ disabled }: CreatePedalSheetProps) {
  const qc = useQueryClient()

  const form = useForm<CreatePedalFormData>({
    resolver: zodResolver(createPedalFormSchema),
    defaultValues: {
      name: "",
      brand: "",
      img_url: "",
      acquired_at: "",
      price: 0,
      type: "gain",
    },
  })

  function onSubmit(data: CreatePedalFormData) {
    createPedal.mutate(data)
  }

  const createPedal = useMutation({
    mutationFn: (input: CreatePedalRequest) =>
      apiFetch("/api/v1/pedals", { method: "POST", body: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: queryKeys.pedals.all }),
  })

  return (
    <Sheet onOpenChange={(open) => !open && form.reset()}>
      <SheetTrigger asChild>
        <Button className="active:translate-y-px" disabled={disabled}>
          Adicionar Pedal
        </Button>
      </SheetTrigger>
      <SheetContent id="create-pedal-sheet">
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

          <FieldGroup>
            <Controller
              name="type"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field orientation="vertical" data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel>Tipo</FieldLabel>
                  </FieldContent>
                  <Select
                    name="type"
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="form-select-type"
                      aria-invalid={fieldState.invalid}
                      className="min-w-30"
                    >
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      {pedalTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {pedalTypeDict[option]}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />
          </FieldGroup>

          <FieldGroup>
            <Controller
              name="acquired_at"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="acquired_at">
                    Data de Aquisição
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="date"
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
              name="img_url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="img_url">URL da Imagem</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="url"
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
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="price">Preço</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type="number"
                    // TODO: treat NAN futurely
                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                    value={field.value}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Button type="submit" className="self-end">
            Salvar
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  )
}
