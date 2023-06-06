import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NotFound from "./components/NotFound";
import MainStock from "./components/MainStock"
import MainBarangMasuk from "./components/MainBarangMasuk"
import MainBarangKeluar from "./components/MainBarangKeluar"
import MainBarangReject from "./components/MainBarangReject"
import "./App.css";

// react date range style 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

function App() {
  return (
    <Router>
      <Container fluid>
        <Header />
      </Container>
      <Container fluid className="mt-5 position-fixed pt-2">
        <Row className="mt-4">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainStock />} />
            <Route path="/barangmasuk" element={<MainBarangMasuk />} />
            <Route path="/barangkeluar" element={<MainBarangKeluar />} />
            <Route path="/barangreject" element={<MainBarangReject />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
