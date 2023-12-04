"use client";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";
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
import AddNewUser from "../modals/AddNewUser";
import { Chip } from "@nextui-org/react";

export default function TableUsers() {
  const [selectedColor, setSelectedColor] = React.useState("default");
  const tableRef = useRef(null);
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
  const [searchTerm, setSearchTerm] = useState("");
  const [load, setLoad] = useState(true);

  const updateUsers = (newUsers) => {
    setData(newUsers);
  };

  const showUserUpdated = () => {
    axios
      .get("http://localhost:4000/allUsers")
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
        .get("http://localhost:4000/allUsers")
        .then((res) => {
          console.log(res.data);
          setData(res.data);
          console.log(res.data);
          setLoad(false);
          const propiedades = Object.keys(res.data[0]).filter(
            (propiedad) =>
              propiedad !== "__v" &&
              propiedad !== "_id" &&
              propiedad !== "password"
          );
          const columnObjects = propiedades.map((propiedad) => ({
            key: propiedad,
            label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1),
          }));

          columnObjects.push({
            key: "Editar",
            label: "Editar",
            cellRenderer: (cell) => {
              const filaActual = cell.row;
              const name = filaActual.original.name;
              const surname = filaActual.original.surname;
              const email = filaActual.original.email;
              const rol = filaActual.original.rol;
              const id = filaActual.original._id;
              const userData = {
                name: name,
                surname: surname,
                email: email,
                rol: rol,
                id: id,
              };
              return (
                <EditOrderModal
                  userData={userData}
                  type={"users"}
                  peticionUsersAgain={showUserUpdated}
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
              const userData = {
                userId: id,
              };
              return (
                <DeleteOrderModal
                  userData={userData}
                  type={"users"}
                  updateUsersNow={updateUsers}
                  allUsers={data}
                />
              );
            },
          });

          setColumns(columnObjects);

          if (tableRef.current) {
            tableRef.current.updateColumns(columnObjects);
          }
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

  const transformedRol = (rol) => {
    switch (rol) {
      case "1":
        return "Admin";
      case "2":
        return "Confeccion";
      case "3":
        return "Corte";
      case "4":
        return "Planchado / Control de Calidad";
      default:
        return "Otro Rol";
    }
  };

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
            <AddNewUser updateList={showUserUpdated} />
          </div>

          <Table
            columnAutoWidth={true}
            columnSpacing={10}
            aria-label="Selection behavior table example with dynamic content"
            selectionMode="multiple"
            selectionBehavior={selectionBehavior}
            className="w-full"
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
                    <TableCell key={column.key} >
                      
                      {column.key === "rol" ? (
                        <Chip
                          color={
                            transformedRol(item[column.key]) === "Corte"
                              ? "warning"
                              : transformedRol(item[column.key]) ===
                                "confeccion"
                              ? "secondary"
                              : "success"
                          }
                        >
                          {transformedRol(item[column.key])}
                        </Chip>
                      ) : column.cellRenderer ? (
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

/*   <input className="w-[40%] border border-none focus:outline-none  focus:ring-0 h-8 rounded-lg bg-gray-200" placeholder="Buscador" onChange={(e) => setSearchTerm(e.target.value)}  value={searchTerm}/>
 */
