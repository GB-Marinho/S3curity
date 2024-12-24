import { DataTable } from "@/components/shared/tabela/data-table";
import { Payment, columns } from "./columns";
import BarraDePesquisa from "@/components/shared/tabela/BarraDePesquisa";
import NewCustomersModal from "@/components/modals/newCustomersModal";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      nome: "John Doe",
      perfil: "Item 1",
      ativo: "SIM",
      horarioTrabalho: "08:00 - 17:00",
      diasTrabalho: "Segunda a Sexta",
    },
    {
      id: "b89f12a1",
      nome: "Jane Smith",
      perfil: "Item 2",
      ativo: "NÃO",
      horarioTrabalho: "09:00 - 18:00",
      diasTrabalho: "Segunda a Sexta",
    },
    {
      id: "c34d67e9",
      nome: "Carlos Silva",
      perfil: "Item 3",
      ativo: "SIM",
      horarioTrabalho: "07:00 - 16:00",
      diasTrabalho: "Segunda a Sábado",
    },
    {
      id: "d12a45f3",
      nome: "Maria Oliveira",
      perfil: "Item 4",
      ativo: "SIM",
      horarioTrabalho: "10:00 - 19:00",
      diasTrabalho: "Segunda a Sexta",
    },
    {
      id: "e87c98d7",
      nome: "Pedro Santos",
      perfil: "Item 2",
      ativo: "NÃO",
      horarioTrabalho: "08:00 - 12:00",
      diasTrabalho: "Segunda a Quarta",
    },
  ];
}

export default async function ManagePage() {
  const data = await getData();

    const sheach = (
      <BarraDePesquisa
        title="Pesquisar Usuários"
        placeholder="Procurar por nome..."
      >
        <NewCustomersModal/>
      </BarraDePesquisa>
    );

  return (
    <div className="w-full h-full container">
       <DataTable columns={columns} data={data} searchBar={sheach} searchFor="nome"/>
    </div>
  );
}
