import { cellsArray } from "@/constants";

export function Members() {
  return (
    <div className="space-y-6">
      {cellsArray.map(({ membros }) =>
        membros.map(({ nome, telefone }) => (
          <div key={nome} className="border-b p-3 shadow-inner space-y-2">
            <div className="w-full flex items-center justify-between">
              <p>{nome}</p>
              <small>Pegar nome da celula ou nao</small>
            </div>
            <p>{telefone}</p>
          </div>
        ))
      )}
    </div>
  );
}
