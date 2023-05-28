import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import * as BsIcon from 'react-icons/bs'

function MainBarangKeluar() {
  const [barangKeluar, setbarangKeluar] = useState([]);
  const Url = "http://localhost:3001";

  useEffect(() => {
    axios.get(Url + "/barangkeluar").then((res => {
        // console.log(res.data)
        setbarangKeluar(res.data)
    }))
  }, [])

  return (
    <Col xs={10} className="main">
      <Container>
        <Row>
          <Col className="title">
            <h1>Stock</h1>
          </Col>
        </Row>
        <Row>
          <Col className="content mt-3">
            <Row>
              <Col className="top-content-wrapper">
                  <Button variant="success" className="mb-3 btn-lg">
                    Tambah
                  </Button> 
                  <div className="search-wrapper">
                    <input className="search" type="text" name="search" placeholder="Search..."></input> 
                    <a href="#"><BsIcon.BsSearch id="search-icon"/></a>
                  </div>                 
              </Col>
            </Row>
            <div className="table-wrapper">
              <Table bordered>
                <thead>
                  <tr>
                    <td>Nama Barang</td>
                    <td>Merk</td>
                    <td>Jumlah</td>
                    <td>Tanggal</td>
                    <td>Keterangan</td>
                    <td colSpan={2}></td>
                  </tr>
                </thead>
                <tbody>
                  {barangKeluar.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val.Stock.nama_barang}</td>
                        <td>{val.Stock.merk}</td>
                        <td>{val.jumlah}</td>
                        <td>{val.tanggal}</td>
                        <td>{val.keterangan}</td>
                        <td align="center">
                          <Button variant="warning">Edit</Button>
                        </td>
                        <td align="center">
                          <Button variant="danger">Delete</Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="success" className="mt-3 btn-lg">
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </Col>
  );
}

export default MainBarangKeluar;
