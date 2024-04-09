import React, { useMemo } from 'react';
import useScreenSize from './hooks/useScreenSize';
import './App.css';
import KpiDataTable from './components/KpiDataTable'

function App() {
  const screenSize = useScreenSize();
  const containerStyle = useMemo(() => ({ width: screenSize.width, height: screenSize.height -200, marginTop: 50, padding: 10 }), []);
  return (
    <div className="App" style={containerStyle}>
      <div>
        <h1>Business in Practice - KPI Rankings</h1>
      </div>
      <KpiDataTable />
    </div>
  );
}

export default App;
