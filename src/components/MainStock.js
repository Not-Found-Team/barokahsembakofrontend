import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import * as BsIcon from 'react-icons/bs'
import axios from "axios";

function MainStock() {
  const [Stock, setStock] = useState([]);
  const Url = "http://localhost:3001";

  useEffect(() => {
    axios.get(Url + "/stock").then((res) => {
      console.log(res.data);
      setStock(res.data);
    });
  }, []);

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
                    <td>Jenis Barang</td>
                    <td>Jumlah</td>
                    <td>Satuan</td>
                    <td colSpan={2}></td>
                  </tr>
                </thead>
                <tbody>
                  {Stock.map((val, key) => {
                    return (
                      <tr key={key}>
                        <td>{val.nama_barang}</td>
                        <td>{val.merk}</td>
                        <td>{val.jenis_barang}</td>
                        <td>{val.jumlah}</td>
                        <td>{val.satuan}</td>
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

export default MainStock;
