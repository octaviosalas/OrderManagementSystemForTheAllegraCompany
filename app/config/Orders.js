const customerFormData = [
    {
      "label": "Razón Social",
      "onChange": (e) => { setBusinessName(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "CUIT",
      "onChange": (e) => { setCuit(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "E-mail",
      "onChange": (e) => { setEmail(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Localidad - Provincia",
      "onChange": (e) => { setTownProvince(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Contacto",
      "onChange": (e) => { setContact(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Telefono",
      "onChange": (e) => { setPhoneNumber(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Domicilio",
      "onChange": (e) => { setDirection(e.target.value) },
      "extraClassNames": ""
    },
    {
      "label": "Código Postal",
      "onChange": (e) => { setPostalCode(e.target.value) },
      "extraClassNames": ""
    }
  ]
  

export { customerFormData };