import React, { useState } from "react";
import { Modal, ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,Chip,Input, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";
import "../../globals.css";
import TabsModal from "../components/tabs";


const rowsFirstTable = [
    {
      key: "1",
      CodigoProducto: "CEO",
      NombreProducto: "Active",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
    {
      key: "2",
      CodigoProducto: "Technical Lead",
      NombreProducto: "Paused",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
    {
      key: "3",
      CodigoProducto: "Senior Developer",
      NombreProducto: "Active",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
    {
      key: "4",
      CodigoProducto: "Community Manager",
      NombreProducto: "Vacation",
      Cantidad: 2,
      Observaciones: "lalaland"
    },
  ];
  
  const columnsFirstTable = [
   
    {
      key: "CodigoProducto",
      label: "Codigo Producto",
    },
    {
      key: "NombreProducto",
      label: "Nombre Producto",
    },
    {
       key: "Cantidad",
        label: "Cantidad",
      },
    {
     key: "Observaciones",
     label: "Observaciones",
    }
  ];


  
const rowsSecondTable = [
    {
      key: "1",
      Id: 1,
      CodigoProducto: "CEO",
      NombreProducto: "Active",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
    {
      key: "2",
      Id: 2,
      CodigoProducto: "Technical Lead",
      NombreProducto: "Paused",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
    {
      key: "3",
      Id: 3,
      CodigoProducto: "Senior Developer",
      NombreProducto: "Active",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
    {
      key: "4",
      Id: 4,
      CodigoProducto: "Community Manager",
      NombreProducto: "Vacation",
      Cantidad: 2,
      CostoConfeccionUnitario: 100200,
      CostoConfeccionTotal: 200800,
      Observaciones: "lalaland"
    },
  ];
  
  const columnsSecondTable = [
    {
        key: "Id",
        label: "Id",
    },
    {
      key: "CodigoProducto",
      label: "Codigo Producto",
    },
    {
      key: "NombreProducto",
      label: "Nombre Producto",
    },
    {
       key: "Cantidad",
        label: "Cantidad",
    },
    {
       key: "CostoConfeccionUnitario",
       label: "Costo de Confeccion Unitario",
     },
     {
        key: "CostoConfeccionTotal",
        label: "Costo de Confeccion Total",
      },
    {
     key: "Observaciones",
     label: "Observaciones",
    }
  ];


 

/*Para corte: Checkbox, Codigo producto con un link hacia el sitio web, nombre de producto, cantidad, observaciones*/
/*Columnas para confeccion: Checkbox, id, cod prod, nombre prod, cantidad, costo de confeccion unitario (como input), costo confeccion total, observaciones */
/*mismas columnas que confeccion, pero no debe haber inputs salvo observaciones */


const ProduccionDetailModal = () => {
	

	const [modalIsOpenNow, setModalIsOpenNow] = useState(false);
    const [showFirstTable, setShowFirstTable] = useState(true)
    const [showSecondTable, setShowSecondTable] = useState(false)

    const showingFirstTable = () => { 
        setShowFirstTable(true)
        setShowSecondTable(false)
        console.log("aa")
    }

    const showingSecondTable = () => { 
        setShowSecondTable(true)
        setShowFirstTable(false)
        console.log("bb")
    }

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
                                <TabsModal showFirst={showingFirstTable} showSecond={showingSecondTable}/>
                            </ModalHeader>
                                <ModalBody className="w-100% flex flex-col">
                                           <div className="flex flex-col border w-[1034px]">
                                               {showFirstTable ?
                                                    <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                            <TableHeader columns={columnsFirstTable}>
                                                                {(columnsFirstTable) => <TableColumn key={columnsFirstTable.key}>{columnsFirstTable.label}</TableColumn>}
                                                                </TableHeader>
                                                                <TableBody items={rowsFirstTable}>
                                                                {(item) => (
                                                                    <TableRow key={item.key}>
                                                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                                    </TableRow>
                                                                )}
                                                            </TableBody>
                                                    </Table> : null}

                                                    {showSecondTable ?
                                                    <Table  aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                            <TableHeader columns={columnsSecondTable}>
                                                                {(columnsSecondTable) => <TableColumn key={columnsSecondTable.key}>{columnsSecondTable.label}</TableColumn>}
                                                                </TableHeader>
                                                                <TableBody items={rowsSecondTable}>
                                                                {(item) => (
                                                                    <TableRow key={item.key}>
                                                                    {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                                    </TableRow>
                                                                )}
                                                            </TableBody>
                                                    </Table> : null}
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
