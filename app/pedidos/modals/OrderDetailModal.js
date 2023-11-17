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
	Input,
} from "@nextui-org/react";
import "../../globals.css";
import EditDetailOrder from "./EditDetailOrder";
import { DANGER_TYPE } from "@/app/constants";
import { SUCCESS_TYPE } from "@/app/constants";
import { WARNING_TYPE } from "@/app/constants";

const OrderDetailModal = ({
	orderId,
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
							<ModalHeader className="flex flex-col gap-1 items-center jusitify-center text-black dark:text-white">
								Detalle de Orden
							</ModalHeader>
							<ModalBody>
								<div className="flex justify-between">
									<div className="flex flex-col">
										<small className="font-bold text-black dark:text-white">
											Razón social: {razonSocial}
										</small>
										<small className="font-bold text-black dark:text-white">CUIT: {cuit}</small>
										<small className="font-bold text-black dark:text-white">Email: {email}</small>
										<small className="font-bold text-black dark:text-white">Localidad: {localidad}</small>
									</div>
									{estado === 1 ? <Chip color={WARNING_TYPE}>Pendiente</Chip> : null}
									{estado === 2 ? <Chip color={DANGER_TYPE}>Cancelado</Chip> : null}
									{estado === 3 ? <Chip color={SUCCESS_TYPE}>Confirmado</Chip> : null}
								</div>

								<hr className="my-4" />

								<Table
									aria-label="Example static collection table"
									className="w-100% text-black dark:text-white">
									<TableHeader>
										<TableColumn className="text-black dark:text-white">Id producto</TableColumn>
										<TableColumn className="text-black dark:text-white">N de combinacion</TableColumn>
										<TableColumn className="text-black dark:text-white">Producto</TableColumn>
										<TableColumn className="text-black dark:text-white">Atributos</TableColumn>
										<TableColumn className="text-black dark:text-white">Cantidad</TableColumn>
										<TableColumn className="text-black dark:text-white">Precio unitario</TableColumn>
										<TableColumn className="text-black dark:text-white">Precio total</TableColumn>
										<TableColumn className="text-black dark:text-white">Editar</TableColumn>
										<TableColumn className="text-black dark:text-white">Eliminar</TableColumn>
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
													<EditDetailOrder quantity={d.quantity} />
												</TableCell>
												<TableCell>
													<Button color="danger">Eliminar</Button>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
export default OrderDetailModal;