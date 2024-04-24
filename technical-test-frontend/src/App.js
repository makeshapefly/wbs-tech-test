import React, { useMemo, useState, useEffect } from 'react';
import useScreenSize from './hooks/useScreenSize';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Login from './components/Login';
import LoggedInPanel from './components/LoggedInPanel';
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from './auth/config'
import Dashboard from './components/Dashboard';

function App() {
  const screenSize = useScreenSize();
  const containerStyle = useMemo(() => ({ width: screenSize.width }), []);
  const [user, setUser] = useState('');

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const getUser = async () => {
            const userRef = collection(db, "user");
            const q = query(userRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              setUser(doc.data())
            });
          }
          if (user != null && user != '') {
            getUser()
          }
        } else {
          console.log("no user found");
        }
      });
    };
    checkAuth();
  }, []);

  return (
    <Router>
      <div className="App" style={containerStyle}>
        <Navbar expand="lg" className="App-header">
          <Container style={containerStyle}>
            <Navbar.Brand href="#home" style={{ color: '#FFF' }}>Business in Practice - KPI Rankings</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="header-user">
                <LoggedInPanel user={user} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
        </div>
        <section style={{ marginTop: 30 }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}

export default App;
