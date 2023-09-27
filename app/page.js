"use client"
import React from "react";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell,} from "@nextui-org/react";
import pedidosConfirmados from "./JsonEjemplo.js";

export default function Home() {

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

