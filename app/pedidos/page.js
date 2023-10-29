"use client"
import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,} from "@nextui-org/react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios"
import MyModal from "./modals/EditModal"
import OrdenDetailModal from "./modals/OrdenDetailModal";
import { Button } from "@nextui-org/react";
import Loading from "./components/Loading";


export default function Home({orders}) {

  const router = useRouter();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true)

    useEffect(() => {
    const hasVisitedHome = localStorage.getItem('hasVisitedHome');
    console.log(hasVisitedHome)
    
    if (!hasVisitedHome) {
    localStorage.setItem('hasVisitedHome', 'true'); 
    router.push('/login');
    }
    }, [router]);
  
    useEffect(() => {
      axios
        .get("https://allegra-apps.fly.dev/api/orders")
        .then((res) => {
          setAllOrders(res.data.data.orders);
          console.log(res.data.data.orders)
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }, []);

    const deleteOrder = (id) => { 
      axios.delete(`https://allegra-apps.fly.dev/api/orders/${id}`)
      setAllOrders(allOrders.filter(order => order.id !== id));
    }

  const columns = [
    {
      key: "NumeroDePedido", 
      label: "Numero de Pedido",
    },
    {
      key: "Razonsocial",
      label: "Razón social",
    },
    {
      key: "Cuit",
      label: "Cuit",
    },
    {
      key: "Email",
      label: "Email",
    },
    {
      key: "Ciudadprovincia",
      label: "Ciudad / Provincia",
    },
    {
      key: "Estado",
      label: "Estado",
    },
    { 
      key: "detalle",
      label: "Detalle de Orden"
    },
    {
      key: "Eliminar",
      label: "Eliminar",
    },
    {
      key: "Editar",
      label: "Editar",
    },
  ];

  const confirmedOrders = allOrders.map((order) => ({
    NumeroDePedido: order.id,
    Razonsocial: order.business_name,
    Cuit: order.cuit,
    Email: order.client_email,
    Ciudadprovincia: order.province,
    Estado: order.state,
    detalle:  <OrdenDetailModal razonSocial={order.business_name} cuit={order.cuit}  email={order.client_email} localidad={order.province} estado={order.state} detalle={order.order_products}/>,
    Eliminar: <Button className="bg-red-500 text-white hover:bg-red-800  h-8 mr-2" onClick={() => deleteOrder(order.id)}>Eliminar</Button>,
    Editar:   <MyModal RazonSocial={order.business_name} Cuit={order.cuit} Email={order.client_email} Localidad={order.province}/>
  }));

  return (
    <>
    { loading ? 
    <div className="flex items-center justify-center mt-44">
       <Loading text="pedidos"/> 
    </div>    
       :
      <div className="mt-6">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={confirmedOrders}>
            {(item) => (
              <TableRow key={item.NumeroDePedido}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  }
  </>
  );
}

