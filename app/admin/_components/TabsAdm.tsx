"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { FiFilePlus, FiUserPlus } from "react-icons/fi";
import { Celulas } from "./Celulas";
import { Members } from "./Members";

export function TabsAdm() {
  return (
    <Tabs defaultValue="atalhos">
      <TabsList className="grid grid-cols-3 rounded-full mb-4">
        <TabsTrigger value="atalhos">Atalhos</TabsTrigger>
        <TabsTrigger value="membros">Membros</TabsTrigger>
        <TabsTrigger value="celulas">Células</TabsTrigger>
      </TabsList>
      <TabsContent value="atalhos" className="grid grid-cols-2 gap-2">
        <Link
          href="/admin/criar-secretario"
          className="w-full border rounded-3xl center items-center flex-col py-10 space-y-3 cursor-pointer hover:border-neutral-200 transition-colors"
        >
          <FiUserPlus className="text-4xl" />
          <div className="text-center">
            <p>Criar</p>
            <p>Secretario</p>
          </div>
        </Link>
        <Link
          href="/admin/criar-celula"
          className="w-full border rounded-3xl center items-center flex-col py-10 space-y-3 cursor-pointer hover:border-neutral-200 transition-colors"
        >
          <FiFilePlus className="text-4xl" />
          <div className="text-center">
            <p>Criar</p>
            <p>Célula</p>
          </div>
        </Link>

        <Link
          href="/admin/criar-membro/undefined"
          className="w-full border rounded-3xl center items-center flex-col py-10 space-y-3 cursor-pointer hover:border-neutral-200 transition-colors"
        >
          <FiFilePlus className="text-4xl" />
          <div className="text-center">
            <p>Criar</p>
            <p>Membro</p>
          </div>
        </Link>
      </TabsContent>
      <TabsContent value="membros">
        <Members />
      </TabsContent>
      <TabsContent value="celulas">
        <Celulas />
      </TabsContent>
    </Tabs>
  );
}
