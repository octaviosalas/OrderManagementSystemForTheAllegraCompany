"use client";

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
import { customerFormData } from "../config/Orders";
import GenerateUid from "./helpers/GenerateUid";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const columns = [
	{
		key: "productCode",
		label: "Cod Prod",
	},
	{
		key: "product",
		label: "Producto",
	},
	{
		key: "attributes",
		label: "Atributos (Med-Color-Est)",
	},
	{
		key: "quantity",
		label: "Cantidad",
	},
	{
		key: "price",
		label: "Precio",
	},
	{
		key: "delete",
		label: "Eliminar",
	},
];

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

	const [businessName, setBusinessName] = useState("");
	const [cuit, setCuit] = useState("");
	const [email, setEmail] = useState("");
	const [townProvince, setTownProvince] = useState("");
	const [contact, setContact] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(0);
	const [direction, setDirection] = useState("");
	const [postalCode, setPostalCode] = useState("");

	const [productsToOrder, setProductsToOrder] = useState([]);

	const [orderNumber, setOrderNumber] = useState("0001");

	const [formattedAttributes, setFormattedAttributes] = useState([]);
	const [attributeGroups, setAttributeGroups] = useState([]);
	const [attribute, setAttribute] = useState([]);
	const [productCombinationsIds, setProductCombinationsIds] = useState([]);

	const addProduct = (e) => {
		console.log("me ejecuto");
		console.log(productsToOrder);
		e.preventDefault();

		console.log(productCode);
		console.log(product);
		// console.log(attributes);
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

		// let response = await fetch(`${process.env.API_URL}/api/create-order`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify(order),
		// });

		// console.log(response);
		// setOrderNumber(response.data.order.id);
	};

	const getProductsCode = (e) => {
		let memProductCode = e.target.value;
		// setProductCode(memProductCode)

		if (memProductCode.length <= 0) {
			setProductsCodePossibilities([]);
			return;
		}

		clearTimeout(productCodeTimeout);

		productCodeTimeout = setTimeout(async () => {
			console.log("obtenemos datos");
			// https://allegrastore.com.ar/api/combinations?output_format=JSON&display=full&limit=20&filter[id]=%[3535]%

			let result = await fetch(
				`${endpoint_url}/products?${json_format}&${language}&display=[id]&limit=15&filter[id]=%[${memProductCode}]%`,
				{ headers: defaultHeaders }
			);

			result.json().then((data) => {
				let formattedData = [];
				data.products.map(({ id }) => {
					formattedData.push({
						key: id,
						label: id,
					});
				});

				setProductsCodePossibilities(formattedData);
			});

			// setProductsCodePossibilities();
		}, 800);
	};

	const getProductName = (e) => {
		let memProductName = e.target.value;

		setProduct(memProductName);

		clearTimeout(productCodeTimeout);

		if (memProductName.length > 3) {
			productCodeTimeout = setTimeout(async () => {
				console.log("obtenemos datos");
				// https://allegrastore.com.ar/api/combinations?output_format=JSON&display=full&limit=20&filter[id]=%[3535]%

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

		const attributes = [];
		attributesData.product_option_values.forEach((attribute) => {
			attributes.push({
				key: attribute.id,
				// [attribute.id_attribute_group]: {
				// 	label: attribute.name,
				// },
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
								values={formattedAttributes}
								getCombination={getCombination}
							/>
						),
					});
				})
			);
		});

		setTimeout(() => {
			setAttributeGroups(attributeGroupsArray);
			// setAttributeGroups(attributeGroupsArray);
		}, 500);
	};

	const getCombination = async (attributes) => {
		console.log(attributes);
		setFormattedAttributes([...formattedAttributes, attributes]);

		const optionsValuesToSearch = productCombinationsIds.join("|");

		let combinationsResult = await fetch(
			`${endpoint_url}/combinations?${json_format}&${language}&display=full&filter[id]=[${optionsValuesToSearch}]`,
			{ headers: defaultHeaders }
		);

		const combinationAttributes = [];
		// attributes.forEach(({ attribute }) => {
		// 	console.log("attribute");
		// 	console.log(attribute);
		// });

		console.log("formattedAttributes");
		console.log(formattedAttributes);

		const combinationsData = await combinationsResult.json();

		console.log(combinationsData);

		combinationsData.combinations.map((combination) => {
			const combinationHasAllAttributes =
				combination.associations.product_option_values.every(({ id }) => {
					return combinationAttributes.includes(id);
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

		setCombination("No se encontró combinación");
	};

	return (
		<>
			<div className="mt-5">
				<p>Pedido Nro {orderNumber}</p>
				<p>Fecha: {GetCurrentDate()}</p>
			</div>
			<form className="mt-5">
				<Card
					classNames={{
						base: "flex flex-wrap gap-x-2.5 gap-y-4 rounded-md",
					}}>
					<CardBody className="bg-slate-300 flex-wrap flex-row gap-x-2.5 gap-y-4">
						{customerFormData.map(({label, type, size, variant, onChange}) => (
							<Input
								className="grow w-auto"
								label={label}
								type={type ?? "text"}
								size={size ?? "sm"}
								variant={variant ?? "faded"}
								onChange={onChange}
							/>
						))}
					</CardBody>
				</Card>
			</form>
			<hr className="my-4" />
			<form id="product-form" className="">
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

			<TableList columns={columns} productsToOrder={productsToOrder} />

			<footer>
				<Card
					isBlurred
					className="fixed bottom-0 bg-default-100/10 flex left-0 w-full justify-end rounded-none z-60">
					<CardBody className="flex-row gap-2">
						<Button className="w-full bg-red-500" color="primary">
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
