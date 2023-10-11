

const customerFormData = [
    {
      "label": "Razón Social",
      "extraClassNames": ""
    },
    {
      "label": "CUIT",
     // "value": {cuit},
      "onChange": (e) => { setCuit(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "E-mail",
    //   "value": {email},
      "onChange": (e) => { setEmail(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Localidad - Provincia",
    //   "value": {townProvince},
      "onChange": (e) => { setTownProvince(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Contacto",
     //  "value": {contact},
      "onChange": (e) => { setContact(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Telefono",
    //   "value": {phoneNumber},
      "onChange": (e) => { setPhoneNumber(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Domicilio",
    //   "value": {direction},
      "onChange": (e) => { setDirection(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Código Postal",
     //  "value": postalCode,
      "onChange": (e) => { setPostalCode(e.target.value) },
      "extraClassNames": ""
    }
  ]


  
const OrderTableColumns = [
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
		label: "Atributos ",
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

export { customerFormData, OrderTableColumns };