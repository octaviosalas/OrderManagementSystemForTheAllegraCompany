import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import axios from "axios";

export default function DeleteOrderModal({orderData, type, userData, updateNow, allOrders, allUsers, updateUsersNow, }) {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [succesMessage, setSuccesMessage] = useState(false)
  const [userId, setUserId] = useState("")
  const [orderId, setOrderId] = useState("")


  

  const deleteOrder = () => {
    axios.delete(`http://localhost:4000/deleteOrder/${orderId}`)
      .then((res) => {
        console.log(res.data);
        setSuccesMessage(true);
        console.log(res.data.deleted._id)
        const newOrderId = res.data.deleted._id;
        const newOrders = allOrders.filter((order) => order._id !== newOrderId);
        console.log(newOrders);
        updateNow(newOrders); 
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteUser = () => { 
    axios.delete(`http://localhost:4000/deleteUser/${userId}`)
         .then((res) => { 
          console.log(res.data)
          setSuccesMessage(true)
          const newUserId = res.data.deleted._id;
          const newUsers = allUsers.filter((user) => user._id !== newUserId);
          console.log(newUsers);
          updateUsersNow(newUsers); 
         })
         .catch((err) => { 
          console.log(err)
         })
  }

  useEffect(() => { 
    if(type === "users") { 
      setUserId(userData.userId)
    } else if (type === "orders") { 
      setOrderId(orderData.id)
    }
  })

 

  return (
    <>
        <Button onPress={onOpen} className="text-sm cursor-pointer" color={"danger"}>Eliminar</Button>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                {type === "orders" ? <ModalHeader className="flex flex-col items-center justify-center  gap-1">Eliminar Orden</ModalHeader> : null}
                {type === "users" ? <ModalHeader className="flex flex-col items-center justify-center  gap-1">Eliminar Usuario</ModalHeader> : null}
                <ModalBody>
                  
                 <div className="flex flex-col items-center justify-center">
                   {type === "orders" ?  <p>¿Estas seguro de eliminar la Orden?</p> : <p>¿Estas seguro de eliminar este Usuario?</p> }
                     {type === "users" ? <p>{userData.id}</p> : null}
                     {succesMessage ? (
                            <p className="text-sm font-bold mt-12 text-blue-600">{type === "orders" ? "Orden eliminada Correctamente" : "Usuario eliminado Correctamente"} </p>
                          ) : (
                            <div className="flex gap-6 mt-8">
                              
                              <Button className="mt-2"  color="danger" onClick={() => {  type === "orders" ? deleteOrder() : type === "users" ? deleteUser() : null; }}>
                                Si, estoy seguro 
                              </Button>

                              <Button className="mt-2" color="primary">
                                No, cancelar
                              </Button>

                            </div>
                          )}

                 </div>

                           
              </ModalBody>          
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
