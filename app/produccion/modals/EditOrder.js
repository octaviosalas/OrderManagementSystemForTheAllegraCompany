import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import axios from "axios";

export default function EditOrderModal({orderData}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [newOrderCost, setNewOrderCost] = useState("")
  const [newOrderState, setNewOrderState] = useState("")
  const [orderId, setOrderId] = useState("")
  const [succesMessage, setSuccesMessage] = useState(false)

  const saveChanges = () => { 
    const newOrderData = ({ 
      state: newOrderState,
      manufacturingCost: newOrderCost
      
    })
     axios.put(`http://localhost:4000/editOrder/${orderId}`, newOrderData)
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

  useEffect(() => { 
    setOrderId(orderData.orderId)
  }, [orderData])
  


  return (
    <>
      <small onClick={onOpen} className="text-sm cursor-pointer">Editar</small>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">Editar Orden</ModalHeader>
              <ModalBody>
            
                 <div className="flex flex-col items-center justify-center mt-6">

                  <Input 
                      label="Costo de Confeccion" 
                      type="text"
                      style={{border:"none"}}
                      placeholder={orderData.manufacturingCost}
                      onChange={(e) => setNewOrderCost(e.target.value)}/> 

                  <Input 
                      label="Estado" 
                      type="text"
                      style={{border:"none"}}
                      className="mt-6"
                      placeholder={orderData.state}
                      onChange={(e) => setNewOrderState(e.target.value)}/>        

                 {succesMessage ? 
                    <p className="font-bold text-blue-600 text-sm mt-8">Orden editada Correctamente</p> 
                  :  
                   <Button color="primary" className="w-52 mt-8" onClick={() => saveChanges()}>Guardar Cambios</Button>  }         

                 </div>
          
             
       

              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
