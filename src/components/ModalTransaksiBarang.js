import { useState, useEffect } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import { barangValidation } from "./FormValidation";

function ModalTransaksiBarang({
  dataBarang,
  editModal,
  editMode,
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
    setFieldValue("jenis_barang", "dumy");
    setFieldValue("harga", 1);
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
      harga: "",
      jumlahBarangMasuk: "",
      jumlahBarangReject: "",
      tanggal: "",
      satuan: "",
      keterangan: "",
      keteranganReject: "",
    },
    validationSchema: barangValidation,
    enableReinitialize: true,
    onSubmit,
  });

  console.log(values);
  console.log(errors);

  const handleErrorSubmit = () => {
    if (
      values.nama_barang === "" ||
      values.merk === "" ||
      values.jumlahBarangMasuk === "" ||
      values.tanggal
    ) {
      setSubmit(!submitted);
    }
  };

  // const handleSuggestion = (val) => {
  //   values.nama_barang && setFieldValue("nama_barang", val.nama_barang);
  //   values.merk && setFieldValue("merk", val.merk);
  //   if (values.nama_barang === val.nama_barang || values.merk === val.merk) {
  //     setFieldValue("satuan", val.satuan);
  //   }
  // };

  console.log(editMode);

  return (
    <Modal {...props} size="lg" centered>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Container>
            <Row>
              <Col>
                <h4 className="text-center fw-bold mb-4">Tambah Data</h4>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <div className="fw-bold">Barang Masuk:</div>
                <div className="border border-dark mb-3 w-50"></div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
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
                {/* {values.nama_barang && (
                      <div className="search-result mb-2 ps-2 rounded">
                        {dataBarang
                          .filter((val) => {
                            return (
                              values.nama_barang &&
                              val.nama_barang
                                .toLowerCase()
                                .includes(values.nama_barang.toLowerCase()) &&
                              values.nama_barang !== val.nama_barang
                            );
                          })
                          .map((val, key) => (
                            <div key={key} onClick={() => handleSuggestion(val)}>
                              {val.nama_barang}
                            </div>
                          ))}
                      </div>
                    )} */}
                {/* {values.merk && (
                      <div className="search-result mb-2 ps-2 rounded">
                        {dataBarang
                          .filter((val) => {
                            return (
                              values.nama_barang === val.nama_barang &&
                              val.merk
                                .toLowerCase()
                                .includes(values.merk.toLowerCase()) &&
                              values.merk !== val.merk
                            );
                          })
                          .map((val, key) => (
                            <div key={key} onClick={() => handleSuggestion(val)}>
                              {val.merk}
                            </div>
                          ))}
                      </div>
                    )} */}
                {!editMode && (
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    {errors.harga === "*Required" && !submitted && (
                      <span className="float-end text-danger">
                        {errors.harga}
                      </span>
                    )}
                    <Form.Label>Harga</Form.Label>
                    <Form.Control
                      type="text"
                      name="harga"
                      placeholder="Harga..."
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
                )}
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  {errors.jumlahBarangMasuk === "*Required" && !submitted && (
                    <span className="float-end text-danger">
                      {errors.jumlahBarangMasuk}
                    </span>
                  )}
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control
                    type="text"
                    name="jumlahBarangMasuk"
                    placeholder="Jumlah..."
                    value={values.jumlahBarangMasuk}
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={
                      errors.jumlahBarangMasuk !== "*Required" ? "mb-2" : ""
                    }
                  />
                  {errors.jumlahBarangMasuk !== "*Required" &&
                    values.jumlahBarangMasuk !== "" && (
                      <span className="text-danger">
                        {errors.jumlahBarangMasuk}
                      </span>
                    )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  {errors.satuan === "*Required" && !submitted && (
                    <span className="float-end text-danger">
                      {errors.jumlah}
                    </span>
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
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Tanggal</Form.Label>
                  <Form.Control
                    type="date"
                    name="tanggal"
                    placeholder="Tanggal..."
                    value={values.tanggal}
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
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
                <div className="fw-bold">Barang Reject:</div>
                <div className="border border-dark mb-3 w-50"></div>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  {errors.jumlahBarangReject === "*Required" && !submitted && (
                    <span className="float-end text-danger">
                      {errors.jumlahBarangReject}
                    </span>
                  )}
                  <Form.Label>Jumlah</Form.Label>
                  <Form.Control
                    type="text"
                    name="jumlahBarangReject"
                    placeholder="Jumlah..."
                    value={values.jumlahBarangReject}
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className={
                      errors.jumlahBarangReject !== "*Required" ? "mb-2" : ""
                    }
                  />
                  {errors.jumlahBarangReject !== "*Required" &&
                    touched.jumlahBarangReject &&
                    values.jumlahBarangReject !== "" && (
                      <span className="text-danger">
                        {errors.jumlahBarangReject}
                      </span>
                    )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput4"
                >
                  <Form.Label>Keterangan</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="keteranganReject"
                    value={values.keteranganReject}
                    autoFocus
                    onBlur={handleBlur}
                    onChange={handleChange}
                    rows={3}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <Button
            variant={editMode ? "warning" : "success"}
            type="submit"
            disabled={isSubmitting}
            onClick={handleErrorSubmit}
            className="ms-2 mt-3 float-end"
          >
            {editMode ? "Edit" : "Tambah"}
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

export default ModalTransaksiBarang;
