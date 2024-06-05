export const columns = [
  {
    name: 'Id',
    selector: (row) => row.id,
    sortable: true,
  },
  {
    name: 'Nome',
    selector: (row) => row.nome,
    sortable: true,
  },
  {
    name: 'Matricula',
    selector: (row) => row.matricula,
    sortable: true,
  },
  {
    name: 'Idade',
    selector: (row) => row.idade,
    sortable: true,
  },
];
