"use client";
import React, { useRef } from 'react';
import dotenv from "dotenv"
import {Button, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from "@nextui-org/react";
import Hashids from "hashids";
import { useState, useEffect } from "react";
import InputAutocomplete from "./inputAutocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSelect from "./inputSelect";
import TableList from "./components/TableList";
import GetCurrentDate from "./helpers/GetCurrentDate";
import { OrderTableColumns, customerFormData } from "../config/Orders";
import GenerateUid from "./helpers/GenerateUid";

dotenv.config()

let productCodeTimeout = null;

export default function CreateOrder() {

	const endpoint_url = process.env.PS_API_URL;
	const api_token = process.env.PS_API_TOKEN;
	const json_format = "output_format=JSON";
	const language = "language=1";
	const defaultHeaders = {
		Authorization: api_token,
	};

	const hashId = new Hashids("", 6);

	const [productCode, setProductCode] = useState("");
	const [productsCodePossibilities, setProductsCodePossibilities] = useState();
	const [productPossibilities, setProductPossibilities] = useState([]);
	const [product, setProduct] = useState("");
	const [medAttribute, setMedAttribute] = useState("");
	const [estAttribute, setEstAttribute] = useState("");
	const [colorAttribute, setColorAttribute] = useState("");
	const [quantity, setQuantity] = useState(null);
	const [combination, setCombination] = useState("");
	const [combinationPrice, setCombinationPrice] = useState(0);
	const [firstAttribute, setFirstAttribute] = useState(0)
	const [secondAttribute, setSecondAttribute] = useState(0)

	// @TODO -> Use a single state and handle change function
	// pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
	const [businessName, setBusinessName] = useState("");
	const [cuit, setCuit] = useState("");
	const [email, setEmail] = useState("");
	const [townProvince, setTownProvince] = useState("");
	const [contact, setContact] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [direction, setDirection] = useState("");
	const [postalCode, setPostalCode] = useState("");
	const [productsToOrder, setProductsToOrder] = useState([]);
	const [orderNumber, setOrderNumber] = useState("0001");
	const [formattedAttributes, setFormattedAttributes] = useState([]);
	const [attributeGroups, setAttributeGroups] = useState([]);
	const [attribute, setAttribute] = useState([]);
	const [productCombinationsIds, setProductCombinationsIds] = useState([]);

	// const [combinationAttributes, setCombinationAttributes] = useState([]);


	useEffect(() => { 
		console.log("Cmbio el estAtributte a: ", medAttribute)
	}, [medAttribute])

	useEffect(() => { 
      console.log("Cmbio el estAtributte a: ", estAttribute)
	}, [estAttribute])

	useEffect(() => { 
		console.log("Cmbio el estAtributte a: ", colorAttribute)
	  }, [colorAttribute])
	
     
const addProduct = (e) => {

				let productKey = GenerateUid();


				/*const medAttributeAndEstAttribute = formattedAttributes.map((f) => { 
					const grupoUno =   f[0].group.label 
					const atributoGrupoUno = f[0].attribute.label
					const grupoDos =  f[1].group.label 
					const atributoGrupoDos = f[1].attribute.label
					console.log(grupoUno)
					console.log(atributoGrupoUno)
					console.log(grupoDos)
					console.log(atributoGrupoDos)
					return `${grupoUno} ${atributoGrupoUno} / ${grupoDos} ${atributoGrupoDos}`
				  })*/

				const checkAtributtes = () => {
					let result = "";
					switch (true) {
					  case medAttribute && estAttribute !== undefined:
						result = `Med: ${medAttribute} | Est: ${estAttribute}`;
						break;
					  case medAttribute === undefined && estAttribute !== undefined:
						result = `Est: ${estAttribute}`;
						break;
					  case medAttribute && estAttribute === undefined:
						result = "No hay";
						break;
					  case estAttribute === undefined:
						result = `Med: ${medAttribute}`;
						break;
					  default:
						result = "No hay";
					}
					return result;
				  }; 

					setAttributeGroups([])
					setProductCode("")
					setProduct("")
					setCombination("")
					setQuantity("-")

					const totalPrice = quantity * combinationPrice; 

					const formattedPrice = totalPrice.toLocaleString('es-ES', {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					  });

					  const priceWithSymbol = `$ ${formattedPrice}`;
					  console.log(formattedAttributes)

				setProductsToOrder([
					...productsToOrder,
					{
						key: productKey,
					    productCode: productCode, 
						product: product, 
						attributes: checkAtributtes(),
					    attributesObj: formattedAttributes, //Agarrar formattedAtttributes
						quantity: quantity, 
						price: priceWithSymbol,
						delete: (<Button color="danger" hover="bg-red-800" data-item_key={productKey} onClick={removeProductItem} className='hover:bg-red-700'> Eliminar </Button>),
					},
				]);
			};

const removeProductItem = (e) => {
				let product_key = e.target.dataset.item_key;
				setProductsToOrder((prevProducts) => {
					console.log([prevProducts]);
					return prevProducts.filter((product) => product.key !== product_key);
				});
			};

const createOrder = async () => {
				let order = {
					orderNumber: orderNumber,
					businessName: businessName,
					cuit: cuit,
					email: email,
					townProvince: townProvince,
					contact: contact,
					phoneNumber: phoneNumber,
					direction: direction,
					postalCode: postalCode,
					productsToOrder: productsToOrder,
				};

				console.log(order);
				console.log("post to backedn");
			};

const getProductsCode = (e) => {
					let memProductCode = e.target.value;
					if (memProductCode.length <= 0) {
						setProductsCodePossibilities([]);
						return;
					}

				    clearTimeout(productCodeTimeout);

				    productCodeTimeout = setTimeout(async () => {
					console.log("obtenemos datos");
					let result = await fetch(
						`${endpoint_url}/products?${json_format}&${language}&display=[id,name]&limit=15&filter[id]=%[${memProductCode}]%`,
						{ headers: defaultHeaders }
					);

					result.json().then((data) => {
                        data.products.map((d) => { 
							setProduct(d.name)
						})

						let formattedData = [];
						data.products.map(({ id, name }) => {
							formattedData.push({
								key: id,
								label: id,
							});
						});
						setProductsCodePossibilities(formattedData);
						console.log(productsCodePossibilities)
					});
				}, 800);
			};

const getProductName = (e) => {
				let memProductName = e.target.value;
				setProduct(memProductName);
				clearTimeout(productCodeTimeout);

				if (memProductName.length > 3) {
					productCodeTimeout = setTimeout(async () => {
						let result = await fetch(
							`${endpoint_url}/products?${json_format}&${language}&display=full&limit=15&filter[name]=%[${memProductName}]%`,
							{ headers: defaultHeaders }
						);

						result.json().then((data) => {
							let formattedData = [];
							let combinationsIds = [];
							data.products.map(({ id, name, associations }) => {
								formattedData.push({
									key: id,
									label: name,
								});
								associations.combinations.forEach(({ id }) => {
									combinationsIds.push(id);
								});
							});
							setProductPossibilities(formattedData);
							setProductCombinationsIds(combinationsIds);
						});
					}, 800);
				} else {
					setProductPossibilities([]);
				}
			};

			var quantityAtributes = 0; 

const getProductById = async (id) => {
				const attributeGroupsArray = [];
				console.log("getProductById EJECUTANDOSE.");

				let result = await fetch(
					`${endpoint_url}/products?${json_format}&${language}&display=full&filter[id]=%[${id}]%`,
					{ headers: defaultHeaders }
				);

				let data = await result.json();
				console.log("EL ID RESPONDE: ", data)

				let optionValuesStr = data.products[0].associations.product_option_values
					.map((item) => item?.id)
					.join("|");

				console.log(optionValuesStr);

				let optionValuesResult = await fetch(
					`${endpoint_url}/product_option_values?${json_format}&${language}&display=full&filter[id]=[${optionValuesStr}]`,
					{ headers: defaultHeaders }
				);

				let attributesData = await optionValuesResult.json();

				let getName = await fetch(
					`${endpoint_url}/product_option_values?${json_format}&${language}&display=full&filter[name]=[${optionValuesStr}]`,
					{ headers: defaultHeaders }
				);

				let theName = await getName.json()
				console.log(theName)

				const attributes = [];
				attributesData.product_option_values.forEach((attribute) => { //Los atributos posibles se ponen en el input como opciones
					attributes.push({
						key: attribute.id,
						
						label: attribute.name,
						group: attribute.id_attribute_group,
					});
				});

				const attributesWithUniqueAttributeGroup = attributes.reduce(
					(accumulator, current) => {
						if (!accumulator.find((item) => item.group === current.group)) {
							accumulator.push(current);
						}
						return accumulator;
					},
					[]
				);

				console.log(attributesWithUniqueAttributeGroup);

				attributesWithUniqueAttributeGroup.map(async ({ group }) => {
					let attributeGroupResult = await fetch(
						`${endpoint_url}/product_options?${json_format}&${language}&display=[id,name]&filter[id]=[${group}]`,
						{ headers: defaultHeaders }
					);

					let attributeGroupData = await attributeGroupResult.json();

					console.log(attributeGroupData);

					await Promise.all(
						attributeGroupData.product_options.map((attributeGroup) => {
							let attributesListForAttributeGroup = [];
							attributes.map((attribute) => {
								if (attribute.group == attributeGroup.id) {
									attributesListForAttributeGroup.push(attribute);
								}
							});

							attributeGroupsArray.push({
								key: attributeGroup.id,
								label: attributeGroup.name,
								input: (
									<InputSelect
										inputName={attributeGroup.name}
										inputId={attributeGroup.id}
										itemList={attributesListForAttributeGroup}
										setValues={setFormattedAttributes}
										// values={combinationAttributes}
										setCombinationAttribute={setCombinationAttribute}
									/>
								),
							});
						})
					);
				});

				setTimeout(() => {
					setAttributeGroups(attributeGroupsArray);
					console.log(attributeGroupsArray)
					quantityAtributes = attributeGroupsArray.length
					console.log("Cantidad de atributos: ", quantityAtributes)
				}, 500);

				console.log(formattedAttributes)
			};

			const combinationAttributes = [];

const setCombinationAttribute = (attribute) => {

				        let updateExistingAttribute = false;
						if (combinationAttributes.length > 0) {
							combinationAttributes.forEach((combinationAttribute) => {
				
						if (attribute.group.id === combinationAttribute.group.id) {
							combinationAttribute.attribute.label = attribute.attribute.label;
							combinationAttribute.attribute.id = attribute.attribute.id;
							updateExistingAttribute = true;
						}
					});
				}
						if (!updateExistingAttribute) {
							combinationAttributes.push(attribute);
						};

						console.log(combinationAttributes); 
	
						if (combinationAttributes.length >= quantityAtributes) {
							getCombination(combinationAttributes);

						} /*else if (combinationAttributes.length === 1) { 
							const idBuscado = combinationAttributes.map((c) => c.attribute.id)
							setCombination(idBuscado)
						}*/
					}; 

					

const getCombination = async (attributes) => {
				console.log("attributes from get combination");

				setFormattedAttributes([...formattedAttributes, attributes]);

				const optionsValuesToSearch = productCombinationsIds.join("|");

				let combinationsResult = await fetch(
					`${endpoint_url}/combinations?${json_format}&${language}&display=full&filter[id]=[${optionsValuesToSearch}]`,
					{ headers: defaultHeaders }
				);
		
				console.log("formattedAttributes");
				console.log(formattedAttributes);

				const combinationsData = await combinationsResult.json();

		//-----------------------------------------------------------

					console.log('combinationsData');
					console.log(combinationsData); 

					console.log(attributes); 
							
					const arrayDeAtributosSeleccionados = attributes.map((a) => a.attribute.id)
					console.log(arrayDeAtributosSeleccionados)
					const matchingObjects = [];
					

					const buscandoElObjetivo = () => {
						for (const data of combinationsData.combinations) {
						console.log("LA DATA: ", data);
						const optionProductValues = data.associations.product_option_values.map(obj => obj.id);
						setEstAttribute(optionProductValues[0])
						setMedAttribute(optionProductValues[1])
						console.log(optionProductValues);
						const isMatch = arrayDeAtributosSeleccionados.every(id => optionProductValues.includes(id));
						if (isMatch) {
							matchingObjects.push(data.id);
							setCombination(data.id)
							setCombinationPrice(data.price)
							console.log(combination)
						}			  
						console.log(matchingObjects);
						
						}
					}
					
					buscandoElObjetivo();
					
					console.log('Objetos que coinciden:', matchingObjects);

				

		//-----------------------------------------------------------
					combinationsData.combinations.map((combination) => {
						const combinationHasAllAttributes =
						combination.associations.product_option_values.every(({ id }) => {
							return attributes.includes(id);
						});

					

						// console.log("combination");
						// console.log(combination);
						if (combinationHasAllAttributes) {
							
							setCombinationPrice(combination.price);
							const combinationName = `${combination.reference}`;
							setCombination(combinationName);
						
						}

						console.log("no combination found");
					});
			};

	useEffect(() => { 
         console.log("Hola!! FormatedAttributes: ",  formattedAttributes)
	}, [formattedAttributes])
	
const resetFormNow = () => { 
					setBusinessName("")
					setEmail("")
					setCuit("")
					setContact("")
					setPhoneNumber("")
					setDirection("")
					setPostalCode("")
					setTownProvince("")
					setProductCode("")
					setProduct("")
					setCombination("")
					setQuantity("-")
					setAttributeGroups([])
					setProductsToOrder([])
		   	}

const handleInputChange = (label, newValue) => {
				switch (label) {
				case "Razón Social":
					setBusinessName(newValue);
					break;
				case "E-mail":
					setEmail(newValue);
					break;
				case "CUIT":
					setCuit(newValue);
					break;
				case "Contacto":
					setContact(newValue);
					break;
				case "Telefono":
					setPhoneNumber(newValue);
					break;
				case "Domicilio":
					setDirection(newValue);
					break;
				case "Código Postal":
					setPostalCode(newValue);
					break;
				case "Localidad - Provincia":
					setTownProvince(newValue);
					break;
				default:
					break;
				}
			};
			
	return (
		<div className='2xl:flex mb-28'>
			<div>
				<div className="mt-5">
					<p>Pedido Nro {orderNumber}</p>
					<p>Fecha: {GetCurrentDate()}</p>
				</div>

				<form className="mt-5 2xl:w-[1100px] " >
					<Card
						classNames={{
							base: "flex flex-wrap gap-x-2.5 gap-y-4 rounded-md",
						}}>
						<CardBody className="bg-slate-300 flex-wrap flex-row gap-x-2.5 gap-y-4">
							{customerFormData.map(
								({ label, type, size, variant, value, onChange }) => (
									<Input
										className="grow w-auto"
										label={label}
										type={type ?? "text"}
										size={size ?? "sm"}
										variant={variant ?? "faded"}
										value={
											label === "Razón Social" ? businessName :
											label === "E-mail" ? email :
											label === "CUIT" ? cuit :
											label === "Contacto" ? contact :
											label === "Telefono" ? phoneNumber :
											label === "Domicilio" ? direction :
											label === "Código Postal" ? postalCode :
											label === "Localidad - Provincia" ? townProvince : ""
										}
										onChange={(e) => handleInputChange(label, e.target.value)}
									/>
								)
							)}
						</CardBody>
					</Card>
				</form>

				<hr className="my-4" />

				<form id="product-form" className="2xl:w-[1100px]" >
					<Card
						classNames={{
							base: "flex flex-wrap gap-x-2.5 gap-y-4 rounded-md overflow-visible",
						}}>
						<CardBody className="bg-gray-200 flex-wrap flex-row gap-x-2.5 gap-y-4 overflow-visible">
							<InputAutocomplete
								inputComponent={
									<Input className="grow w-auto" label="Código Producto"	type="number"	size="sm"	variant="faded"	onChange={getProductsCode}	value={productCode}	onValueChange={setProductCode}/>
								}
								possibilitiesList={productsCodePossibilities}
								setInputValue={setProductCode}
								setPossibilitesList={setProductsCodePossibilities}
								getProductById={getProductById}
							/>

							<InputAutocomplete
								inputComponent={
									<Input className="grow w-auto"	label="Producto"	type="text"	size="sm"	variant="faded"	onChange={getProductName}	value={product}	onValueChange={setProduct}/>
								}
								possibilitiesList={productPossibilities}
								setInputValue={setProduct}
								setPossibilitesList={setProductPossibilities}
								setProductCode={setProductCode}
								getProductById={getProductById}
							/>

							{attributeGroups.length >= 1
								? attributeGroups.map((attributeGroup) => attributeGroup.input)
								: null}

							<Input className="grow w-auto" label="Combinación"	type="text"size="sm" variant="faded" value={combination} readOnly/>
							
							<Input className="grow w-auto"	label="Cantidad" type="number" size="sm" variant="faded" value={quantity} onChange={(e) => setQuantity(e.target.value)} />

						</CardBody>
					</Card>

					<Button
						className="my-4 w-full bg-indigo-500 hover:bg-indigo-700"
						color="primary"
						onClick={addProduct}
						>
						Agregar
					</Button>
				</form>

			</div>

			<div className='overflow-auto max-h-[300px] 2xl:mt-52  ml-6'>
				<TableList
					columns={OrderTableColumns}
					productsToOrder={productsToOrder}
					style={{marginTop:"200px", overflow: "auto"}}
				/>
			</div>

		

			<footer>
				<Card
					isBlurred
					className="fixed bottom-0 bg-default-100/10 flex left-0 w-full justify-end rounded-none z-[99]">
					<CardBody className="flex-row gap-2">
						<Button className="w-full bg-red-500 hover:bg-red-800" color="primary" onClick={() => resetFormNow()}>Reiniciar pedido
						</Button>
						<Button
							onClick={createOrder}
							className="w-full bg-slate-300 text-black hover:bg-slate-500"
							color="primary">
							Crear pedido
						</Button>
					</CardBody>
				</Card>
			</footer>
		</div>
	);
}
