import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import axios from "axios";
import * as BsIcon from "react-icons/bs";

function MainBarangKeluar() {
  const [barangkeluar, setbarangkeluar] = useState([]);
  const [isActive1, setisActive1] = useState(false);
  const [isActive2, setisActive2] = useState(false);
  const [isActive3, setisActive3] = useState(false);
  const [Query, setQuery] = useState({
    selectDate: "",
    startDate: "",
    endDate: "",
    search: "",
  });
  const Url = "http://localhost:3001";

  useEffect(() => {
    axios.get(Url + "/barangkeluar").then((res) => {
      setbarangkeluar(res.data);
    });
  }, []);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setQuery({
      ...Query,
      [evt.target.name]: value,
    });
  };

  const handleClick = (name) => {
    if (name === "selectDate") {
      setisActive1(!isActive1);
      if (!isActive1 && Query.selectDate !== "") {
        axios
          .get(
            Url +
              `/barangkeluar/search?search="${Query.search}"&tanggal=${Query.selectDate}`
          )
          .then((res) => {
            setbarangkeluar(res.data);
          });
      } else {
        axios.get(Url + "/barangkeluar").then((res) => {
          setbarangkeluar(res.data);
        });

        setQuery({
          ...Query,
          selectDate: "",
        });
      }
    } else if (name === "rangeDate") {
      setisActive2(!isActive2);
      if (!isActive2 && (Query.startDate !== "" || Query.endDate !== "")) {
        axios
          .get(
            Url +
              `/barangkeluar/search?search="${Query.search}"&startDate=${Query.startDate}&endDate=${Query.endDate}`
          )
          .then((res) => {
            setbarangkeluar(res.data);
          });
      } else {
        axios.get(Url + "/barangkeluar").then((res) => {
          setbarangkeluar(res.data);
        });

        setQuery({
          ...Query,
          startDate: "",
          endDate: "",
        });
      }
    } else if (name === "search") {
      setisActive3(!isActive3);
      if (!isActive3) {
        axios
          .get(Url + `/barangkeluar/search?search=${Query.search}`)
          .then((res) => {
            setbarangkeluar(res.data);
          });
      } else {
        axios.get(Url + "/barangkeluar").then((res) => {
          setbarangkeluar(res.data);
        });

        setQuery({
          ...Query,
          search: "",
        });
      }
    }
  };

  console.log(Query);

  return (
    <Col xs={10} className="main">
      <Container>
        <Row className="title">
          <Col>
            <h1>Barang Keluar</h1>
          </Col>
        </Row>
        <Row className="content mt-3">
          <Col>
            <Row className="d-flex flex-row top-content-wrapper">
              <Col
                xs={6}
                className="d-flex flex-column justify-content-end align-items-start "
              >
                <div className="select-date-wrapper">
                  <label>Tanggal:</label>
                  <input
                    type="date"
                    value={Query.selectDate}
                    name="selectDate"
                    onChange={handleChange}
                  ></input>
                  <button onClick={() => handleClick("selectDate")}>
                    {isActive1 ? <BsIcon.BsX /> : <BsIcon.BsSearch />}
                  </button>
                </div>
                <div className="start-date-wrapper mt-2">
                  <label>Tanggal:</label>
                  <input
                    type="date"
                    value={Query.startDate}
                    name="startDate"
                    onChange={handleChange}
                  ></input>
                  <BsIcon.BsArrowRightShort className="ms-2" />
                  <input
                    type="date"
                    value={Query.endDate}
                    name="endDate"
                    onChange={handleChange}
                  ></input>
                  <button
                    disabled={
                      (!Query.startDate && Query.endDate) ||
                      (Query.startDate && !Query.endDate)
                    }
                    onClick={() => handleClick("rangeDate")}
                  >
                    {isActive2 ? <BsIcon.BsX /> : <BsIcon.BsSearch />}
                  </button>
                </div>
              </Col>
              <Col
                xs={4}
                className="d-flex flex-row justify-content-end align-items-end"
              >
                <div className="search-wrapper">
                  <input
                    className="search"
                    type="text"
                    value={Query.search}
                    onChange={handleChange}
                    name="search"
                    placeholder="Search..."
                  ></input>
                  <button onClick={() => handleClick("search")}>
                    {isActive3 ? <BsIcon.BsX /> : <BsIcon.BsSearch />}
                  </button>
                </div>
              </Col>
              <Col
                xs={2}
                className="d-flex justify-content-center align-items-end"
              >
                <Button variant="success" className="btn-lg">
                  Tambah
                </Button>
              </Col>
            </Row>
            <Row className="table-wrapper mt-4">
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
                      {barangkeluar
                        .filter((item) => {
                          return Query.search.toLowerCase() === ""
                            ? item
                            : item.nama_barang
                                .toLowerCase()
                                .includes(Query.search) ||
                                item.merk
                                  .toLowerCase()
                                  .includes(Query.search) ||
                                item.jumlah
                                  .toString()
                                  .toLowerCase()
                                  .includes(Query.search) ||
                                item.satuan
                                  .toLowerCase()
                                  .includes(Query.search) ||
                                item.tanggal.includes(Query.search) ||
                                item.keterangan
                                  .toLowerCase()
                                  .includes(Query.search);
                        })
                        .map((val, key) => {
                          return (
                            <tr key={key}>
                              <td>{val.nama_barang}</td>
                              <td>{val.merk}</td>
                              <td>{val.jumlah}</td>
                              <td>{val.satuan}</td>
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

export default MainBarangKeluar;
