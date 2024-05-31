// import React, { useState } from "react";
// import Table from "react-bootstrap/Table";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import "../css/ReservarClases.css";

// const ReservarClases = () => {
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   return (
//     <div className="contenedor-rc">
//       <div className="contenedor-hijo-rc">
//         <h1>Reservar Clases</h1>
//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Dia</th>
//               <th>Hora</th>
//               <th>Profesor</th>
//               <th>Reservar</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Jueves</td>
//               <td>10:00</td>
//               <td>Mariano Ocampos</td>
//               <td>
//                 <Button variant="primary" onClick={handleShow}>
//                   Reservar
//                 </Button>
//                 <Modal show={show} onHide={handleClose}>
//                   <Modal.Header closeButton>
//                     <Modal.Title>Clase de ...</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     Estas seguro de querer reservar esta clase?
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                       No
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                       Si!
//                     </Button>
//                   </Modal.Footer>
//                 </Modal>
//               </td>
//             </tr>
//             <tr>
//               <td>Jueves</td>
//               <td>10:00</td>
//               <td>Mariano Ocampos</td>
//               <td>
//                 <Button variant="primary" onClick={handleShow}>
//                   Reservar
//                 </Button>
//                 <Modal show={show} onHide={handleClose}>
//                   <Modal.Header closeButton>
//                     <Modal.Title>Clase de ...</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Body>
//                     Estas seguro de querer reservar esta clase?
//                   </Modal.Body>
//                   <Modal.Footer>
//                     <Button variant="secondary" onClick={handleClose}>
//                       No
//                     </Button>
//                     <Button variant="primary" onClick={handleClose}>
//                       Si!
//                     </Button>
//                   </Modal.Footer>
//                 </Modal>
//               </td>
//             </tr>
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default ReservarClases;

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../css/ReservarClases.css";

const ReservarClases = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="contenedor-rc">
      <div className="contenedor-hijo-rc">
        <h1>Reservar Clases</h1>
        <Table bordered hover>
          <thead className="table-header">
            <tr>
              <th>Dia</th>
              <th>Hora</th>
              <th>Profesor</th>
              <th>Reservar</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr>
              <td>Jueves</td>
              <td>10:00</td>
              <td>Mariano Ocampos</td>
              <td>
                <Button variant="primary" onClick={handleShow}>
                  Reservar
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Clase de ...</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Estas seguro de querer reservar esta clase?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      No
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Si!
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
            <tr>
              <td>Jueves</td>
              <td>10:00</td>
              <td>Mariano Ocampos</td>
              <td>
                <Button variant="primary" onClick={handleShow}>
                  Reservar
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Clase de ...</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Estas seguro de querer reservar esta clase?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      No
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Si!
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ReservarClases;
