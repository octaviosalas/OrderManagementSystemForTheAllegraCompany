import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@nextui-org/react";
import {MailIcon} from '../icons/MailIcon.jsx';
import {LockIcon} from '../icons/LockIcon.jsx';
import { useState, useEffect } from "react";
import axios from "axios";
import {Select, SelectItem} from "@nextui-org/react";



export default function AddNewUser() {

  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  const [userName, setUserName] = useState("")
  const [userSurname, setUserSurname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rol, setRol] = useState(0)
  const [succesMessage, setSuccesMessage] = useState(false)


 const userRols = [
    {label: "Admin", value: "Admin"},
    {label: "Confeccion", value: "Confeccion"},
    {label: "Corte", value: "Corte"},
    {label:  "Planchado / Control de Calidad", value:  "Planchado / Control de Calidad"},
   
  ];
  

  const registerNewUser = () => { 
    const userData = ({ 
        name: userName, 
        surname: userSurname,
        email: email,
        password: password,
        rol: rol
    })
    axios.post("http://localhost:4000/register", userData)
         .then((res) => { 
            console.log(res.data)
            setSuccesMessage(true)
            setTimeout(() => { 
              window.location.reload()
            }, 2500)
         })
         .catch((err) => { 
            console.log(err)
         })
  }

  useEffect(() => { 
    console.log(rol)
  }, [rol])

  return (
    <>
       <Button color="primary"  onPress={onOpen}>Agregar Usuario +</Button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col text-center justify-center">Agregar Usuario </ModalHeader>
              <ModalBody>

                   <Input 
                    autoFocus 
                    label="Nombre"
                    style={{border:"none"}} 
                    onChange={(e) => setUserName(e.target.value)}/>

                    <Input 
                    autoFocus 
                    label="Apellido"
                    style={{border:"none"}} 
                    onChange={(e) => setUserSurname(e.target.value)}/> 

                    <Input 
                    autoFocus 
                    endContent={ <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0 border border-none" />} 
                    label="Email"
                    style={{border:"none"}} 
                    onChange={(e) => setEmail(e.target.value)}/>

                    <Input 
                    endContent={<LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> } 
                    label="Password" 
                    type="password"
                    style={{border:"none"}}
                    onChange={(e) => setPassword(e.target.value)}/>

                  <Select
                        label="Rol de Usuario"
                        placeholder="Seleciona un Rol"
                        selectionMode="multiple"
                        className="max-w-full"
                        value={"Admin"}
                        onChange={(e) => setRol(e.target.value)}>

                          {userRols.map((rols) => (
                            <SelectItem key={rols.value} value={rols.value}>
                              {rols.label}
                            </SelectItem>
                          ))}

                      </Select>

                <div className="flex py-2 px-1 justify-between">
                
                </div>
              </ModalBody>

              <ModalFooter className="flex items-center justify-center">
                
               {succesMessage ? 
                <p className="font-bold text-sm text-blue-600">Usuario Registrado Exitosamente</p>
                :
               <Button color="primary" className="w-52" onClick={() => registerNewUser()}>
                  Guardar
                </Button>}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
