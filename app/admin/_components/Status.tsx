export function Status() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex w-full gap-2">
        <div className="border rounded-3xl w-[40%] py-6 px-4">
          <p className="text-5xl font-semibold mb-1">6</p>
          <p>Células</p>
        </div>
        <div className="border rounded-3xl flex-1 py-6 px-4">
          <p className="text-5xl font-semibold mb-1">130</p>
          <p>Membros</p>
          <p>Cadastrados</p>
        </div>
      </div>
      <div className="flex w-full">
        <div className="border rounded-3xl flex-1 py-6 px-4">
          <p className="text-5xl font-semibold mb-1">30</p>
          <p>Encontros no</p>
          <p>Ultimo mês</p>
        </div>
      </div>
    </div>
  );
}
