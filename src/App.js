import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import SystemsTable from './components/table/SystemsTable';
import { ProjectContext } from './services/ProjectContext';
import { useEffect, useState } from 'react';
import { getInternalDisplay } from './services/InternalService';
import { getExternalDisplay } from './services/ExternalsService';

function App() {
  const [projects, setProjects] = useState([]);
  const [externals, setExternals] = useState([]);
  const [internals, setInternals] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let externals = await getExternalDisplay();
      let internals = await getInternalDisplay();
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
