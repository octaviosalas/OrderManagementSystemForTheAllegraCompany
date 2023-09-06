import React, {useState} from "react"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
  } from "@nextui-org/react";


  
const MyModal = ({ codigoProducto, producto, atributos, cantidad, precio }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
      
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
     
    };

  return (
    <>
      <Button onPress={openModal} className="text-white bg-blue-500 hover:text-black hover:bg-white">Editar</Button>
      <Modal isOpen={modalIsOpen} onOpenChange={closeModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center jusitify-center">Estas por editar el pedido</ModalHeader>
              <ModalBody>
                <div className="justify-center items-center">
                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Codigo del producto</label>
                        <input type="text" placeholder={codigoProducto} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Producto</label>
                        <input type="text" placeholder={producto} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Atributos</label>
                        <input type="text" placeholder={atributos} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Cantidad</label>
                        <input type="text" placeholder={cantidad} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Precio</label>
                        <input type="text" placeholder={`${precio} $`} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
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
  );
};



  
const apiData = [
  { 
            key: "1",
            CodProd: "100",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 2,
            Precio: 2900,
         },
         { 
            key: "1",
            CodProd: "200",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 5,
            Precio: 5600,          
         },
         { 
            key: "1",
            CodProd: "300",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 11,
            Precio: 11900,         
         },
         { 
            key: "1",
            CodProd: "500",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 26,
            Precio: 21100,          
         },
         { 
            key: "1",
            CodProd: "600",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 9,
            Precio: 2800,         
         }
];

const pedidosConfirmados = apiData.map(item => ({
  key: item.key,
  CodProd: item.CodProd,
  Producto: item.Producto,
  Atributos: item.Atributos,
  Cantidad: item.Cantidad,
  Precio: item.Precio,
  Eliminar: <Button className="bg-red-500 text-white hover:bg-white hover:text-red-500">Eliminar</Button>,
  Editar: <MyModal codigoProducto={item.CodProd} producto={item.Producto} atributos={item.Precio} cantidad={item.Cantidad} precio={item.Precio}/>
}));


  
export default pedidosConfirmados


