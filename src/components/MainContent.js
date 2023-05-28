// import { Container, Row, Col, ModalTitle } from "react-bootstrap";
// import Table from "react-bootstrap/Table"
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useLocation, useParams } from "react-router-dom";

// function MainContent() {
//   // const location = useLocation()
//   let {params} = useParams()
//   let title = ""
//   let thead = ""
//   let dataTable = []

//   const [Stock, setStock] = useState([])
//   const [barangMasuk, setbarangMasuk] = useState([])
//   const [barangKeluar, setbarangKeluar] = useState([])
//   const Url = "http://localhost:3001"

//   useEffect(() => {
//     const getStock = axios.get(Url+"/stock")
//     const getBarangMasuk = axios.get(Url+"/barangmasuk")
//     const getBarangKeluar = axios.get(Url+"/barangKeluar")

//     axios.all([getStock,getBarangMasuk,getBarangKeluar]).then(
//       axios.spread((...allData) => {
//         setStock(allData[0].data)
//         setbarangMasuk(allData[1].data)
//         setbarangKeluar(allData[2].data)
//       })
//     )
//   }, [])
  
//   if (params === "Stock") {
//     title = <h1>Stock</h1>
//     thead = <tr>
//       <td>Nama Barang</td>
//       <td>Merk</td>
//       <td>Jenis Barang</td>
//       <td>Jumlah</td>
//       <td>Satuan</td>
//       <td></td>
//     </tr>
//     dataTable = Stock
//   } else if (params === "barangmasuk") {
//     title = <h1>Barang Masuk</h1>
//     thead = <tr>
//       <td>Nama Barang</td>
//       <td>Merk</td>
//       <td>Jenis Barang</td>
//       <td>Jumlah</td>
//       <td>Tanggal</td>
//       <td>Keterangan</td>
//       <td></td>
//     </tr>
//     dataTable = barangMasuk
//   } else if (params === "barangkeluar") {
//     title = <h1>Barang Keluar</h1>
//     thead = <tr>
//       <td>Nama Barang</td>
//       <td>Merk</td>
//       <td>Jenis Barang</td>
//       <td>Jumlah</td>
//       <td>Tanggal</td>
//       <td>Keterangan</td>
//       <td></td>
//     </tr>
//     dataTable = barangKeluar
//   }

//   console.log(dataTable)
  
//   return (
//     <Col xs={10} className="main">
//       <Container>
//         <Row className="title">          
//             {title}
//         </Row>
//         <Row className="content bg-white mt-4 p-4 rounded">
//             <Table bordered hover>
//                 <thead>
//                     {thead}
//                 </thead>
//                 <tbody>
//                       {dataTable.map((val, key) => {
//                         return (
//                           <tr>
//                               <td>{val.nama_barang}</td>
//                           </tr>                          
//                         )
//                       })}
//                 </tbody>
//             </Table>
//         </Row>
//       </Container>
//     </Col>
//   );
// }

// export default MainContent;
