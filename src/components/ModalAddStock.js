import { useState, useEffect } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { ErrorMessage, useFormik } from "formik";
import { stockValidation } from "./FormValidation";

function ModalAddStock({
  editModal,
  editMode,
  data,
  handleSubmitModal,
  ...props
}) {
  const [submitted, setSubmit] = useState(true);
  const [editValues, setValues] = useState(null);

  useEffect(() => {
    editModal.current = onEdit;
  });

  const onSubmit = (values, actions) => {
    setSubmit(true);
    handleSubmitModal(values, actions);
  };

  const onEdit = (val, isEdit) => {
    console.log(isEdit);
    if (!isEdit) {
      setValues(null);
    } else {
      setValues({
        id_barang: val.id_barang,
        nama_barang: val.nama_barang,
        jenis_barang: val.jenis_barang,
        merk: val.merk,
        // jumlah: val.jumlah,
        satuan: val.satuan,
        harga: val.harga,
      });
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: editValues || {
      id_barang: "",
      nama_barang: "",
      jenis_barang: "",
      merk: "",
      jumlah: 0,
      satuan: "",
      harga: "",
    },
    validationSchema: stockValidation,
    enableReinitialize: true,
    onSubmit,
  });

  const handleErrorSubmit = () => {
    if (
      values.nama_barang === "" ||
      values.jenis_barang === "" ||
      values.merk === "" ||
      // values.jumlah === "" ||
      values.satuan === "" ||
      values.harga === ""
    ) {
      setSubmit(false);
    }
  };

  return (
    <Modal {...props} size="md" centered>
      <Modal.Body>
        <h4 className="text-center fw-bold mb-4">Tambah Stock</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {errors.nama_barang && !submitted && (
              <span className="float-end text-danger">
                {errors.nama_barang}
              </span>
            )}
            <Form.Label>Nama</Form.Label>
            <Form.Control
              type="text"
              name="nama_barang"
              placeholder="Nama Barang..."
              value={values.nama_barang}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            {errors.merk && !submitted && (
              <span className="float-end text-danger">{errors.merk}</span>
            )}
            <Form.Label>Merk</Form.Label>
            <Form.Control
              type="text"
              name="merk"
              placeholder="Merk..."
              value={values.merk}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            {errors.jenis_barang && !submitted && (
              <span className="float-end text-danger">
                {errors.jenis_barang}
              </span>
            )}
            <Form.Label>Jenis Barang</Form.Label>
            <Form.Control
              type="text"
              name="jenis_barang"
              placeholder="Jenis Barang..."
              value={values.jenis_barang}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            {errors.harga === "*Required" && !submitted && (
              <span className="float-end text-danger">{errors.harga}</span>
            )}
            <Form.Label>Harga</Form.Label>
            <Form.Control
              type="text"
              name="harga"
              placeholder="Harga...(Ex:50000)"
              value={values.harga}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
              className={errors.harga !== "*Required" ? "mb-2" : ""}
            />
            {errors.harga !== "*Required" && values.harga !== "" && (
              <span className="text-danger">{errors.harga}</span>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
            {errors.satuan && !submitted && (
              <span className="float-end text-danger">{errors.satuan}</span>
            )}
            <Form.Label>Satuan</Form.Label>
            <Form.Control
              type="text"
              name="satuan"
              placeholder="Satuan..."
              value={values.satuan}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            {errors.jumlah === "*Required" && !submitted && (
              <span className="float-end text-danger">{errors.jumlah}</span>
            )}
            <Form.Label>Jumlah</Form.Label>
            <Form.Control
              type="text"
              name="jumlah"
              placeholder="Jumlah..."
              value={values.jumlah}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
              className={errors.jumlah !== "*Required" ? "mb-2" : ""}
            />
            {errors.jumlah !== "*Required" && values.jumlah !== "" && (
              <span className="text-danger">{errors.jumlah}</span>
            )}
          </Form.Group> */}
          
          <Button
            variant={editMode?"warning":"success"}
            type="submit"
            disabled={isSubmitting}
            onClick={handleErrorSubmit}
            className={isSubmitting?"ms-2 mt-3 float-end opacity-50":"ms-2 mt-3 float-end"}
          >
            {editMode?"Edit":"Tambah"}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              props.onHide();
              resetForm();
              setSubmit(true);
            }}
            className="mt-3 float-end"
          >
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddStock;
