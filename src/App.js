import './App.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';

import SystemsTable from './components/table/SystemsTable';
import { ProjectContext } from './services/ProjectContext';
import { useEffect, useState } from 'react';
import { getExternalFactor } from './services/ProjectService';
import { getInternalDisplay } from './services/InternalService';

function App() {
  const [projects, setProjects] = useState([]);
  const [externals, setExternals] = useState([]);
  const [internals, setInternals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setExternals(await getExternalFactor());
      setInternals(await getInternalDisplay());
    }
    fetchData();
  }, []);

  
  return <>
    <ProjectContext.Provider value={{ projects, setProjects, externals, setExternals, internals, setInternals }}>
      <SystemsTable></SystemsTable>
    </ProjectContext.Provider>
  </>
}

export default App;
