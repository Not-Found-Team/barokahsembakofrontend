import * as yup from "yup";

export const stockValidation = yup.object().shape({
  nama_barang: yup.string().required("*Required"),
  merk: yup.string().required("*Required"),
  jenis_barang: yup.string().required("*Required"),
  jumlah: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar")
    .required("*Required"),
  satuan: yup
    .string()
    .required("*Required"),
  harga: yup
    .number()
    .typeError("Harga barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .required("*Required"),
});

export const barangValidation = yup.object().shape({
  nama_barang: yup.string().required("*Required"),
  merk: yup.string().required("*Required"),
  jumlahBarangMasuk: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar")
    .required("*Required"),
  jumlahBarangReject: yup
    .number()
    .typeError("Jumlah barang harus berupa angka")
    .positive("Harap masukkan input dengan benar")
    .max(1000001, "Harap masukkan input dengan benar"),
  tanggal: yup.string().required("*Required"),
  satuan: yup
    .string()
    .required("*Required"),
});
