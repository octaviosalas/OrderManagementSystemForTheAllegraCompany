import React from 'react'
import { useState } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,} from "@nextui-org/react";



const EditDetailOrder = ({cantidad}) => {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
    
  };

  const closeModal = () => {
    setModalIsOpen(false);
   
  };

  return (
    <>
      <Button onPress={openModal} className="text-white bg-blue-500  hover:bg-blue-800 h-8 w-6">Editar</Button>
      <Modal isOpen={modalIsOpen} onOpenChange={closeModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center jusitify-center">Estas por editar el Detalle</ModalHeader>
              <ModalBody>
                <div className="justify-center items-center">
                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Cantidad</label>
                        <input type="number" placeholder={cantidad} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>
                </div>
              </ModalBody>
              <ModalFooter className="justify-center ">
                <Button color="danger" className="bg-red-500 text-white" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Guardar 
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditDetailOrder
