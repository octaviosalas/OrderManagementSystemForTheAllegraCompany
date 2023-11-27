import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Input} from "@nextui-org/react";
import axios from "axios";
import { useState, useEffect } from "react";




export default function AddNewProductionOrder() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const [manufacturingCost, setManufacturingCost] = useState(0)
  const [orderState, setOrderState] = useState("")
  const [showAddProducts, setShowAddProducts] = useState(false)
  const [productsChoosen, setProductsChoosen] = useState([])
  const [showOrdersChoosen, setShowOrdersChoosen] = useState(false)
  const [succesMessage, setSuccesMessage] = useState(false)
  const [productsOrders, setProductsOrders] = useState({ 
    codigoProducto: "",
    nombre: "",
    cantidad: "",
    observaciones:""
  })

  const continueAdding = () => {
    setShowOrdersChoosen(true)
    setProductsChoosen((prevProducts) => [
      ...prevProducts,
      {
        codigoProducto: productsOrders.codigoProducto,
        nombre: productsOrders.nombre,
        cantidad: productsOrders.cantidad,
        observaciones: productsOrders.observaciones,
       
      },
    ]);
    setProductsOrders({
      codigoProducto: "",
      nombre: "",
      cantidad: "",
      observaciones:""
    });
  };

  const sendMyOrder = () => {
    const actualProduct = {
      codigoProducto: productsOrders.codigoProducto,
      nombre: productsOrders.nombre,
      cantidad: productsOrders.cantidad,
      observaciones: productsOrders.observaciones,
    
    };
  
    setProductsChoosen((prevProducts) => [...prevProducts, actualProduct]);
  
    const newOrderToBeSaved = {
      manufacturingCost: manufacturingCost,
      state: orderState,
      orderDetail: [...productsChoosen, actualProduct],
    };
  
    axios.post('http://localhost:4000/newOrder', newOrderToBeSaved)
         .then((res) => {
         console.log(res.data);
         setSuccesMessage(true)
         setTimeout(() => { 
            window.location.reload()
         }, 2500)
      })
      .catch((err) => {
        console.log(err);
      });
  };

 
  useEffect(() => { 
        console.log(productsOrders)
  }, [productsOrders])

  useEffect(() => { 
    console.log(productsChoosen)
}, [productsChoosen])

 
  return (
    <>
      <Button color="primary"  onPress={onOpen}>Agregar Pedido +</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col items-center justify-center gap-1">Agregar Pedido a Produccion</ModalHeader>
              <ModalBody>

                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-col">
                              <Input size={"sm"} type="text" label="Costo Confeccion" className="mt-6" onChange={(e) => setManufacturingCost(e.target.value)}/>

                              <Input size={"sm"} type="text" label="Estado" className="mt-6" onChange={(e) => setOrderState(e.target.value)}/>

                              {showAddProducts ? null : <Button color="primary" variant="shadow" className="mt-6 mb-4" onClick={() => setShowAddProducts(true)}> Elegir Productos </Button>}

                        { showAddProducts ? 

                        <div className="flex flex-col items-center justify-center">

                              <Input value={productsOrders.codigoProducto} size={"sm"} type="text" label="Codigo Producto" className="mt-6" onChange={(e) => {
                                  const productCodeChoosen = e.target.value;
                                  setProductsOrders((prevState) => ({
                                    ...prevState,
                                    codigoProducto: productCodeChoosen,
                                  }));
                                }}/>

                              <Input  value={productsOrders.nombre} size={"sm"} type="text" label="Nombre" className="mt-6"  onChange={(e) => {
                                  const nameChoosen = e.target.value;
                                  setProductsOrders((prevState) => ({
                                    ...prevState,
                                    nombre: nameChoosen,
                                  }));
                                }}/>

                              <Input value={productsOrders.cantidad}  size={"sm"} type="text" label="Cantidad" className="mt-6" onChange={(e) => {
                                  const quantityChoosen = e.target.value;
                                  setProductsOrders((prevState) => ({
                                    ...prevState,
                                    cantidad: quantityChoosen,
                                  }));
                                }}/>

                              <Input value={productsOrders.observaciones} size={"sm"} type="text" label="Observaciones" className="mt-6" onChange={(e) => {
                                  const observations = e.target.value;
                                  setProductsOrders((prevState) => ({
                                    ...prevState,
                                    observaciones: observations,
                                  }));
                                }}/>

                                {showOrdersChoosen ?

                                  <div className="flex flex-col items-start justify-start mt-6 mb-2">
                                      {productsChoosen.map((p) => (
                                        <div key={p.nombre} className="flex flex-col">
                                           <ul className="list-disc flex flex-col ">
                                             <li className="text-sm font-bold">{p.nombre} - {p.cantidad} Unidades</li>
                                           </ul>
                                     
                                        </div>   
                                      ))}
                                  </div> 

                                : null}

                               {succesMessage ? <p className="font-bold text-blue-600 mt-8">Pedido realizado con Exito</p> 
                                :
                               <div className="flex items-center gap-6">
                                   <Button color="primary" variant="shadow" className="mt-6 mb-4" onClick={() => continueAdding()}> Elegir Otro Producto </Button>
                                   <Button color="primary" variant="shadow" className="mt-6 mb-4" onClick={() => sendMyOrder()}> Guardar Pedido </Button>
                                </div>}

                              

                         </div> 

                         : null}

                        </div>
                    </div>

                </div>
                 
                
               
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

/*  onChange={(e) => {
                        const cantidadValue = e.target.value;
                        const precioProducto = productToBuyData.precioProducto;
                        const totalValue = cantidadValue * precioProducto;
                        setProductToBuyData((prevState) => ({
                          ...prevState,
                          cantidad: cantidadValue,
                          total: totalValue,
                        }));
                      }}*/