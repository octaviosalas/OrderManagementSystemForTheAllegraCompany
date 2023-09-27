import React, {useState} from "react"
import { Button } from "@nextui-org/react";
import MyModal from "./modals/EditModal"
import OrdenDetailModal from "./modals/OrdenDetailModal";

const apiData = [
  { 
            key: "1",
            NumeroDePedido: "100",          
            Razonsocial: "La Almeria SRL",
            Cuit: "23829329929",
            Email: "salasoctavio129@gmail.com",
            Ciudadprovincia: "Buenos Aires, La Plata",
            Estado: "En Proceso"
           
         },
         { 
            key: "1",
            NumeroDePedido: "200",         
            Razonsocial: "La Almeria SRL",
            Cuit: "23829329929",
            Email: "salasoctavio129@gmail.com",
            Ciudadprovincia: "Buenos Aires, La Plata",
            Estado: "En Proceso"         
         },
         { 
            key: "1",
            NumeroDePedido: "300",          
            Razonsocial: "La Almeria SRL",
            Cuit: "23829329929",
            Email: "salasoctavio129@gmail.com",
            Ciudadprovincia: "Buenos Aires, La Plata",
            Estado: "En Proceso"         
         },
         { 
            key: "1",
            NumeroDePedido: "500",          
            Razonsocial: "La Almeria SRL",
            Cuit: "23829329929",
            Email: "salasoctavio129@gmail.com",
            Ciudadprovincia: "Buenos Aires, La Plata",
            Estado: "En Proceso"          
         },
         { 
            key: "1",
            NumeroDePedido: "600",
            Razonsocial: "La Almeria SRL",
            Cuit: "23829329929",
            Email: "salasoctavio129@gmail.com",
            Ciudadprovincia: "Buenos Aires, La Plata",
            Estado: "En Proceso"         
         }
];

const pedidosConfirmados = apiData.map(item => ({
  key: item.key,
  NumeroDePedido: item.NumeroDePedido,
  Razonsocial: item.Razonsocial,
  Cuit: item.Cuit,
  Email: item.Email,
  Ciudadprovincia: item.Ciudadprovincia,
  Estado: item.Estado,
  detalle:  <OrdenDetailModal razonSocial={item.Razonsocial} cuit={item.Cuit}  email={item.Email} localidad={item.Ciudadprovincia} estado={item.Estado}/>,
  Eliminar: <Button className="bg-red-500 text-white hover:bg-red-800  h-8 mr-2">Eliminar</Button>,
  Editar:   <MyModal codigoProducto={item.CodProd} producto={item.Producto} atributos={item.Precio} cantidad={item.Cantidad} precio={item.Precio}/>
}));

export default pedidosConfirmados


