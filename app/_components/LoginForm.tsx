"use client";
import { loginSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type loginValidation = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<loginValidation>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      user: "",
      password: "",
    },
  });
  const router = useRouter();

  function onSubmit(data: loginValidation) {
    const parsedData = loginSchema.safeParse(data);

    if (parsedData.success) {
      router.push("/admin");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full h-full gap-y-5 flex flex-col"
      >
        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nome do usuário"
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Insira sua senha"
                  className="input"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-auto mb-10">
          <Button
            className="p-7 bg-darkRed font-black text-lg hover:bg-darkRed/70 transition-colors"
            rounded="full"
            size="full"
          >
            Entrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
