"use client";
import React from "react";
import Navbar from "../components/navbar";
import TableUsers from "../components/TableUsers";

export default function Users() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <TableUsers />
    </div>
  );
}
