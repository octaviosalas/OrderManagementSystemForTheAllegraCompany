import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
  Chip,
} from "@nextui-org/react";
import "../../globals.css";
import EditDetailOrder from "./EditDetailOrder";

const OrderDetailModal = ({
	razonSocial,
	cuit,
	email,
	localidad,
	estado,
	detalle,
}) => {
	console.log(detalle);

	const [modalIsOpenNow, setModalIsOpenNow] = useState(false);

	const openModal = () => {
		setModalIsOpenNow(true);
	};

	const closeModal = () => {
		setModalIsOpenNow(false);
	};

	return (
		<>
			<Button onPress={openModal} color="default">
				Ver Detalle
			</Button>
			<Modal
				isOpen={modalIsOpenNow}
				onOpenChange={closeModal}
				className="modalGeneral"
				classNames={{ wrapper: "items-center" }}>
				<ModalContent className="modalGeneral">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 items-center jusitify-center">
								Detalle de Orden
							</ModalHeader>
							<ModalBody>
								<div className="flex justify-between">
                  <div className="flex flex-col">
                    <small className="font-bold">Razón social: {razonSocial}</small>
                    <small className="font-bold">CUIT: {cuit}</small>
                    <small className="font-bold">Email: {email}</small>
                    <small className="font-bold">Localidad: {localidad}</small>
                  </div>
                  {/* @TODO -> Do it dynamically */}
                  {/* <Chip color="secondary">{estado}</Chip> */}
                  <Chip color="success">Confirmado</Chip>
								</div>

                <hr className="my-4" />

								<div>
									<Table
										removeWrapper
										aria-label="Example static collection table"
										className="w-100% sm:overflow-auto xxs:overflow-auto xxxs:overflow-auto ">
										<TableHeader>
											<TableColumn>Id producto</TableColumn>
											<TableColumn>N de combinacion</TableColumn>
											<TableColumn>Producto</TableColumn>
											<TableColumn>Atributos</TableColumn>
											<TableColumn>Cantidad</TableColumn>
											<TableColumn>Precio unitario</TableColumn>
											<TableColumn>Precio total</TableColumn>
											<TableColumn>Editar</TableColumn>
											<TableColumn>Eliminar</TableColumn>
										</TableHeader>
										<TableBody>
											{detalle.map((d) => (
												<TableRow key="1">
													<TableCell>{d.id}</TableCell>
													<TableCell>{d.product_code}</TableCell>
													<TableCell>{d.product_name}</TableCell>
													<TableCell>{d.attributes}</TableCell>
													<TableCell>{d.quantity}</TableCell>
													<TableCell>{d.unit_price}</TableCell>
													<TableCell>{d.total_price}</TableCell>
													<TableCell>
														<EditDetailOrder cantidad={d.quantity} />
													</TableCell>
													<TableCell>
														<Button className="bg-red-500 text-white hover:bg-red-800">
															Eliminar
														</Button>
													</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</div>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
export default OrderDetailModal;
