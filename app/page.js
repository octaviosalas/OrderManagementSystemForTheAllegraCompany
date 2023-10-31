"use client"

import React, { useEffect, useState } from 'react'
import produccion from "./images/produccion.jpg"
import calendario from "./images/calendario.jpg"
import Link from 'next/link';
import Loading from './pedidos/components/Loading';



const MainProduction = () => {


  return (

    <div className='flex justify-center items-center mt-12 md:mt-22'>
      <div className=''>
                <div className='flex justify-center'>
                    <img src={"/allegra-store-logo.png"} className='w-24 h-24'/>
                </div>

                <div className='flex justify-center mt-6'>
                    <div className='text-center'>
                      <h2 className='font-bold text-lg'>Bienvenido!</h2>
                      <h3 className='font-bold text-lg'>Selecciona el area al que deseas Ingresar!</h3>
                    </div> 
                </div>

        <div className='flex flex-col sm:flex-row items-center gap-4 justify-center mt-24 '>
             <Link href="/pedidos"> 
                <div className='bg-gray-200 w-40 h-40 grid place-content-center rounded-sm text-black font-bold text-2xl text-center cursor-pointer'> 
                    <small className='text-lg font-bold'>Pedidos</small>
                      <div className='flex justify-center items-center'>
                            <img src={calendario.src} className='flex mt-4 justify-center items-center h-6 w-6'/>
                      </div>                 
                </div> 
              </Link>

              <Link href="/produccion"> 
                    <div className="bg-gray-200 w-40 h-40 grid place-content-center rounded-sm text-black font-bold text-2xl text-center cursor-pointer">
                           <small className='text-lg font-bold'>Gestion de Produccion</small>
                        <div className='flex justify-center items-center'>
                          <img src={produccion.src} className='flex mt-4 justify-center items-center  h-6 w-6'/>
                        </div>
                   </div>
              </Link>

          </div>
      </div> 
    </div>
   
  )
}

export default MainProduction

  