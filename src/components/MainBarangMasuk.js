import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import * as BsIcon from "react-icons/bs";
import { Calender } from "react-date-range";

function MainBarangMasuk() {
  const [barangMasuk, setbarangMasuk] = useState([]);
  const [isActive, setisActive] = useState(false);
  const [Query, setQuery] = useState("");
  const Url = "http://localhost:3001";

  useEffect(() => {
    axios.get(Url + "/barangmasuk").then((res) => {
      // console.log(res.data)
      setbarangMasuk(res.data);
    });
  }, []);

  const handleClick = () => {
    setisActive(!isActive);
    // if (!isActive) {
    // }
    if (!isActive) {
      axios.get(Url + `/barangmasuk/search?search=${Query}`).then((res) => {
        setbarangMasuk(res.data);
      });
    } else {
      axios.get(Url + "/barangmasuk").then((res) => {
        setbarangMasuk(res.data);
      });
    }
  };

  return (
    <Col xs={10} className="main">
      <Container >
        <Row className="title">
          <Col>
            <h1>Barang Masuk</h1>
          </Col>
        </Row>
        <Row className="content mt-3">
          <Col>
            <Row className="top-content-wrapper">
              <Col xs={12} md lg="3">
                <div className="start-date-wrapper">
                  <label>Date:</label>
                  <input type="date"></input>
                  <BsIcon.BsArrowRightShort className="ms-2" />
                  <input type="date"></input>
                </div>
              </Col>
              <Col xs={12} md lg="3"></Col>
              <Col xs={12} md lg="3">
                <div className="search-wrapper">
                  <input
                    className="search"
                    type="text"
                    value={Query}
                    onChange={(e) => setQuery(e.target.value)}
                    name="search"
                    placeholder="Search..."
                  ></input>
                  <button type="submit" onClick={handleClick}>
                    {isActive ? <BsIcon.BsX /> : <BsIcon.BsSearch />}
                  </button>
                </div>
              </Col>
              <Col xs={12} md lg="3">
                <Button variant="success" className="btn-lg">
                  Tambah
                </Button>
              </Col>
            </Row>
            <Row className="table-wrapper">
              <Col>
                <div>
                  <Table bordered>
                    <thead>
                      <tr>
                        <td>Nama Barang</td>
                        <td>Merk</td>
                        <td>Jumlah</td>
                        <td>Satuan</td>
                        <td>Tanggal</td>
                        <td>Keterangan</td>
                        <td colSpan={2}></td>
                      </tr>
                    </thead>
                    <tbody>
                      {barangMasuk
                        .filter((item) => {
                          return Query.toLowerCase() === ""
                            ? item
                            : item.Stock.nama_barang
                                .toLowerCase()
                                .includes(Query) 
                                ||
                                item.Stock.merk.toLowerCase().includes(Query) ||
                                item.jumlah.toString().toLowerCase().includes(Query) ||
                                item.tanggal.includes(Query) ||
                                item.keterangan.toLowerCase().includes(Query);
                        })
                        .map((val, key) => {
                          return (
                            <tr key={key}>
                              <td>{val.Stock.nama_barang}</td>
                              <td>{val.Stock.merk}</td>
                              <td>{val.jumlah}</td>
                              <td>{val.Stock.satuan}</td>
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

export default MainBarangMasuk;
