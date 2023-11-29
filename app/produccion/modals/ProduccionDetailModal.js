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
     const [orderDetailData, setOrderDetailData] = useState([])
     const [columns, setColumns] = useState([])
     const [load, setLoad] = useState(false)
     const [lastTable, setLastTable] = useState(false)
     const [availableButton, setAvailableButton] = useState(false)

     useEffect(() => { 
      console.log("estado: ", availableButton)
     }, [availableButton])
     


    useEffect(() => { 
        console.log(orderData)
    }, [orderData])

    useEffect(() => {
      if (orderData && orderData.orderDetail && Array.isArray(orderData.orderDetail) && orderData.orderDetail.length > 0) {
        const firstDetail = orderData.orderDetail[0];
        const properties = Object.keys(firstDetail);
        const filteredProperties = properties.filter(property => property !== 'orderState');
    
        const columnLabelsMap = {
          productId: 'Codigo Producto',
          name: 'Nombre Producto',
          quantity: 'Cantidad',
          observations: "Observaciones"
        };
    
        const tableColumns = filteredProperties.map(property => ({
          key: property,
          label: columnLabelsMap[property] ? columnLabelsMap[property] : property.charAt(0).toUpperCase() + property.slice(1),
        }));
    
        setColumns(tableColumns);
      }
    }, [orderData]);

     
  

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
                               
                                <ModalBody className="w-100% flex flex-col">

                                           <div className="flex flex-col border w-[1034px]">
                                               {showFirstTable ?
                                                     <Table  
                                                     className="w-full flex items-center justify-center" 
                                                     columnAutoWidth={true}
                                                     columnSpacing={10}
                                                     aria-label="Selection behavior table example with dynamic content"
                                                     selectionMode="multiple"
                                                     selectionBehavior={selectionBehavior}
                                                     onSelectionChange={(event) => {
                                                      console.log(event);
                                                      if (event === "all") {
                                                        setAvailableButton(true);
                                                      } else if (event !== "all") { 
                                                        setAvailableButton(false)
                                                      }
                                                    }}
                                                     >
                                                     <TableHeader columns={columns}>
                                                       {(column) => (
                                                         <TableColumn key={column.key} className="text-xs gap-6">
                                                           {column.label}
                                                         </TableColumn>
                                                       )}
                                                     </TableHeader>
                                                     <TableBody items={orderData.orderDetail.filter(order => order.orderState === "corte")} >
                                                     {(item) => (
                                                       <TableRow key={item.productId} >
                                                         {columns.map(column => (
                                                           <TableCell key={column.key} className="text-start items-start">
                                                             {item[column.key]}
                                                           </TableCell>
                                                         ))}
                                                       </TableRow>
                                                     )}
                                                   </TableBody>
                                               </Table>                                                 
                                                    : null}

                                                    {showSecondTable ?
                                                      <Table  className="w-full flex items-center justify-center" 
                                                      columnAutoWidth={true}
                                                      columnSpacing={10}
                                                      aria-label="Selection behavior table example with dynamic content"
                                                      selectionMode="multiple"
                                                      selectionBehavior={selectionBehavior}>
                                                      <TableHeader columns={columns}>
                                                        {(column) => (
                                                          <TableColumn key={column.key} className="text-xs gap-6">
                                                            {column.label}
                                                          </TableColumn>
                                                        )}
                                                      </TableHeader>
                                                      <TableBody items={orderData.orderDetail.filter(order => order.orderState === "confeccion")}>
                                                      {(item) => (
                                                        <TableRow key={item.productId}>
                                                          {columns.map(column => (
                                                            <TableCell key={column.key} className="text-start items-start">
                                                              {item[column.key]}
                                                            </TableCell>
                                                          ))}
                                                        </TableRow>
                                                      )}
                                                    </TableBody>
                                                </Table>  : null}
                                            </div>
                                            <div className=" w-full flex justify-end">
                                               {showFirstTable ?  <Button  isDisabled={availableButton ? false : true} color={"primary"} className="mr-6  dark:bg-white  font-bold"> Pasar a Confeccion</Button> : null}
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
