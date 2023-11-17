import React, {useEffect} from "react";
import {Tabs, Tab, Card, CardBody, CardHeader} from "@nextui-org/react";

export default function TabsModal({showFirst, showSecond, showLastTable}) {
  const [selected, setSelected] = React.useState("photos");

  const handleFirstTab = () => { 
    console.log("yyyyyyyyyy")
  }

  useEffect(() => { 
    if(selected === "Confeccion") { 
        showSecond()
    } else if (selected === "Corte") { 
        showFirst()
    } else if (selected === "Planchado/Control de Calidad") { 
        showSecond()
        showLastTable()
    } 
  },[selected])

  return (
    <div className="flex w-full flex-col">
      <Tabs  aria-label="Options"  selectedKey={selected}   onSelectionChange={setSelected}
      >
        <Tab key="Corte" title="Corte">
            <div className="flex flex-col">
                <div className="bg-gray-200  h-8 w-36 dark:bg-white">
                    <small className="text-xs text-black m-4 dark:text-black">Estado: En Corte</small>
                </div>
                <div className="mt-12">
                    <small className="text-xs text-black dark:text-white">Listado de productos del pedido</small>
                </div>
             </div>
        </Tab>
        <Tab key="Confeccion" title="Confeccion" onSelectionChange={handleFirstTab}>
            <div className="flex gap-12 text-center">
                <div className="bg-gray-200  h-8 w-36">
                    <small className="text-xs text-black m-4 ">Estado: En Corte</small>
                </div>
                <div className="bg-gray-200 dark:bg-white flex flex-col items-center justify-center">
                    <small className="text-xxs m-2 text-white dark:text-black">Seleccion taller de Confeccion</small>
                    <div className="flex m-2 w-full text-start justify-start">
                        <select className=" h-8 border rounded-lg text-xs ml-2">
                            <option className="text-xs">Selecciona un taller</option>
                            <option className="text-xs">aaa</option>
                            <option className="text-xs">aaa</option>
                            <option className="text-xs">aaa</option>
                        </select>
                    </div>
                    <div className="m-2 flex flex-col justify-start items-start ml-2">
                        <small className="text-xs">No encuentras el taller deseado?</small>
                        <small className="text-xs">Añadelo ahora <b className="underline cursor-pointer">aqui</b> </small>
                    </div>
                 
                </div>
             </div>
             <div className="mt-4">
                <small className="text-xs text-black dark:text-white">Listado de productos en Confeccion</small>
             </div>
        </Tab>
        <Tab key="Planchado/Control de Calidad" title="Planchado/Control de Calidad" onClick={() => (console.log("cccccccccccc"))}>
            <div className="flex gap-12">
                    <div className="bg-gray-200 h-8 w-36">
                        <small className="text-xs text-black m-4">Estado: En Corte</small>
                    </div>
                    <div className="bg-gray-200 h-8 w-56 justify-center text-center">
                        <small className="text-xs">Taller de confeccion: Lorem Impsut</small>
                    </div>
                </div>
         </Tab> 
      </Tabs>
    </div>  
  );
}