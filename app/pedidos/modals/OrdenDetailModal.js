import React, {useState} from "react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,} from "@nextui-org/react";
import "../../globals.css"
import EditDetailOrder from "./EditDetailOrder";

const OrdenDetailModal = ({razonSocial, cuit, email, localidad, estado, detalle}) => { 
  console.log(detalle)

    const [modalIsOpenNow, setModalIsOpenNow] = useState(false);
  
    const openModal = () => {
      setModalIsOpenNow(true);
    };
  
    const closeModal = () => {
      setModalIsOpenNow(false);
    };
  
    return (
      <>
        <Button onPress={openModal} className="text-white bg-blue-500  hover:bg-blue-800 h-8 w-6">Ver Detalle</Button>
        <Modal isOpen={modalIsOpenNow} onOpenChange={closeModal} className="modalGeneral" classNames={{wrapper:"items-center"}}>
          <ModalContent  className="modalGeneral">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 items-center jusitify-center">Detalle de Orden</ModalHeader>
                <ModalBody>
                 
                    <div className="flex flex-col items-center justify-center">
                      <small  className="font-bold">{razonSocial}</small>
                      <small className="font-bold ml-2"> {cuit}</small>
                      <small  className="font-bold">{email}</small>
                      <small  className="font-bold">{localidad}</small>
                      <small  className="font-bold">{estado}</small>
                    </div>
                 
  
                  <div> 
                      <Table removeWrapper aria-label="Example static collection table" className="w-100% sm:overflow-auto xxs:overflow-auto xxxs:overflow-auto ">
                            <TableHeader>
                                  <TableColumn>Id producto</TableColumn>
                                  <TableColumn>N de combinacion</TableColumn>
                                  <TableColumn>Producto</TableColumn>
                                  <TableColumn>Atributos</TableColumn>
                                  <TableColumn>Cantidad</TableColumn>
                                  <TableColumn>Precio unitario</TableColumn>
                                  <TableColumn>Precio total</TableColumn>
                                  <TableColumn>Editar</TableColumn>
                                  <TableColumn>Eliminar</TableColumn>
                            </TableHeader>
                          <TableBody>
                          {detalle.map((d) => ( 
                              <TableRow key="1">
                                  <TableCell>{d.id}</TableCell>
                                  <TableCell>{d.product_code}</TableCell>
                                  <TableCell>{d.product_name}</TableCell>
                                  <TableCell>{d.attributes}</TableCell>
                                  <TableCell>{d.quantity}</TableCell>
                                  <TableCell>{d.unit_price}</TableCell>
                                  <TableCell>{d.total_price}</TableCell>
                                  <TableCell><EditDetailOrder cantidad={d.quantity}/></TableCell>
                                  <TableCell><Button className="bg-red-500 text-white hover:bg-red-800">Eliminar</Button></TableCell>
                              </TableRow>
                           ))}
  
                             
                          </TableBody>
                     </Table>
                  </div>
                </ModalBody>
               
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  
  }
  export default OrdenDetailModal



  