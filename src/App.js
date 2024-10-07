import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import SystemsTable from './components/table/SystemsTable';
import { ProjectContext } from './services/ProjectContext';
import { useEffect, useState } from 'react';
import { getExternalFactor, getInternalFactor } from './services/ProjectService';
import { getInternalDisplay } from './services/InternalService';

function App() {
  const [projects, setProjects] = useState([]);
  const [externals, setExternals] = useState([]);
  const [internals, setInternals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let externals = await getExternalFactor();
      let internals = await getInternalFactor();
      externals.status === 200 ? setExternals(externals.data) : setError(externals.message + ' -- שגיאה בקבלת גופים חיצוניים');
      internals.status === 200 ? setInternals(internals.data) : setError(internals.message + ' --שגיאה בקבלת גופים פנימיים');
    }
    fetchData();
  }, []);


  return <>
    <ProjectContext.Provider value={{ projects, setProjects, externals, setExternals, internals, setInternals, error, setError }}>
      <SystemsTable></SystemsTable>
    </ProjectContext.Provider>
  </>
}

export default App;
