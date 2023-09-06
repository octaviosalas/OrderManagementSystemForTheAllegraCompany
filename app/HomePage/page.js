"use client"
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import pedidosConfirmados from "./JsonEjemplo.js";



export default function Home() {
  

  const columns = [
    {
      key: "CodProd",
      label: "Cod Prod",
    },
    {
      key: "Producto",
      label: "Producto",
    },
    {
      key: "Atributos",
      label: "Atributos",
    },
    {
      key: "Cantidad",
      label: "Cantidad",
    },
    {
      key: "Precio",
      label: "Precio",
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

