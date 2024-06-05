import { Suspense, lazy } from "react";
import MapChart from "./components/MapChart";
  
function App() {

  // const ListStudent = lazy(() => import('./components/ListStudents'))

  const ListStudent = lazy(() => 
    new Promise(resolve => 
      setTimeout(resolve, 2000) // Ajuste este valor para o atraso da api desejado
    ).then(() => import('./components/ListStudents'))
  );


  
  return (
    <div className="App" >
        {/* <Suspense fallback={<h1>Loading Time...</h1>}>
          <ListStudent />
        </Suspense> */}

      <h1>Hello World</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <MapChart />
      </div>
    </div>
  );
}

export default App;
