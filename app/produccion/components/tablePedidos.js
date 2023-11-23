"use client"
import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";
import AddNewProductionOrder from "../modals/AddNewProductionOrder";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import EditOrderModal from "../modals/EditOrder";
import DeleteOrderModal from "../modals/DeleteOrder";

export default function TablePedidos() {

  const [selectedColor, setSelectedColor] = React.useState("default");
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  const [searchTerm, setSearchTerm] = useState("")


  useEffect(() => {
    axios.get("https://allegra-apps.fly.dev/api/orders") 
         .then((res) => {
        console.log(res.data.data.orders) 
        })
        .catch((err) => {
        console.log(err);
      });
    }, []);


  return (
    <>
      <div className="flex flex-col gap-3 mt-52 text-black"> 
      <div className="flex justify-between text-center items-center">
        <p className="font-bold text-md ml-6">Pedidos Produccion</p>
        <AddNewProductionOrder/>
      </div>
        
          <Table className="text-black dark:text-white mt-12"  color={selectedColor} selectionMode="single"  defaultSelectedKeys={["2"]}  aria-label="Example static collection table" >
            <TableHeader>
              <TableColumn className="text-black dark:text-white font-bold" >Id</TableColumn>
              <TableColumn className="text-black dark:text-white font-bold" >Codigo Producto</TableColumn>
              <TableColumn className="text-black dark:text-white font-bold" >Costo de Confeccion</TableColumn>
              <TableColumn className="text-black dark:text-white font-bold" >Estado</TableColumn>
              <TableColumn className="text-black dark:text-white font-bold" >Detalle</TableColumn>
              <TableColumn className="text-black dark:text-white font-bold" >Editar</TableColumn>
              <TableColumn className="text-black dark:text-white font-bold" >Eliminar</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>Tony Reichert</TableCell>
                <TableCell>CEO</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
                <TableCell><ProduccionDetailModal/></TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>Zoey Lang</TableCell>
                <TableCell>Technical Lead</TableCell>
                <TableCell>Paused</TableCell>
                <TableCell>Active</TableCell>
                <TableCell><ProduccionDetailModal/></TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>Jane Fisher</TableCell>
                <TableCell>Senior Developer</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
                <TableCell><ProduccionDetailModal/></TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
              <TableRow key="4">
                <TableCell>William Howard</TableCell>
                <TableCell>Community Manager</TableCell>
                <TableCell>Vacation</TableCell>
                <TableCell>Active</TableCell>
                <TableCell><ProduccionDetailModal/></TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Active</TableCell>
              </TableRow>
            </TableBody>
          </Table>
    </div>
    </>
  
  );
}



/*

"use client"
import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";
import AddNewProductionOrder from "../modals/AddNewProductionOrder";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import EditOrderModal from "../modals/EditOrder";
import DeleteOrderModal from "../modals/DeleteOrder";

export default function TablePedidos() {

  const [selectedColor, setSelectedColor] = React.useState("default");
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  const [searchTerm, setSearchTerm] = useState("")


  useEffect(() => {
    axios.get("https://allegra-apps.fly.dev/api/orders") 
         .then((res) => {
        console.log(res.data.data.orders) 
        })
        .catch((err) => {
        console.log(err);
      });
    }, []);

    useEffect(() => {
      axios.get("http://localhost:4000/allOrders") 
           .then((res) => {
                  console.log(res.data) 
                  setData(res.data);
                  console.log(res.data)
                  const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id' && propiedad !== 'id' && propiedad !== 'orderDetail');
                  const columnObjects = propiedades.map(propiedad => ({
                      key: propiedad,
                      label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
                      allowsSorting: true
                }));

                columnObjects.push({
                  key: 'VerDetalle',
                  label: 'Detalle',
                  cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const id = filaActual.original._id;
                    const orderDetail = filaActual.original.orderDetail;
                    const orderData = {
                    id: id,
                    detail: orderDetail,
                    };
                    return (
                      <ProduccionDetailModal  orderData={orderData} /> 
                      );
                },
                  }) 
             
                      columnObjects.push({
                          key: 'Editar',
                          label: 'Editar',
                          cellRenderer: (cell) => {      

                              const filaActual = cell.row;                    
                              const orderId = filaActual.original._id;
                              const manufacturingCost = filaActual.original.manufacturingCost;
                              const state = filaActual.original.state;
                              const orderDetail = filaActual.original.orderDetail;
                              
                              const orderData = {
                              orderId: orderId,
                              manufacturingCost: manufacturingCost,
                              fechaCompra: fechaCompra,
                              state: state,
                              orderDetail: orderDetail,
                              };
                              return (
                              <EditOrderModal orderData={orderData} />
                              );
                          },
                      }) 

                      columnObjects.push({
                        key: 'Eliminar',
                        label: 'Eliminar',
                        cellRenderer: (cell) => { 
                          const filaActual = cell.row;
                          const id = filaActual.original._id;
                          const orderData = {
                          id: id
                          };
                          return (
                            <DeleteOrderModal orderId={orderData} />
                            );
                      },
                        }) 
      
                          
                          setColumns(columnObjects);
      
                          if (tableRef.current) {
                              tableRef.current.updateColumns(columnObjects);
                          }
                })
                .catch((err) => {
                console.log(err);
              });
            }, []);

            const filteredData = data.filter((item) => {
              return Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              );
          });

          useEffect(() => { 
              console.log(filteredData)
          }, [filteredData])


  return (
    <>
      <div>
          <div className="flex items-start m-2">
              <Input style={{border: "none"}}
                  classNames={{ base: "w-full sm:max-w-[40%]" }} 
                  disableFilled={true}
                  startContent={<SearchIcon className="text-default-300 " disableFocusRing />}  
                  placeholder="Buscador"
                  size="xxs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
          </div>

          <Table columnAutoWidth={true} columnSpacing={10}  aria-label="Selection behavior table example with dynamic content"   selectionMode="multiple" selectionBehavior={selectionBehavior} className="w-[1250px] h-[676px] text-center">
              <TableHeader columns={columns}>
                  {(column) => (<TableColumn key={column.key}className="text-center">{column.label}</TableColumn>)}
              </TableHeader>
              <TableBody items={filteredData}>
                  {(item) => (
                  <TableRow key={item._id}>
                      {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]}
                  </TableCell>
                ))}
                  </TableRow>
                  )}
              </TableBody>
          </Table>
      </div>
    </>
  
  );
}

*/








