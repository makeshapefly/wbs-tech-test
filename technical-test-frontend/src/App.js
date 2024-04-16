import React, { useMemo } from 'react';
import useScreenSize from './hooks/useScreenSize';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import KpiDataTable from './components/KpiDataTable';

function App() {
  const screenSize = useScreenSize();
  const containerStyle = useMemo(() => ({ width: screenSize.width, height: screenSize.height -200, marginTop: 50, padding: 10 }), []);
  return (
    <Router>
      <div className="App" style={containerStyle}>
      <div>
        <h1>Business in Practice - KPI Rankings</h1>
      </div>
        <section>                              
            <Routes>                                                                        
               <Route path="/" element={<KpiDataTable/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  );
}

export default App;
