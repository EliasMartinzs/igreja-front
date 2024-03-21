"use client";
import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

export default function CalendarCelula() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="grid place-items-center">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
        locale={ptBR}
      />
    </div>
  );
}
