import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";

const EditModal = ({ RazonSocial, Cuit, Email, Localidad }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	const [updatedRazonSocial, setUpdatedRazonSocial] = useState(RazonSocial);
	const [updatedCuit, setUpdatedCuit] = useState(Cuit);
	const [updatedEmail, setUpdatedEmail] = useState(Email);
	const [updatedLocalidad, setUpdatedLocalidad] = useState(Localidad);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	return (
		<>
			<Button onPress={openModal} color="primary">
				Editar
			</Button>
			<Modal isOpen={modalIsOpen} onOpenChange={closeModal}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 items-center jusitify-center">
								Editar pedido
							</ModalHeader>
							<ModalBody>
								<div className="flex flex-col gap-3 justify-center items-center">
									<Input
										label="Razón Social"
										value={updatedRazonSocial}
										onValueChange={setUpdatedRazonSocial}
									/>

									<Input
										label="Cuit"
										value={updatedCuit}
										onValueChange={setUpdatedCuit}
									/>

									<Input
										label="Email"
										value={updatedEmail}
										onValueChange={setUpdatedEmail}
									/>

									<Input
										label="Ciudad/Provincia"
										value={updatedLocalidad}
										onValueChange={setUpdatedLocalidad}
									/>
								</div>
							</ModalBody>
							<ModalFooter className="justify-center ">
								<Button
									color="danger"
									className="bg-red-500 text-white"
									variant="light"
									onPress={onClose}>
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

export default EditModal;
