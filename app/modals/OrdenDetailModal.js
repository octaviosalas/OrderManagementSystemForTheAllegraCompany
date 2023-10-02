import React, {useState} from "react"
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,} from "@nextui-org/react";

const OrdenDetailModal = ({razonSocial, cuit, cantidad, email, localidad, estado}) => { 

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
        <Modal isOpen={modalIsOpenNow} onOpenChange={closeModal} style={{width:"100%"}}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 items-center jusitify-center">Detalle de Orden</ModalHeader>
                <ModalBody>
                  <div className=""> 
                    <div className="flex justify-center">
                      <small  className="font-bold">{razonSocial}</small>
                      <small  className="font-bold ml-2">-</small>
                      <small className="font-bold ml-2"> {cuit}</small>
                    </div>
  
                    <div className="flex justify-center mt-2">
                      <small  className="font-bold">{email}</small>
                    </div>
  
                    <div className="flex justify-center mt-2">
                      <small  className="font-bold">{localidad}</small>
                    </div>
  
                    <div className="flex justify-center mt-2">
                      <small  className="font-bold">{estado}</small>
                    </div>
                  </div>
  
                  <div> 

                    {/*Id producto | Numero de combinacion | Nombre de producto | Atributos | Cantidad | Precio total | Editar | Eliminar */}
                      <Table removeWrapper aria-label="Example static collection table" className="overflow-auto max-h-[300px] max-w-full">
                            <TableHeader>
                                  <TableColumn>Id producto</TableColumn>
                                  <TableColumn>N de combinacion</TableColumn>
                                  <TableColumn>Producto</TableColumn>
                                  <TableColumn>Atributos</TableColumn>
                                  <TableColumn>Cantidad</TableColumn>
                                  <TableColumn>Precio total</TableColumn>
                                  <TableColumn>Editar</TableColumn>
                                  <TableColumn>Eliminar</TableColumn>
                            </TableHeader>
                          <TableBody>
                              <TableRow key="1">
                                  <TableCell>75785</TableCell>
                                  <TableCell>192372</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell><Button>Editar</Button></TableCell>
                                  <TableCell><Button>Eliminar</Button></TableCell>
                              </TableRow>
  
                              <TableRow key="2">
                              <TableCell>934739</TableCell>
                                  <TableCell>23421</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell><Button>Editar</Button></TableCell>
                                  <TableCell><Button>Eliminar</Button></TableCell>
                              </TableRow>
  
                              <TableRow key="3">
                              <TableCell>304093</TableCell>
                                  <TableCell>23241</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell><Button>Editar</Button></TableCell>
                                  <TableCell><Button>Eliminar</Button></TableCell>
                              </TableRow>
  
                                <TableRow key="4">
                                <TableCell>78378</TableCell>
                                  <TableCell>912312</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell>Active</TableCell>
                                  <TableCell><Button>Editar</Button></TableCell>
                                  <TableCell><Button>Eliminar</Button></TableCell>
                                </TableRow>
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