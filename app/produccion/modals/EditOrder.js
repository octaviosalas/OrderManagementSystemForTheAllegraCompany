import React, { useEffect, useState } from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import axios from "axios";

export default function EditOrderModal({orderData, type, userData}) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [newOrderCost, setNewOrderCost] = useState("")
  const [newOrderState, setNewOrderState] = useState("")
  const [newUserName, setNewUserName] = useState("")
  const [newUserSurname, setNewUserSurname] = useState("")
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRol, setNewUserRol] = useState("")
  const [orderId, setOrderId] = useState("")
  const [userId, setUserId] = useState("")
  const [succesMessage, setSuccesMessage] = useState(false)

  const saveOrderDataChanges = () => { 
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

     const saveUserDataChanges = () => { 
      const newUserData = ({ 
        name: newUserName,
        surname: newUserSurname,
        email: newUserEmail, 
        rol: newUserRol
        
      })
       axios.put(`http://localhost:4000/editUserData/${userId}`, newUserData)
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
        if(type === "orders") { 
          setOrderId(orderData.orderId)
        } else if (type === "users") { 
          setUserId(userData.id)
        }
    
      }, [])
  


  return (
    <>
      <Button onPress={onOpen} className="text-sm cursor-pointer" color={"primary"}>Editar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">Editar Orden</ModalHeader>
              <ModalBody>
            
                 <div className="flex flex-col items-center justify-center mt-6">

                 {type === "orders" ? 
                 <div>
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
                   </div>   

                    :

                    <div>
                      <Input 
                      label="Nombre" 
                      type="text"
                      style={{border:"none"}}
                      placeholder={userData.name}
                      onChange={(e) => setNewUserName(e.target.value)}/> 

                       <Input 
                        label="Apellido" 
                        type="text"
                        style={{border:"none"}}
                        className="mt-6"
                        placeholder={userData.surname}
                        onChange={(e) => setNewUserSurname(e.target.value)}/> 

                       <Input 
                        label="Email" 
                        type="text"
                        style={{border:"none"}}
                        className="mt-6"
                        placeholder={userData.email}
                        onChange={(e) => setNewUserEmail(e.target.value)}/>

                        <Input 
                        label="Rol" 
                        type="text"
                        style={{border:"none"}}
                        className="mt-6"
                        placeholder={userData.rol}
                        onChange={(e) => setNewUserRol(e.target.value)}/>  
                 </div>
                    }       

                 {succesMessage ? 
                    <p className="font-bold text-blue-600 text-sm mt-8">{type === "orders" ? "Orden Editada Correctamente" : "Usuario Actualizado Correctamente"}</p> 
                  :  
                   <Button color="primary" className="w-52 mt-8" onClick={() => {type === "orders" ? saveOrderDataChanges() : type === "users" ? saveUserDataChanges() : null}}>Guardar Cambios</Button>}         

                 </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

