import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotFound from "./components/NotFound";
import MainStock from "./components/MainStock"
import MainBarangMasuk from "./components/MainBarangMasuk"
import MainBarangKeluar from "./components/MainBarangKeluar"
import "./App.css";

// react date range style 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {
  return (
    <Router>
      <Container fluid>
        <Header />
        <Row className="body-content">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainStock />} />
            <Route path="/barangmasuk" element={<MainBarangMasuk />} />
            <Route path="/barangkeluar" element={<MainBarangKeluar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
