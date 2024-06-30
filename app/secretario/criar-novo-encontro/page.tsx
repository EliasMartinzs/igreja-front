import React from 'react';
import { CriarNovoEncontroForm } from './_components/CriarNovoEncontroForm';
import { pegarCelulas } from '@/services/celula';
import { pegarMembros } from '@/services/membros';

export default async function CriarNovoEncontro() {
    const celulas = await pegarCelulas();
    const membros = await pegarMembros();

    return <CriarNovoEncontroForm celulas={celulas} membros={membros} />;
}
