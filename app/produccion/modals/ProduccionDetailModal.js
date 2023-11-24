import React, { useState, useEffect } from "react";
import { Modal, ModalContent,ModalHeader,ModalBody,ModalFooter,Button,Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,Chip,Input, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";
import "../../globals.css";
import TabsModal from "../components/tabs";
import axios from "axios";


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


const ProduccionDetailModal = ({orderData}) => {
	

	   const [modalIsOpenNow, setModalIsOpenNow] = useState(false);
     const [showFirstTable, setShowFirstTable] = useState(true)
     const [showSecondTable, setShowSecondTable] = useState(false)
     const [orderId, setOrderId] = useState("")
     const [orderDetailData, setOrderDetailData] = useState([])
     const [load, setLoad] = useState(false)
     const [lastTable, setLastTable] = useState(false)

    

     useEffect(() => { 
       setOrderId(orderData.id)
     }, [orderData])

   useEffect(() => { 
       console.log(orderData)
   }, [orderData])

     
  

    const showingFirstTable = () => { 
        setShowFirstTable(true)
        setShowSecondTable(false)
        setLastTable(false)
        console.log("aa")
    }

    const showingSecondTable = () => { 
        setShowSecondTable(true)
        setShowFirstTable(false)
        setLastTable(false)
        console.log("bb")
    }

    const showButtonFinally = () => { 
      setLastTable(true)
      console.log("sdgbsh")
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
                                <TabsModal showFirst={showingFirstTable} showSecond={showingSecondTable} showLastTable={showButtonFinally}/>
                            </ModalHeader>
                                <p>Orden id:  {orderData.id} </p> 
                                {orderData.orderDetail.map((ord) => ( 
                                  <p>{ord.name}</p>
                                ))}
                                

                                 {load ? 
                                  <div>
                                     {orderDetailData.map((o) => <p>{o.productId}</p>)}
                                  </div>
                                  : null
                                 }
                                <ModalBody className="w-100% flex flex-col">

                                           <div className="flex flex-col border w-[1034px]">
                                               {showFirstTable ?
                                                    <Table className="text-black dark:text-white" aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                            <TableHeader columns={columnsFirstTable}>
                                                                {(columnsFirstTable) => <TableColumn className="text-black dark:text-white"  key={columnsFirstTable.key}>{columnsFirstTable.label}</TableColumn>}
                                                                </TableHeader>
                                                                <TableBody items={rowsFirstTable}>
                                                                {(item) => (
                                                                    <TableRow key={item.key}>
                                                                     {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                                                                    </TableRow>                                                           
                                                                )}
                                                            </TableBody>     
                                                    </Table>                                                  
                                                    : null}

                                                    {showSecondTable ?
                                                    <Table className="text-black dark:text-white" aria-label="Selection behavior table example with dynamic content" selectionMode="multiple" selectionBehavior={selectionBehavior}>
                                                            <TableHeader columns={columnsSecondTable}>
                                                                {(columnsSecondTable) => <TableColumn className="text-black dark:text-white" key={columnsSecondTable.key}>{columnsSecondTable.label}</TableColumn>}
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
                                            <div className=" w-full flex justify-end">
                                               {showFirstTable ?  <Button className="mr-6 bg-gray-300 dark:bg-white text-black font-bold">Pasar a Confeccion</Button> : null}
                                               {showSecondTable && !lastTable ?  <Button className="mr-6 bg-gray-300 dark:bg-white text-black font-bold">Pasar a Planchado / Control de Calidad</Button> : null}
                                               {showSecondTable && lastTable ?  <Button className="mr-6 bg-gray-300 dark:bg-white text-black font-bold">Finalizar</Button> : null}
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
