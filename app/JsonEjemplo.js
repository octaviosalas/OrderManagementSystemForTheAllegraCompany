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

  
const MyModal = ({ title }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
      if (isOpen) {
        onClose();
      }
    };
  
    const closeModal = () => {
      setModalIsOpen(false);
      if (isOpen) {
        onClose();
      }
    };

  return (
    <>
      <Button onPress={openModal}>Editar</Button>
      <Modal isOpen={modalIsOpen} onOpenChange={closeModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Guardar Cambios
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};



const pedidosConfirmados = [ 
          { 
            key: "1",
            CodProd: "Tony Reichert",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 2,
            Precio: 100,
            Eliminar: <Button  className="bg-red-500 text-white hover:bg-white hover:text-red-500">Eliminar</Button>,
            Editar: <MyModal title={"Tony"}/>
         },
         { 
            key: "1",
            CodProd: "Tony Reichert",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 2,
            Precio: 100,
            Eliminar: <Button  className="bg-red-500 text-white hover:bg-white hover:text-red-500">Eliminar</Button>,
            Editar: <MyModal />
         },
         { 
            key: "1",
            CodProd: "Tony Reichert",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 2,
            Precio: 100,
            Eliminar: <Button  className="bg-red-500 text-white hover:bg-white hover:text-red-500">Eliminar</Button>,
            Editar: <MyModal />
         },
         { 
            key: "1",
            CodProd: "Tony Reichert",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 2,
            Precio: 100,
            Eliminar: <Button  className="bg-red-500 text-white hover:bg-white hover:text-red-500">Eliminar</Button>,
            Editar: <MyModal />
         },
         { 
            key: "1",
            CodProd: "Tony Reichert",
            Producto: "CEO",
            Atributos: "Active",
            Cantidad: 2,
            Precio: 100,
            Eliminar: <Button  className="bg-red-500 text-white hover:bg-white hover:text-red-500">Eliminar</Button>,
            Editar: <MyModal />
         }
]


export default pedidosConfirmados
