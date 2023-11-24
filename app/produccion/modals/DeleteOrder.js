import React, { useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios";

export default function DeleteOrderModal({orderId}) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [succesMessage, setSuccesMessage] = useState(false)

  const deleteOrder = () => { 
    axios.delete(`http://localhost:4000/deleteOrder/${orderId.id}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          setTimeout(() => {
             window.location.reload()
          }, 2000);
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  return (
    <>
        <small onClick={onOpen} className="text-sm cursor-pointer">Eliminar</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center  gap-1">Eliminar Orden</ModalHeader>
              <ModalBody>
                 
                 <div className="flex flex-col items-center justify-center">
                    <p>¿Estas seguro de eliminar la Orden?</p>

                    {succesMessage ? 
                      <p className="text-sm font-bold mt-12 text-blue-600">Orden eliminada Correctamente</p>
                      :
                     <div className="flex gap-6 mt-8">
                      <Button className="mt-2" color="danger" onClick={() => deleteOrder()}>Si, estoy seguro</Button>
                      <Button className="mt-2" color="primary">No, cancelar</Button>
                    </div>}

                 </div>

                           
              </ModalBody>          
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
