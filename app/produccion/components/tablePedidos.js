"use client"
import React from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio} from "@nextui-org/react";
import axios from "axios"
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";

const colors = ["default", "primary", "secondary", "success", "warning", "danger"];

export default function TablePedidos() {
  const [selectedColor, setSelectedColor] = React.useState("default");

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
        <p className="font-bold text-md ml-6">Pedidos</p>
          <Table className="text-black dark:text-white"  color={selectedColor} selectionMode="single"  defaultSelectedKeys={["2"]}  aria-label="Example static collection table" >
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
