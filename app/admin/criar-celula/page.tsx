"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCelula } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TopHeader } from "../_components/TopHeader";

type secretarySchema = z.infer<typeof createCelula>;

export default function CreateCelula() {
  const form = useForm<secretarySchema>({
    resolver: zodResolver(createCelula),
    defaultValues: {
      name: "",
      adress: "",
      host: "",
      leader: "",
      secretary: "",
      trainingLeader: "",
    },
  });

  function onSubmit(data: secretarySchema) {
    console.log(data);
  }

  return (
    <div className="mx-6 space-y-6">
      <TopHeader message="Cadastrar uma nova célula" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-y-5"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome de Usuário"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="secretary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Secretario</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome do Secretario"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Anfitrião</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome do Anfitrião"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="leader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Líder</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome do Líder"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="trainingLeader"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Líder em treinamento</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome do Líder em treinamento"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="adress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o Endereço"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-5">
            <Button
              className="p-7 bg-darkRed font-black text-lg hover:bg-darkRed/70 transition-colors"
              rounded="full"
              size="full"
              type="submit"
            >
              Criar Célula
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
