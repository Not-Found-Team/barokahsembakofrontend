import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import MainDashboard from "./components/MainDashboard";

import "./App.css";
// react date range style 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Navigate to="/Login" replace />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Index/*" element={<MainDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
