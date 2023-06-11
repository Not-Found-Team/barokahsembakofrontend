import * as yup from "yup";

export const stockValidation = yup.object().shape({
  nama_barang: yup.string().required("*Required"),
  merk: yup.string().required("*Required"),
  jenis_barang: yup.string().required("*Required"),
  // jumlah: yup
  //   .number()
  //   .typeError("Jumlah barang harus berupa angka")
  //   .positive("Harap masukkan input dengan benar")
  //   .max(1000001, "Harap masukkan input dengan benar")
  //   .required("*Required"),
  satuan: yup.string().required("*Required"),
  harga: yup
    .number()
    .typeError("Harga barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .required("*Required"),
});

export const barangValidation = yup.object().shape({
  nama_barang: yup.string().required("*Required"),
  merk: yup.string().required("*Required"),
  harga: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar")
    .required("*Required"),
  jumlahBarangReject: yup
    .number().test('compare', 'Jumlah barang tidak mencukupi',
    function(value) {
      let val2 = this.resolve(yup.ref('jumlahBarangMasuk'))
      if (value > val2) {
        return false
      } else {
        return true
      }
    })
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar"),
  jumlahBarangMasuk: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar")
    .required("*Required"),
  tanggal: yup.string().required("*Required"),
  satuan: yup.string().required("*Required"),
});

export const barangKeluarValidation = yup.object().shape({
  nama_barang: yup.string().required("*Required"),
  merk: yup.string().required("*Required"),
  jumlah: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar")
    .required("*Required"),
  tanggal: yup.string().required("*Required"),
  satuan: yup.string().required("*Required"),
});

export const barangRejectValidation = yup.object().shape({
  nama_barang: yup.string().required("*Required"),
  merk: yup.string().required("*Required"),
  jumlah: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar")
    .required("*Required"),
  tanggal: yup.string().required("*Required"),
  satuan: yup.string().required("*Required"),
});
