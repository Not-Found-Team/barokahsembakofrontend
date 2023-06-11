import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
  DropdownButton,
  ButtonGroup,
} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useRef, useState } from "react";
import * as BsIcon from "react-icons/bs";
import axios from "axios";
import ModalAddStock from "./ModalAddStock";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function MainStock(props) {
  const user = props?.user;
  console.log(user);
  const Url = "http://localhost:3001";
  const Toast = Swal.mixin({
    toast: true,
    position: "bottom-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
  const [Stock, setStock] = useState([]);
  const [barangreject, setbarangReject] = useState([]);
  const [Query, setQuery] = useState("");
  const [isActive, setisActive] = useState(false);
  const [showModal, setShow] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [dropdownStock, setOpenDdStock] = useState(false);
  const [dropdownReject, setOpenDdReject] = useState(false);
  const editModal = useRef(null);
  const navigate = useNavigate();
  let countStock = 0;
  let countReject = 0;

  useEffect(() => {
    axios.get(Url + "/stock").then((res) => {
      // console.log(res.data);
      setStock(res.data);
    });
    axios.get(Url + "/barangreject").then((res) => setbarangReject(res.data));
  }, []);

  const handleChangeSearch = (evt) => {
    setQuery(evt.target.value);
  };

  const handleClickSearch = () => {
    setisActive(!isActive);
    if (!isActive) {
      axios.get(Url + `/stock/search?search="${Query}"`).then((res) => {
        setStock(res.data);
      });
    } else {
      axios.get(Url + "/stock").then((res) => {
        setStock(res.data);
      });
      setQuery("");
    }
  };

  const editData = (val) => {
    setShow(!showModal);
    setEdit(true);
    editModal.current(val, true);
    // console.log(val);
    // return val
    // axios.post(Url+`/stock/${id}`)
  };

  const addDataModal = (values, actions) => {
    console.log(values);
    if (!isEdit) {
      axios
        .post(Url + "/stock", values)
        .then((res) => {
          if (typeof res.data === "string") {
            Swal.fire({
              icon: "warning",
              title: res.data,
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            setStock([...Stock, values]);
            setShow(false);
            actions.resetForm();
            console.log("submitted");

            Toast.fire({
              icon: "success",
              title: "Add stock successfully",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(Url + `/stock/${values.id_barang}`, values)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Edit stock successfully",
          });
          setShow(false);
          setEdit(false);
          actions.resetForm();
          setStock(
            Stock.map((val) => {
              if (val.id_barang === values.id_barang) {
                console.log("test");
                return {
                  ...val,
                  nama_barang: values.nama_barang,
                  jenis_barang: values.jenis_barang,
                  merk: values.merk,
                  jumlah: values.jumlah,
                  satuan: values.satuan,
                  harga: values.harga,
                };
              } else {
                return val;
              }
            })
          );
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteData = (id, key) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009165",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(Url + `/stock/${id}`)
          .then((res) => {
            setStock(Stock.filter((item, index) => index !== key));
            Toast.fire({
              icon: "success",
              title: "Delete data successfully",
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
            console.log(err);
          });
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Col xs={10} className="main">
      <Container>
        <Row className="title">
          <Col>
            <h1>Stock</h1>
          </Col>
        </Row>
        <Row className="content mt-3">
          <Col>
            <Row className="d-flex flex-row">
              <Col xs={3} className="position-relative">
                <Card>
                  <Card.Header>Jumlah Barang</Card.Header>
                  <Card.Body>
                    <button
                      onClick={() => setOpenDdStock(!dropdownStock)}
                      className="dropdown-btn float-end"
                    >
                      {!dropdownStock ? (
                        <BsIcon.BsChevronDown />
                      ) : (
                        <BsIcon.BsChevronUp />
                      )}
                    </button>
                    <Card.Text className="fw-bold">
                      {Stock.map((val) => {
                        countStock++;
                      })}
                      {countStock}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <div
                  className={`dropdown-stock mt-2 ${
                    dropdownStock ? "active" : ""
                  }`}
                >
                  {Stock.map((val, key) => {
                    return (
                      <div className="mb-2">
                        <Row className="d-flex flex-row align-items-center">
                          <Col xs={3}>
                            <span key={key}>{val.nama_barang}</span>
                          </Col>
                          <Col xs={5}>
                            <span key={key}>{val.merk}</span>
                          </Col>
                          <Col xs={4}>
                            <span key={key}>{val.jumlah}</span>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col xs={3} className="position-relative">
                <Card>
                  <Card.Header>Barang Reject</Card.Header>
                  <Card.Body>
                    <button
                      onClick={() => setOpenDdReject(!dropdownReject)}
                      className="dropdown-btn float-end"
                    >
                      {!dropdownReject ? (
                        <BsIcon.BsChevronDown />
                      ) : (
                        <BsIcon.BsChevronUp />
                      )}
                    </button>
                    <Card.Text className="text-danger fw-bold">
                      {barangreject.map((val) => {
                        countReject++;
                      })}
                      {countReject}
                    </Card.Text>
                  </Card.Body>
                </Card>
                <div
                  className={`dropdown-reject mt-2 ${
                    dropdownReject ? "active" : ""
                  }`}
                >
                  {barangreject.map((val, key) => {
                    return (
                      <div >
                        <Row className="d-flex flex-row align-items-center">
                          <Col xs={3}>
                            <span key={key}>{val.nama_barang}</span>
                          </Col>
                          <Col xs={5}>
                            <span key={key}>{val.merk}</span>
                          </Col>
                          <Col xs={4}>
                            <Button key={key} variant="danger">
                              Info Reject
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col
                xs={6}
                className="d-flex flex-row justify-content-end align-items-end"
              >
                <div className="search-wrapper w-50 justify-content-between pt-2 ps-3">
                  <input
                    className="search"
                    type="text"
                    value={Query}
                    onChange={handleChangeSearch}
                    name="search"
                    placeholder="Search..."
                  ></input>
                  <button onClick={handleClickSearch}>
                    {Query !== "" && isActive ? (
                      <BsIcon.BsX />
                    ) : (
                      <BsIcon.BsSearch />
                    )}
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="table-wrapper mt-4">
              <Col>
                <div>
                  <Table bordered hover>
                    <thead>
                      <tr>
                        <td>Nama Barang</td>
                        <td>Merk</td>
                        <td>Jumlah</td>
                        <td>Satuan</td>
                        <td>Harga</td>
                        {user?.role === "admin" && <td colSpan={2}></td>}
                      </tr>
                    </thead>
                    <tbody>
                      {Stock.filter((item) => {
                        return Query.toLowerCase() === ""
                          ? item
                          : item.nama_barang.toLowerCase().includes(Query) ||
                              item.merk.toLowerCase().includes(Query) ||
                              item.jumlah
                                .toString()
                                .toLowerCase()
                                .includes(Query) ||
                              item.satuan.toLowerCase().includes(Query);
                      }).map((val, key) => {
                        return (
                          <tr key={key}>
                            <td>{val.nama_barang}</td>
                            <td>{val.merk}</td>
                            <td
                              className={val.jumlah <= 100 ? "text-danger" : ""}
                            >
                              {val.jumlah}
                              {val.jumlah <= 100 && (
                                <button
                                  className="float-end limitter"
                                  onClick={() => navigate("/index/barangmasuk")}
                                >
                                  +
                                </button>
                              )}
                            </td>
                            <td>{val.satuan}</td>
                            <td>Rp. {val.harga}</td>
                            {user?.role === "admin" && [
                              <td align="center">
                                <Button
                                  variant="warning"
                                  onClick={() => editData(val)}
                                >
                                  Edit
                                </Button>
                              </td>,
                              <td align="center">
                                <Button
                                  variant="danger"
                                  onClick={() => deleteData(val.id_barang, key)}
                                >
                                  Delete
                                </Button>
                              </td>,
                            ]}
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Nama Barang</td>
                        <td>Merk</td>
                        <td>Jumlah</td>
                        <td>Satuan</td>
                        <td>Harga</td>
                        {user?.role === "admin" && <td colSpan={2}></td>}
                      </tr>
                    </tfoot>
                  </Table>
                </div>
                <ModalAddStock
                  show={showModal}
                  onHide={() => {
                    setShow(false);
                    setEdit(false);
                    editModal.current(null);
                  }}
                  handleSubmitModal={addDataModal}
                  editModal={editModal}
                  editMode={isEdit}
                />
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
          <Col>
            <button
              className="mt-3 logout float-end fw-bold"
              onClick={handleLogout}
            >
              LOGOUT
            </button>
          </Col>
        </Row>
      </Container>
    </Col>
  );
}

export default MainStock;
