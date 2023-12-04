"use client"
import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";
import AddNewProductionOrder from "../modals/AddNewProductionOrder";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import EditOrderModal from "../modals/EditOrder";
import DeleteOrderModal from "../modals/DeleteOrder";
import { useRef } from "react";
import { Chip } from "@nextui-org/react";

export default function TablePedidos() {

  const [selectedColor, setSelectedColor] = React.useState("default");
  const tableRef = useRef(null);
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([]);
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  const [searchTerm, setSearchTerm] = useState("")
  const [load, setLoad] = useState(true)


  const actualizarOrdenes = (newOrders) => {
    setData(newOrders)
  };

  const settingLoad = () => { 
    setLoad(true)
  }

            useEffect(() => {
              if(data.length === 0) { 
                axios.get("http://localhost:4000/allOrders") 
                .then((res) => {
                        console.log(res.data) 
                        setData(res.data);
                        console.log(res.data)
                        const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id' && propiedad !== 'orderDetail');
                        const columnObjects = propiedades.map(propiedad => ({
                            key: propiedad,
                            label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1)
                      }));

                columnObjects.push({
                  key: 'VerDetalle',
                  label: 'Detalle',
                  cellRenderer: (cell) => { 
                    const filaActual = cell.row;
                    const id = filaActual.original._id;
                    const orderDetail = filaActual.original.orderDetail;                 
                    const orderDetailPropsArray = orderDetail.map(item => ({
                      productId: item.codigoProducto,
                      name: item.nombre,
                      quantity: item.cantidad,
                      observations: item.observaciones,
                      orderState: item.orderState
                    }));
                
                    const orderData = {
                      id: id,
                      orderDetail: orderDetailPropsArray,
                    };
                
                    return (
                      <ProduccionDetailModal orderData={orderData} setLoadAgain={settingLoad}/> 
                    );
                  },
                });
             
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
                              state: state,
                              orderDetail: orderDetail,
                              };
                              return (
                              <EditOrderModal orderData={orderData} type={"orders"}/>
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
                            return <DeleteOrderModal orderData={orderData} type={"orders"} updateNow={actualizarOrdenes} allOrders={data} />;                   
                        },
                      });
      
                          
                          setColumns(columnObjects);
      
                          if (tableRef.current) {
                              tableRef.current.updateColumns(columnObjects);
                          }
                          setTimeout(() => { 
                            setLoad(false)
                        }, 1000)
                      })
                      .catch((err) => {
                      console.log(err);
                    });
                    }
                  
            }, [load, data]);

            const filteredData = data.filter((item) => {
              return Object.values(item).some((value) =>
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
              );
          });



  return (
    <>
     {load ? <p>aaa</p> : 
     <div className="flex flex-col text-center justify-center mt-48">
          <div className="flex justify-between m-2">
              <Input style={{border: "none"}}
                  classNames={{ base: "w-full sm:max-w-[40%]" }} 
                  disableFilled={true}
                  placeholder="Buscador"
                  size="xxs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <AddNewProductionOrder/>
          </div>

          <Table columnAutoWidth={true} columnSpacing={10}  aria-label="Selection behavior table example with dynamic content"   selectionMode="multiple" selectionBehavior={selectionBehavior} className="w-full">
              <TableHeader columns={columns}>
                  {(column) => (<TableColumn key={column.key}className="text-center">{column.label}</TableColumn>)}
              </TableHeader>
              <TableBody items={filteredData}>
                  {(item) => (
                  <TableRow key={item._id}>
                      {columns.map((column) => (
                          <TableCell key={column.key}>
                          {column.key === 'state' ? (
                           <Chip color={item[column.key] === "Corte" ? "warning" : item[column.key] === "confeccion" ? "secondary" : "success" }>{item[column.key]}</Chip>                                              
                          ) : (
                            // Para otras columnas, renderizar el valor directo
                            column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]
                          )}
                        </TableCell>
                ))}
                  </TableRow>
                  )}
              </TableBody>
          </Table>
      </div>}
    </>
  
  );
}









