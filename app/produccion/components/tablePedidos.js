"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";
import AddNewProductionOrder from "../modals/AddNewProductionOrder";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Input,
} from "@nextui-org/react";
import EditOrderModal from "../modals/EditOrder";
import DeleteOrderModal from "../modals/DeleteOrder";
import { useRef } from "react";
import { Chip } from "@nextui-org/react";

export default function TablePedidos() {
  const [selectedColor, setSelectedColor] = React.useState("default");
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  const [searchTerm, setSearchTerm] = useState("");
  const [load, setLoad] = useState(true);

  const actualizarOrdenes = (newOrders) => {
    setData(newOrders);
  };
  


  const showOrderUpdated = () => {
    axios
      .get("http://localhost:4000/allOrders")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  

  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:4000/allOrders")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          console.log(res.data);
          const propiedades = Object.keys(res.data[0]).filter(
            (propiedad) =>
              propiedad !== "__v" &&
              propiedad !== "_id" &&
              propiedad !== "orderDetail"
          );
          const columnObjects = propiedades.map((propiedad) => ({
            key: propiedad,
            label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
          }));

          columnObjects.push({
            key: "VerDetalle",
            label: "Detalle",
            cellRenderer: (cell) => {
              const filaActual = cell.row;
              const id = filaActual.original._id;
              const orderDetail = filaActual.original.orderDetail;
              const orderDetailPropsArray = orderDetail.map((item) => ({
                productId: item.codigoProducto,
                name: item.nombre,
                quantity: item.cantidad,
                observations: item.observaciones,
                orderState: item.orderState,
              }));

              const orderData = {
                id: id,
                orderDetail: orderDetailPropsArray,
              };

              return (
                <ProduccionDetailModal
                  orderData={orderData}
                  setLoadAgain={showOrderUpdated}
                />
              );
            },
          });

          columnObjects.push({
            key: "Editar",
            label: "Editar",
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
                <EditOrderModal
                  orderData={orderData}
                  type={"orders"}
                  peticionAgain={showOrderUpdated}
                />
              );
            },
          });

          columnObjects.push({
            key: "Eliminar",
            label: "Eliminar",
            cellRenderer: (cell) => {
              const filaActual = cell.row;
              const id = filaActual.original._id;
              const orderData = {
                id: id,
              };
              return (
                <DeleteOrderModal
                  orderData={orderData}
                  type={"orders"}
                  updateNow={actualizarOrdenes}
                  allOrders={data}
                />
              );
            },
          });

          setColumns(columnObjects);

          if (tableRef.current) {
            tableRef.current.updateColumns(columnObjects);
          }
          setTimeout(() => {
            setLoad(false);
          }, 1000);
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
      {load ? (
        <p>aaa</p>
      ) : (
        <div className="flex flex-col text-center justify-center mt-48">
          <div className="flex justify-between m-2">
            <input
              className="w-[40%] border border-none focus:outline-none  focus:ring-0 h-10 rounded-xl bg-gray-200"
              placeholder="Buscador"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />

            <AddNewProductionOrder updateList={showOrderUpdated} />
          </div>

          <Table
            columnAutoWidth={true}
            columnSpacing={10}
            aria-label="Selection behavior table example with dynamic content"
            selectionMode="multiple"
            selectionBehavior={selectionBehavior}
            className="w-full max-h-[600px] overflow-y-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key} className="text-center">
                  {column.label}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody items={filteredData}>
              {(item) => (
                <TableRow key={item._id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {column.key === "state" ? (
                        <Chip
                          color={
                            item[column.key] === "Corte"
                              ? "warning"
                              : item[column.key] === "Confeccion"
                              ? "secondary"
                              : "success"
                          }
                        >
                          {item[column.key]}
                        </Chip>
                      ) : // Para otras columnas, renderizar el valor directo
                      column.cellRenderer ? (
                        column.cellRenderer({ row: { original: item } })
                      ) : (
                        item[column.key]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
}


  
 /* const formatManufacturingCost = (cost) => {
    const numericCost = parseFloat(cost);
  
    if (!isNaN(numericCost) && typeof numericCost === 'number') {
      const formattedCost = `${numericCost.toLocaleString("es-AR", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
      })} ARS`;
  
      console.log("Formatted Cost:", formattedCost);
  
      return formattedCost;
    } else {
      console.log("Invalid manufacturingCost:", cost);
      return cost;
    }
  };

  useEffect(() => { 
    console.log(data)
  }, [data])

  useEffect(() => {
    if (data.length === 0) {
      axios
        .get("http://localhost:4000/allOrders")
        .then((res) => {
          console.log(res.data);
          const formattedData = res.data.map((order) => ({
            ...order,
            manufacturingCost: formatManufacturingCost(order.manufacturingCost),
          }));
    
          setData(formattedData);
          console.log(res.data);
          const propiedades = Object.keys(formattedData[0]).filter( */
