"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@nextui-org/react'
import axios from 'axios'


const page = () => {

    const [excelDocument, setExcelDocument] = useState([])

    useEffect(() => { 
      console.log(excelDocument)
    }, [excelDocument])

    const handleUpload = async () => {
      if (excelDocument) {
        const formData = new FormData();
        formData.append("excelFile", excelDocument);
  
        try {
          const response = await axios.post('http://localhost:4000/addOrderWithExcel', formData);
          if (response.status === 200) {
            console.log('Archivo subido exitosamente');
          } else {
            console.error('Error al subir el archivo');
          }
        } catch (error) {
          console.error('Error de red:', error);
        }
      } else {
        console.warn('No se ha seleccionado ningún archivo');
      }
    };

 
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='border items-center flex flex-col h-[745px] w-[1190px] rounded-xl bg-gray-200 mt-6'>
             <div className='flex justify-start text-start items-start mt-12 w-full '>
                <small className='text-lg text-gray-600 font-bold ml-12'>Carga de Pedido</small>
             </div>

             <div className='flex flex-col  justify-center rounded-xl bg-white h-[432px] w-[1056px]  mt-12'>
                <div>
                    <p className='m-2'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque volutpat pellentesque lorem eget feugiat. Nam sed erat ante. Ut leo ante, egestas at ex et, 
                        faucibus hendrerit dolor. Curabitur vehicula, ligula a pulvinar faucibus, dui dui euismod arcu, ac condimentum velit
                    </p>
                </div>
                <div className='flex w-full justify-start items-start mt-6'>      
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="multiple_files">Upload multiple files</label>
                <input className="block w-full text-sm text-white  bg-gray-800 border border-gray-300 rounded-lg cursor-pointer  dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" multiple/>
                </div>
                <div className='flex w-full justify-end items-end mt-16'>
                         <Button color="default" radius="none" className='mr-12 bg-gray-200 w-48' onClick={() => handleUpload()}>Subir</Button>
                </div>
             
             </div>

        </div>
    </div>
  )
}

export default page
