import React from "react";
import Navbar from "./components/navbar";
import TablePedidos from "./components/tablePedidos";

const productionPedidos = () => {
  return (
    <div className="flex flex-col">
      <Navbar />
      <TablePedidos />
    </div>
  );
};

export default productionPedidos;
