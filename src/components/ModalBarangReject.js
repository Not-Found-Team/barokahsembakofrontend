import { useState, useEffect } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { ErrorMessage, useFormik } from "formik";
import { barangKeluarValidation } from "./FormValidation";

function ModalBarangReject({
  dataBarang,
  editModal,
  data,
  handleSubmitModal,
  ...props
}) {
  const [submitted, setSubmit] = useState(true);

  useEffect(() => {
    editModal.current = onEdit;
  });

  const onSubmit = (values, actions) => {
    setSubmit(true);
    handleSubmitModal(values, actions);
  };

  const onEdit = (val) => {
    const name = Object.keys(val);
    name.map((name) => setFieldValue(name, val[name]));
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      nama_barang: "",
      merk: "",
      jumlah: "",
      tanggal: "",
      satuan: "",
      keterangan: "",
      keteranganReject: "",
    },
    validationSchema: barangKeluarValidation,
    enableReinitialize: true,
    onSubmit,
  });


  return (
    <Modal {...props} size="md" centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <h4 className="text-center fw-bold mb-4">Tambah Data</h4>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            {errors.nama_barang && !submitted && (
              <span className="float-end text-danger">
                {errors.nama_barang}
              </span>
            )}
            <Form.Label>Nama</Form.Label>
            <Form.Control
              disabled={true}
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
              disabled={true}
              type="text"
              name="merk"
              placeholder="Merk..."
              value={values.merk}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
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
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            {errors.satuan === "*Required" && !submitted && (
              <span className="float-end text-danger">{errors.jumlah}</span>
            )}
            <Form.Label>Satuan</Form.Label>
            <Form.Control
              disabled={true}
              type="text"
              name="satuan"
              placeholder="Satuan..."
              value={values.satuan}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Tanggal</Form.Label>
            <Form.Control
              disabled={true}
              type="date"
              name="tanggal"
              placeholder="Tanggal..."
              value={values.tanggal}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
            <Form.Label>Keterangan</Form.Label>
            <Form.Control
              as="textarea"
              name="keterangan"
              value={values.keterangan}
              autoFocus
              onBlur={handleBlur}
              onChange={handleChange}
              rows={3}
            />
          </Form.Group>
          <Button
            variant="warning"
            type="submit"
            disabled={isSubmitting}
            onClick={() => values.jumlah === "" && setSubmit(false)}
            className="ms-2 mt-3 float-end"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            disabled={isSubmitting}
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

export default ModalBarangReject;
