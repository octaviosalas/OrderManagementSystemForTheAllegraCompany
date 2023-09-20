"use client";
import React, { useRef } from 'react';
import dotenv from "dotenv"

dotenv.config()


import {
	Button,
	Card,
	CardBody,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
	Input,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	getKeyValue,
} from "@nextui-org/react";
import Hashids from "hashids";
import { useState, useEffect } from "react";
import InputAutocomplete from "./inputAutocomplete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InputSelect from "./inputSelect";
import TableList from "./components/TableList";
import GetCurrentDate from "./helpers/GetCurrentDate";
import { OrderTableColumns, customerFormData } from "../config/Orders";
import GenerateUid from "./helpers/GenerateUid";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// const product_order_fields = [
// 	{
// 		label: "Código Producto",
// 		id: "codigo_producto",
// 		classes: fields_classes,
// 	},
// ];

// console.log(product_order_fields);

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
	const [quantity, setQuantity] = useState(0);
	const [combination, setCombination] = useState("");
	const [combinationPrice, setCombinationPrice] = useState(0);

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

	
     //FUNCION QUE AGREGA EL PRODUCTO
	const addProduct = (e) => {
		console.log("me ejecuto");
		console.log(productsToOrder);
		e.preventDefault();

		console.log(productCode);
		console.log(product);
		console.log(combination)
		console.log(estAttribute)
		console.log(quantity);

		let productKey = GenerateUid();
		// const stringAttributes = formattedAttributes.map((attribute) => {});
		setProductsToOrder([
			...productsToOrder,
			{
				key: productKey,
				productCode: productCode,
				product: product,
				attributes: `${medAttribute}-${colorAttribute}-${estAttribute}`,
				attributesObj: formattedAttributes,
				quantity: quantity,
				// price: price
				delete: (
					<Button
						color="danger"
						data-item_key={productKey}
						onClick={removeProductItem}>
						Eliminar
					</Button>
				),
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

		// post order to backend
		console.log(order);
		console.log("post to backedn");

		
	};

	const getProductsCode = (e) => {
		let memProductCode = e.target.value;
		// setProductCode(memProductCode)

		if (memProductCode.length <= 0) {
			setProductsCodePossibilities([]);
			return;
		}

		clearTimeout(productCodeTimeout);

		productCodeTimeout = setTimeout(async () => { //PRIMER INPUT CODIGORPODUCTO
			console.log("obtenemos datos");
			// https://allegrastore.com.ar/api/combinations?output_format=JSON&display=full&limit=20&filter[id]=%[3535]%

			let result = await fetch(
				`${endpoint_url}/products?${json_format}&${language}&display=[id,name]&limit=15&filter[id]=%[${memProductCode}]%`,
				{ headers: defaultHeaders }
			);

			
			result.json().then((data) => {
				console.log(data);

				// levantas el nombre del producto

				let formattedData = [];
				data.products.map(({ id, name }) => {
					formattedData.push({
						key: id,
						label: id
					});
				});

				setProductsCodePossibilities(formattedData);
				console.log(productsCodePossibilities)
			});

		
		}, 800);
	};

	const getProductName = (e) => {
		let memProductName = e.target.value;
		console.log(memProductName)

		setProduct(memProductName);

		clearTimeout(productCodeTimeout);

		if (memProductName.length > 3) {
			productCodeTimeout = setTimeout(async () => {
				console.log("obtenemos datos");
				

				let result = await fetch(
					`${endpoint_url}/products?${json_format}&${language}&display=full&limit=15&filter[name]=%[${memProductName}]%`,
					{ headers: defaultHeaders }
				);

				result.json().then((data) => {
					let formattedData = [];
					let combinationsIds = [];
					data.products.map(({ id, name, associations }) => {
						console.log(name)
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

	const getProductById = async (id) => {
		const attributeGroupsArray = [];
		console.log("me ejecuto getProductById");

		let result = await fetch(
			`${endpoint_url}/products?${json_format}&${language}&display=full&filter[id]=%[${id}]%`,
			{ headers: defaultHeaders }
		);

		let data = await result.json();

		let optionValuesStr = data.products[0].associations.product_option_values
			.map((item) => item?.id)
			.join("|");

		console.log(optionValuesStr);

		let optionValuesResult = await fetch(
			`${endpoint_url}/product_option_values?${json_format}&${language}&display=full&filter[id]=[${optionValuesStr}]`,
			{ headers: defaultHeaders }
		);

		let attributesData = await optionValuesResult.json();

		console.log(attributesData);

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

		// const attributesGroupedByAttributeGroup =

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
			
		}, 500);
	};

	// const setCombionationAttributes = (attributes) => {

	// }
	const combinationAttributes = [];
	const setCombinationAttribute = (attribute) => {
		console.log('triggered');
		let updateExistingAttribute = false;
		if (combinationAttributes.length > 0) {
			combinationAttributes.forEach((combinationAttribute) => {
				console.log("entramos");

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
		// setCombinationAttributes([...combinationAttributes, attribute]);

		console.log(combinationAttributes.length, attributeGroups.length);
		if (combinationAttributes.length >= 2) {
			getCombination(combinationAttributes);
		}
	};

	const getCombination = async (attributes) => {
		console.log("attributes from get combination");
		console.log(attributes);
		setFormattedAttributes([...formattedAttributes, attributes]);

		const optionsValuesToSearch = productCombinationsIds.join("|");

		let combinationsResult = await fetch(
			`${endpoint_url}/combinations?${json_format}&${language}&display=full&filter[id]=[${optionsValuesToSearch}]`,
			{ headers: defaultHeaders }
		);

		// @TODO -> Sacar el combination ID a partir de los atributos que tenemos

		// const combinationAttributes = [];
		// attributes.forEach(({ attribute }) => {
		// 	console.log("attribute");
		// 	console.log(attribute);
		// });

		console.log("formattedAttributes");
		console.log(formattedAttributes);

		const combinationsData = await combinationsResult.json();

		console.log('combinationsData');
		console.log(combinationsData);

		combinationsData.combinations.map((combination) => {
			const combinationHasAllAttributes =
				combination.associations.product_option_values.every(({ id }) => {
					return attributes.includes(id);
				});

			console.log('combinationHasAllAttributes');
			console.log(combinationHasAllAttributes);

			// console.log("combination");
			// console.log(combination);
			if (combinationHasAllAttributes) {
				console.log('combination with all attributes');
				console.log(combination);
				setCombinationPrice(combination.price);
				const combinationName = `${combination.reference}`;

				setCombination(combinationName);
			}

			console.log("no combination found");
		});

		setCombination("No se encontró combinación");
	};

	
	
	const resetFormNow = () => { 
		setBusinessName("")
		setEmail("")
		setCuit("")
		setContact("")
		setPhoneNumber("")
		setDirection("")
		setPostalCode("")
		setTownProvince("")
	}



	return (
		<>
			<div className="mt-5">
				<p>Pedido Nro {orderNumber}</p>
				<p>Fecha: {GetCurrentDate()}</p>
			</div>
			<form className="mt-5" >
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
									value={value}
									onChange={onChange}
								/>
							)
						)}
					</CardBody>
				</Card>
			</form>




			<hr className="my-4" />
			<form id="product-form" className="" >
				<Card
					classNames={{
						base: "flex flex-wrap gap-x-2.5 gap-y-4 rounded-md overflow-visible",
					}}>
					<CardBody className="bg-gray-200 flex-wrap flex-row gap-x-2.5 gap-y-4 overflow-visible">
						<InputAutocomplete
							inputComponent={
								<Input
									className="grow w-auto"
									label="Código Producto"
									type="number"
									size="sm"
									variant="faded"
									onChange={getProductsCode}
									value={productCode}
									onValueChange={setProductCode}
								/>
							}
							possibilitiesList={productsCodePossibilities}
							setInputValue={setProductCode}
							setPossibilitesList={setProductsCodePossibilities}
							getProductById={getProductById}
						/>

						<InputAutocomplete
							inputComponent={
								<Input
									className="grow w-auto"
									label="Producto"
									type="text"
									size="sm"
									variant="faded"
									onChange={getProductName}
									value={product}
									onValueChange={setProduct}
								/>
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

						<Input
							className="grow w-auto"
							label="Combinación"
							type="text"
							size="sm"
							variant="faded"
							// onChange={(e) => setCombination(e.target.value)}
							// onValueChange={setCombination}
							value={combination}
							readOnly
						/>
						<Input
							className="grow w-auto"
							label="Atributo - Est"
							type="text"
							size="sm"
							variant="faded"
							value={estAttribute}
							onChange={(e) => setEstAttribute(e.target.value)}
						/>
						<Input
							className="grow w-auto"
							label="Cantidad"
							type="number"
							size="sm"
							variant="faded"
							onChange={(e) => setQuantity(e.target.value)}
						/>
					</CardBody>
				</Card>

				<Button
					className="my-4 w-full bg-indigo-500"
					color="primary"
					onClick={addProduct}
					type="submit">
					Agregar
				</Button>
			</form>

			<TableList
				columns={OrderTableColumns}
				productsToOrder={productsToOrder}
			/>

			<footer>
				<Card
					isBlurred
					className="fixed bottom-0 bg-default-100/10 flex left-0 w-full justify-end rounded-none z-60">
					<CardBody className="flex-row gap-2">
						<Button className="w-full bg-red-500" color="primary" onClick={() => resetFormNow()}>
							Reiniciar pedido
						</Button>
						<Button
							onClick={createOrder}
							className="w-full bg-slate-300 text-black"
							color="primary">
							Crear pedido
						</Button>
					</CardBody>
				</Card>
			</footer>
		</>
	);
}
