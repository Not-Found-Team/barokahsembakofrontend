import React, { useEffect } from 'react'
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useResolvedPath } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import NotFound from "./NotFound";
import MainStock from "./MainStock"
import MainBarangMasuk from "./MainBarangMasuk"
import MainBarangKeluar from "./MainBarangKeluar"
import MainBarangReject from "./MainBarangReject";
import { useNavigate } from 'react-router-dom';

function MainDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user")) ?? undefined;
    const url = useResolvedPath("").pathname;
    console.log(user);
    useEffect(()=>{
        if (!!!user) return navigate('/Login');
    },[])
    return (
        <div>
            <Container fluid>
                <Header />
            </Container>
            <Container fluid className="mt-5 position-fixed pt-2">
                <Row className="mt-4">
                    <Sidebar url={url} />
                    <Routes>
                        <Route path={`/`} element={<MainStock user={user} />} />
                        <Route path={`/barangmasuk`} element={<MainBarangMasuk />} />
                        <Route path={`/barangkeluar`} element={<MainBarangKeluar />} />
                        <Route path={`/barangreject`} element={<MainBarangReject />} />
                        <Route path={`/"*"`} element={<NotFound />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default MainDashboard