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
import { createSecretary } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { TopHeader } from "../_components/TopHeader";

type secretarySchema = z.infer<typeof createSecretary>;

export default function CreateSecretary() {
  const form = useForm<secretarySchema>({
    resolver: zodResolver(createSecretary),
    defaultValues: {
      user: "",
      name: "",
      email: "",
      celula: "",
      backgroundCelula: "",
    },
  });
  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(data: secretarySchema) {
    console.log(data);
  }

  return (
    <div className="mx-6 space-y-6">
      <TopHeader message="Cadastrar um novo Secretario" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 flex flex-col gap-y-5"
        >
          <FormField
            control={form.control}
            name="user"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome de usuário"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome completo"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Insira o e-mail"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="celula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Célula</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Insira o nome de usuário"
                    className="input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="backgroundCelula"
            render={({ field }) => (
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">
                        Clique para carregar
                      </span>
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Input type="file" className="hidden" {...field} />
                  <FormMessage />
                </label>
              </div>
            )}
          />

          <div className="mt-5">
            <Button
              className="p-7 bg-darkRed font-black text-lg hover:bg-darkRed/70 transition-colors"
              rounded="full"
              size="full"
              type="submit"
            >
              Criar Secretario
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
