"use client"
import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,} from "@nextui-org/react";
import pedidosConfirmados from "./JsonEjemplo.js";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import axios from "axios"


export default function Home() {

 
  const router = useRouter();

    useEffect(() => {
    const hasVisitedHome = localStorage.getItem('hasVisitedHome');
    console.log(hasVisitedHome)
    
    if (!hasVisitedHome) {
    localStorage.setItem('hasVisitedHome', 'true'); 
    router.push('/login');
    }
    }, [router]);
  
   useEffect(() => { 
        console.log("Aa")
        axios.get("http://backend-allegra-pedidos.lndo.site/api/orders")
             .then((res) => { 
              console.log(res.data)
             })
             .catch((err) => { 
              console.log(err)
             })
   }, [])

   /*
   useEffect(() => { 
    axios.get("http://backend-allegra-pedidos.lndo.site/api/${orderId}")
         .then((res) => { 
          console.log(res.data)
         })
         .catch((err) => { 
          console.log(err)
         })
}, []) */

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

  return (
    <div className="mt-6">
        <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={pedidosConfirmados}>
            {(item) => (
              <TableRow key={item.key}>
                {columns.map((column) => (
                  <TableCell key={column.key}>{item[column.key]}</TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}

