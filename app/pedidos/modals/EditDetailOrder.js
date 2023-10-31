import React from "react";
import { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
} from "@nextui-org/react";

const EditDetailOrder = ({ quantity }) => {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

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
								Editar detalle de producto
							</ModalHeader>
							<ModalBody>
								<div className="justify-center items-center">
									<div className="flex flex-col items-center">
										<Input
											label="Cantidad"
											value={updatedQuantity}
											onValueChange={setUpdatedQuantity}
											classNames={{ base: "max-w-[70%]" }}
											size="sm"
										/>
									</div>
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

export default EditDetailOrder;
