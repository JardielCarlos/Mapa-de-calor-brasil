import { useEffect, useState } from "react";
import { api } from "../services/api";
import DataTable from "react-data-table-component";
import { columns } from "../utils/collumns";

export default function ListStudent(){

  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    api.get('/estudante')
		.then((response) => {
      setStudents(response.data)
		})
    .catch((error) => {
      setError(new Error());
    })
  }, [])

  if (error) {
    throw error;
  }

  let filtragem = students.filter(student => {
    return Object.values(student).some(s => 
      s.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });

  return (
    <>
      <input 
        type="text"
        onChange={e => setFilterText(e.target.value)}
        value={filterText}
      />
      <DataTable
        title="Alunos"
        columns={columns}
        data={filtragem}
        pagination
      />
      {/* <ul>
        {
          students.map(student => (
            <li key={student.id}>{student.nome}</li>
          ))
        }
      </ul> */}
    </>
  )
}
