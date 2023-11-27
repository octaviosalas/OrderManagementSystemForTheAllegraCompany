"use client"
import React from "react";
import axios from "axios"
import { useState, useEffect } from "react";
import ProduccionDetailModal from "../modals/ProduccionDetailModal";
import {Table,TableHeader,TableColumn,TableBody,TableRow,TableCell, Button, Input} from "@nextui-org/react";
import EditOrderModal from "../modals/EditOrder";
import DeleteOrderModal from "../modals/DeleteOrder";
import { useRef } from "react";
import AddNewUser from "../modals/AddNewUser";

export default function TableUsers() {

    const [selectedColor, setSelectedColor] = React.useState("default");
    const tableRef = useRef(null);
    const [data, setData] = useState([])
    const [columns, setColumns] = useState([]);
    const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");
    const [searchTerm, setSearchTerm] = useState("")
    const [load, setLoad] = useState(true)

    const updateUsers = (newUsers) => {
      setData(newUsers);
    };


            useEffect(() => {
          axios.get("http://localhost:4000/allUsers") 
           .then((res) => {
                  console.log(res.data) 
                  setData(res.data);
                  console.log(res.data)
                  setLoad(false);
                  const propiedades = Object.keys(res.data[0]).filter(propiedad => propiedad !== '__v' && propiedad !== '_id' && propiedad !== 'password');
                  const columnObjects = propiedades.map(propiedad => ({
                      key: propiedad,
                      label: propiedad.charAt(0).toUpperCase() + propiedad.slice(1)
                }));

                
             
                      columnObjects.push({
                          key: 'Editar',
                          label: 'Editar',
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
                              id: id
                            };
                              return (
                              <EditOrderModal userData={userData} type={"users"}/>
                              );
                          },
                      }) 

                      columnObjects.push({
                        key: 'Eliminar',
                        label: 'Eliminar',
                        cellRenderer: (cell) => { 
                          const filaActual = cell.row;
                          const id = filaActual.original._id;
                          const userData = {
                          userId: id
                          };
                          return (
                            <DeleteOrderModal userData={userData}  type={"users"} updateUsersNow={updateUsers} allUsers={data}/>
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
            }, [load]);

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
              <AddNewUser/>
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
                    {column.cellRenderer ? column.cellRenderer({ row: { original: item } }) : item[column.key]}
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


