import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Input,
  getKeyValue,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import "../../globals.css";
import TabsModal from "../components/tabs";
import axios from "axios";

const ProduccionDetailModal = ({ orderData, setLoadAgain }) => {
  const [modalIsOpenNow, setModalIsOpenNow] = useState(false);
  const [showFirstTable, setShowFirstTable] = useState(true);
  const [showSecondTable, setShowSecondTable] = useState(false);
  const [showThirdTable, setShowThirdTable] = useState(false);
  const [orderDetailData, setOrderDetailData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [load, setLoad] = useState(false);
  const [lastTable, setLastTable] = useState(false);
  const [availableFirstButton, setAvailableFirstButton] = useState(false);
  const [availableSecondButton, setAvailableSecondButton] = useState(false);
  const [selectionBehavior, setSelectionBehavior] = React.useState("toggle");

  useEffect(() => {
    if (
      orderData &&
      orderData.orderDetail &&
      Array.isArray(orderData.orderDetail) &&
      orderData.orderDetail.length > 0
    ) {
      const firstDetail = orderData.orderDetail[0];
      const properties = Object.keys(firstDetail);
      const filteredProperties = properties.filter(
        (property) => property !== "orderState"
      );

      const columnLabelsMap = {
        productId: "Codigo Producto",
        name: "Nombre Producto",
        quantity: "Cantidad",
        observations: "Observaciones",
      };

      const tableColumns = filteredProperties.map((property) => ({
        key: property,
        label: columnLabelsMap[property]
          ? columnLabelsMap[property]
          : property.charAt(0).toUpperCase() + property.slice(1),
      }));

      setColumns(tableColumns);
    }
  }, [orderData]);

  const passOrderToConfection = () => {
    const orderEdited = {
      state: "Confeccion",
    };
    axios
      .put(`http://localhost:4000/editOrderState/${orderData.id}`, orderEdited)
      .then((res) => {
        console.log(res.data);
        setLoadAgain();
        setTimeout(() => { 
          setModalIsOpenNow(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const passOrderToIroningAndQuality = () => {
    const orderEdited = {
      state: "Planchado / Control de Calidad",
    };
    axios
      .put(`http://localhost:4000/editOrderState/${orderData.id}`, orderEdited)
      .then((res) => {
        console.log(res.data);
        setLoadAgain();
        setTimeout(() => {  
          setModalIsOpenNow(false)
        }, 1000)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showingFirstTable = () => {
    setShowFirstTable(true);
    setShowSecondTable(false);
    setLastTable(false);
    setShowThirdTable(false);
    console.log("aa");
  };

  const showingSecondTable = () => {
    setShowSecondTable(true);
    setShowFirstTable(false);
    setLastTable(false);
    setShowThirdTable(false);
    console.log("bb");
  };

  const showingThirdTable = () => {
    setShowSecondTable(false);
    setShowFirstTable(false);
    setLastTable(true);
    setShowThirdTable(true);
    console.log("bb");
  };

  const showButtonFinally = () => {
    setLastTable(true);
    console.log("sdgbsh");
  };

  const openModal = () => {
    setModalIsOpenNow(true);
  };

  const closeModal = () => {
    setModalIsOpenNow(false);
  };

  return (
    <>
      <small
        className="underline cursor-pointer text-sm"
        onClick={openModal}
        color="default"
      >
        Ver Detalle
      </small>
      <Modal
        isOpen={modalIsOpenNow}
        onOpenChange={closeModal}
        className="modalGeneral"
        classNames={{ wrapper: "items-center" }}
      >
        <ModalContent className="modalGeneral">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 items-center jusitify-start">
                <TabsModal
                  showFirst={showingFirstTable}
                  showSecond={showingSecondTable}
                  showThird={showingThirdTable}
                  showLastTable={showButtonFinally}
                />
              </ModalHeader>

              <ModalBody className="w-100% flex flex-col">
                <div className="flex flex-col border w-[1034px]">
                  {showFirstTable ? (
                    <Table
                      className="w-full flex items-center justify-center"
                      columnAutoWidth={true}
                      columnSpacing={10}
                      aria-label="Selection behavior table example with dynamic content"
                      selectionMode="multiple"
                      selectionBehavior={selectionBehavior}
                      onSelectionChange={(event) => {
                        console.log(event);
                        if (event === "all") {
                          setAvailableFirstButton(true);
                        } else if (event !== "all") {
                          setAvailableFirstButton(false);
                        }
                      }}
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn
                            key={column.key}
                            className="text-xs gap-6"
                          >
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={orderData.orderDetail.filter(
                          (order) => order.orderState === "Corte"
                        )}
                      >
                        {(item) => (
                          <TableRow key={item.productId}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.key}
                                className="text-start items-start"
                              >
                                {item[column.key]}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  ) : null}

                  {showSecondTable ? (
                    <Table
                      className="w-full flex items-center justify-center"
                      columnAutoWidth={true}
                      columnSpacing={10}
                      aria-label="Selection behavior table example with dynamic content"
                      selectionMode="multiple"
                      selectionBehavior={selectionBehavior}
                      onSelectionChange={(event) => {
                        console.log(event);
                        if (event === "all") {
                          setAvailableSecondButton(true);
                        } else if (event !== "all") {
                          setAvailableSecondButton(false);
                        }
                      }}
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn
                            key={column.key}
                            className="text-xs gap-6"
                          >
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={orderData.orderDetail.filter(
                          (order) => order.orderState === "Confeccion"
                        )}
                      >
                        {(item) => (
                          <TableRow key={item.productId}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.key}
                                className="text-start items-start"
                              >
                                {item[column.key]}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  ) : null}

                  {showThirdTable ? (
                    <Table
                      className="w-full flex items-center justify-center"
                      columnAutoWidth={true}
                      columnSpacing={10}
                      aria-label="Selection behavior table example with dynamic content"
                      selectionMode="multiple"
                      selectionBehavior={selectionBehavior}
                    >
                      <TableHeader columns={columns}>
                        {(column) => (
                          <TableColumn
                            key={column.key}
                            className="text-xs gap-6"
                          >
                            {column.label}
                          </TableColumn>
                        )}
                      </TableHeader>
                      <TableBody
                        items={orderData.orderDetail.filter(
                          (order) =>
                            order.orderState ===
                            "Planchado / Control de Calidad"
                        )}
                      >
                        {(item) => (
                          <TableRow key={item.productId}>
                            {columns.map((column) => (
                              <TableCell
                                key={column.key}
                                className="text-start items-start"
                              >
                                {item[column.key]}
                              </TableCell>
                            ))}
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  ) : null}
                </div>
                <div className=" w-full flex justify-end">
                  {showFirstTable ? (
                    <Button
                      isDisabled={availableFirstButton ? false : true}
                      color={"primary"}
                      className="mr-6 dark:bg-white font-bold"
                      onClick={() => passOrderToConfection()}
                    >
                      Pasar a Confeccion
                    </Button>
                  ) : null}

                  {showSecondTable && !lastTable ? (
                    <Button
                      className="mr-6  dark:bg-white  font-bold"
                      isDisabled={availableSecondButton ? false : true}
                      color={"primary"}
                      onClick={() => passOrderToIroningAndQuality()}
                    >
                      Pasar a Planchado / Control de Calidad
                    </Button>
                  ) : null}

                  {showThirdTable && lastTable ? (
                    <Button className="mr-6 bg-gray-300 dark:bg-white text-black font-bold">
                      Finalizar
                    </Button>
                  ) : null}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
export default ProduccionDetailModal;
