import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import * as BsIcon from "react-icons/bs";
import Swal from "sweetalert2";
import ModalTransaksiBarang from "./ModalTransaksiBarang";

function MainBarangMasuk() {
  const [barangMasuk, setbarangMasuk] = useState([]);
  const [stock, setStock] = useState([]);
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
  const [showModal, setShow] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const editModal = useRef(null);

  useEffect(() => {
    axios.get(Url + "/barangmasuk").then((res) => {
      setbarangMasuk(res.data);
    });

    axios.get(Url + "/stock").then((res) => setStock(res.data));
  }, []);
  
  const handleChangeSearch = (evt) => {
    const value = evt.target.value;
    setQuery({
      ...Query,
      [evt.target.name]: value,
    });
  };

  const handleClickSearch = (name) => {
    if (name === "selectDate") {
      setisActive1(!isActive1);
      if (!isActive1 && Query.selectDate !== "") {
        axios
          .get(
            Url +
              `/barangmasuk/search?search="${Query.search}"&tanggal=${Query.selectDate}`
          )
          .then((res) => {
            setbarangMasuk(res.data);
          });
      } else {
        axios.get(Url + "/barangmasuk").then((res) => {
          setbarangMasuk(res.data);
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
              `/barangmasuk/search?search="${Query.search}"&startDate=${Query.startDate}&endDate=${Query.endDate}`
          )
          .then((res) => {
            setbarangMasuk(res.data);
          });
      } else {
        axios.get(Url + "/barangmasuk").then((res) => {
          setbarangMasuk(res.data);
        });

        setQuery({
          ...Query,
          startDate: "",
          endDate: "",
        });
      }
    } else if (name === "search") {
      setisActive3(!isActive3);
      if (!isActive3 && Query.search !== "") {
        axios
          .get(Url + `/barangmasuk/search?search=${Query.search}`)
          .then((res) => {
            setbarangMasuk(res.data);
          });
      } else {
        axios.get(Url + "/barangmasuk").then((res) => {
          setbarangMasuk(res.data);
        });

        setQuery({
          ...Query,
          search: "",
        });
      }
    }
  };

  const openModal = () => {
    setShow(!showModal);
  };

  const handleEdit = (val) => {
    setShow(!showModal);
    setEdit(true);
    editModal.current(val);
  };

  const addDataModal = (values, actions) => {
    console.log(values)
    if (!isEdit) {
      axios
        .post(Url + "/barangmasuk", values)
        .then((res) => {
          if (typeof res.data === "string") {
            Swal.fire({
              icon: "warning",
              title: res.data,
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            setbarangMasuk([...barangMasuk, values]);
            setShow(false);
            actions.resetForm();
            Toast.fire({
              icon: "success",
              title: "Add data successfully",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .put(Url + `/barangmasuk/${values.id_barang}`, values)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Edit data successfully",
          });
          setShow(false);
          setEdit(false);
          actions.resetForm();
          setbarangMasuk(
            barangMasuk.map((val) => {
              if (val.id_barangMasuk === values.id_barang) {
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

  const handleDelete = (id, key) => {
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
          .delete(Url + `/barangmasuk/${id}`)
          .then((res) => {
            setbarangMasuk(barangMasuk.filter((item, index) => index !== key));
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

  return (
    <Col xs={10} className="main">
      <Container>
        <Row className="title">
          <Col>
            <h1>Barang Masuk</h1>
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
                    onChange={handleChangeSearch}
                  ></input>
                  <button onClick={() => handleClickSearch("selectDate")}>
                    {isActive1 && Query.selectDate !== "" ? (
                      <BsIcon.BsX />
                    ) : (
                      <BsIcon.BsSearch />
                    )}
                  </button>
                </div>
                <div className="start-date-wrapper mt-2">
                  <label>Tanggal:</label>
                  <input
                    type="date"
                    value={Query.startDate}
                    name="startDate"
                    onChange={handleChangeSearch}
                  ></input>
                  <BsIcon.BsArrowRightShort className="ms-2" />
                  <input
                    type="date"
                    value={Query.endDate}
                    name="endDate"
                    onChange={handleChangeSearch}
                  ></input>
                  <button
                    disabled={
                      (!Query.startDate && Query.endDate) ||
                      (Query.startDate && !Query.endDate)
                    }
                    onClick={() => handleClickSearch("rangeDate")}
                  >
                    {isActive2 && Query.startDate !== "" ? (
                      <BsIcon.BsX />
                    ) : (
                      <BsIcon.BsSearch />
                    )}
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
                    onChange={handleChangeSearch}
                    name="search"
                    placeholder="Search..."
                  ></input>
                  <button onClick={() => handleClickSearch("search")}>
                    {isActive3 && Query.search !== "" ? (
                      <BsIcon.BsX />
                    ) : (
                      <BsIcon.BsSearch />
                    )}
                  </button>
                </div>
              </Col>
              <Col
                xs={2}
                className="d-flex justify-content-center align-items-end"
              >
                <Button
                  onClick={openModal}
                  variant="success"
                  className="btn-lg"
                >
                  Tambah
                </Button>

                <ModalTransaksiBarang
                  show={showModal}
                  onHide={() => {
                    setShow(false);
                    setEdit(false);
                  }}
                  dataBarang={stock}
                  handleSubmitModal={addDataModal}
                  editModal={editModal}
                  editMode={isEdit}
                />
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
                      {barangMasuk
                        .filter((item) => {
                          return Query.search.toLowerCase() === ""
                            ? item
                            : item.nama_barang
                                .toLowerCase()
                                .includes(Query.search) ||
                                item.merk
                                  .toLowerCase()
                                  .includes(Query.search) ||
                                item.jumlahBarangMasuk
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
                              <td>{val.jumlahBarangMasuk}</td>
                              <td>{val.satuan}</td>
                              <td>{val.tanggal}</td>
                              <td>{val.keterangan}</td>
                              <td align="center">
                                <Button
                                  onClick={() => handleEdit(val)}
                                  variant="warning"
                                >
                                  Edit
                                </Button>
                              </td>
                              <td align="center">
                                <Button
                                  onClick={() =>
                                    handleDelete(val.id_barangMasuk, key)
                                  }
                                  variant="danger"
                                >
                                  Delete
                                </Button>
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
