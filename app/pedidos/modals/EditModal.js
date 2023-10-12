import React, {useState} from "react"
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

const MyModal = ({RazonSocial, Cuit, Email, Localidad }) => {

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
              <ModalHeader className="flex flex-col gap-1 items-center jusitify-center">Estas por editar el pedido</ModalHeader>
              <ModalBody>
                <div className="justify-center items-center">
                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Razon Social</label>
                        <input type="text" placeholder={RazonSocial} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Cuit</label>
                        <input type="text"  placeholder={Cuit} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Email</label>
                        <input type="text"  placeholder={Email} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
                    </div>

                    <div className="flex flex-col items-center">
                        <label className="text-sm mt-4">Ciudad/Provincia</label>
                        <input type="text"  placeholder={Localidad} className="text-center mt-2 h-6 bg-gray-300 text-black font-bold text-sm rounded-lg"/>
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

export default MyModal