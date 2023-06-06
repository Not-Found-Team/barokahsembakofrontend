import { Container, Row, Col, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useEffect, useRef, useState } from "react";
import * as BsIcon from "react-icons/bs";
import axios from "axios";
import ModalAddStock from "./ModalAddStock";
import Swal from "sweetalert2";

function MainStock() {
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
  const [Query, setQuery] = useState("");
  const [isActive, setisActive] = useState(false);
  const [showModal, setShow] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const editModal = useRef(null);

  useEffect(() => {
    axios.get(Url + "/stock").then((res) => {
      // console.log(res.data);
      setStock(res.data);
    });
  }, []);

  const handleChange = (evt) => {
    setQuery(evt.target.value);
  };

  const handleClick = () => {
    setisActive(!isActive);
  };

  const openModal = () => {
    setShow(!showModal);
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
                console.log("test")
                return {...val, 
                  nama_barang: values.nama_barang,
                  jenis_barang: values.jenis_barang,
                  merk: values.merk,
                  jumlah: values.jumlah,
                  satuan: values.satuan,
                  harga: values.harga,
                }
              } else {
                return val
              }
            })
          )
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
              title: "Add stock successfully",
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
            <h1>Barang Keluar</h1>
          </Col>
        </Row>
        <Row className="content mt-3">
          <Col>
            <Row className="d-flex flex-row">
              <Col
                xs={10}
                className="d-flex flex-row justify-content-end align-items-end"
              >
                <div className="search-wrapper w-25">
                  <input
                    className="search"
                    type="text"
                    value={Query}
                    onChange={handleChange}
                    name="search"
                    placeholder="Search..."
                  ></input>
                  <button onClick={handleClick}>
                    {isActive ? <BsIcon.BsX /> : <BsIcon.BsSearch />}
                  </button>
                </div>
              </Col>
              <Col
                xs={2}
                className="d-flex justify-content-center align-items-end"
              >
                <Button
                  variant="success"
                  className="btn-lg"
                  onClick={openModal}
                >
                  Tambah
                </Button>

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
            <Row className="table-wrapper mt-4">
              <Col>
                <div>
                  <Table bordered>
                    <thead>
                      <tr>
                        <td>Nama Barang</td>
                        <td>Merk</td>
                        <td>Jenis Barang</td>
                        <td>Jumlah</td>
                        <td>Satuan</td>
                        <td>Harga</td>
                        <td colSpan={2}></td>
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
                            <td>{val.jenis_barang}</td>
                            <td>{val.jumlah}</td>
                            <td>{val.satuan}</td>
                            <td>Rp. {val.harga}</td>
                            <td align="center">
                              <Button
                                variant="warning"
                                onClick={() => editData(val)}
                              >
                                Edit
                              </Button>
                            </td>
                            <td align="center">
                              <Button
                                variant="danger"
                                onClick={() => deleteData(val.id_barang, key)}
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

export default MainStock;
