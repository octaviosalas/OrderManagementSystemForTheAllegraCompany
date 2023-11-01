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
    getKeyValue, Radio, RadioGroup
} from "@nextui-org/react";
import "../../globals.css";
import TabsModal from "../components/tabs";

const rows = [
    {
      key: "1",
      Id: "Tony Reichert",
      CodigoProducto: "CEO",
      CostoDeConfeccion: "Active",
      Observaciones: "lalaland"
    },
    {
      key: "2",
      Id: "Zoey Lang",
      CodigoProducto: "Technical Lead",
      CostoDeConfeccion: "Paused",
      Observaciones: "lalaland"
    },
    {
      key: "3",
      Id: "Jane Fisher",
      CodigoProducto: "Senior Developer",
      CostoDeConfeccion: "Active",
      Observaciones: "lalaland"
    },
    {
      key: "4",
      Id: "William Howard",
      CodigoProducto: "Community Manager",
      CostoDeConfeccion: "Vacation",
      Observaciones: "lalaland"
    },
  ];
  
  const columns = [
    {
      key: "Id",
      label: "Id",
    },
    {
      key: "CodigoProducto",
      label: "Codigo Producto",
    },
    {
      key: "CostoDeConfeccion",
      label: "Costo De Confeccion",
    },
    {
     key: "Observaciones",
     label: "Observaciones",
    }
  ];




const ProduccionDetailModal = () => {
	

	const [modalIsOpenNow, setModalIsOpenNow] = useState(false);

	const openModal = () => {
		setModalIsOpenNow(true);
	};

	const closeModal = () => {
		setModalIsOpenNow(false);
	};

    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");


	return (
		<>
			<small className="underline cursor-pointer text-sm" onClick={openModal} color="default">
				Ver Detalle
			</small>
			<Modal isOpen={modalIsOpenNow} onOpenChange={closeModal} className="modalGeneral" classNames={{ wrapper: "items-center" }}>
				<ModalContent className="modalGeneral">
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1 items-center jusitify-start">
                                <TabsModal/>
                            </ModalHeader>
                                <ModalBody className="w-100% flex flex-col">
                                    <div className="flex flex-col border w-[1034px]">
                                            <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                <TableHeader columns={columns}>
                                                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                                                </TableHeader>
                                                <TableBody items={rows}>
                                                {(item) => (
                                                    <TableRow key={item.key}>
                                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                    </TableRow>
                                                )}
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
export default ProduccionDetailModal;
