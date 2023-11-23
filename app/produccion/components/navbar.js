"use client"
import React, {useEffect, useState} from "react";
import Link from 'next/link';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const isDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
    console.log(isDarkMode)
    setTheme(isDarkMode ? "dark" : "light");
  }, []);
  
  useEffect(() => {
    document.querySelector("html").classList.remove("dark");
    document.querySelector("html").classList.add(theme);
  }, [theme]);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const handleChangeTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  

  return (
   <div className='fixed inset-x-0 top-0 bg-gray-300 dark:bg-black text-white h-16 w-full'> {/*75px*/}
        <div className="w-full flex items-center justify-between  red-600 h-12 mt-2">
            <div className="flex ml-6 items-center"> 
               <div className="dropdown ">
                    <label tabIndex={1} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black dark:text-white">
                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                    </label>
                    <ul tabIndex={1} className="bg-gray-200 menu menu-sm dropdown-content mt-3 z-[1] p-2  rounded-box w-52">
                        <li><a onClick={handleChangeTheme} >Dark Mode</a></li>
                        <li><a>.............</a></li>
                        <li><a>.............</a></li>
                    </ul>
                </div>
                <img src="/allegra-store-logo.png" className="h-11 w-11 ml-6 dark:text-white "/>
                 <div className="hidden lg:block">
                    <div className="flex ml-4 items-center gap-6 lg:gap-9 xl:gap-16 ">
                        <p className="text-black cursor-pointer hover:underline dark:text-white">Tienda Mayorista</p>
                        <Link href="/produccion">  <p className="text-black cursor-pointer hover:underline dark:text-white ">Pedidos</p> </Link>
                        <Link href="/produccion/users"> <p className="text-black cursor-pointer hover:underline dark:text-white">Usuarios</p>  </Link> 
                        <Link href="/produccion/cargarPedido"> <p className="text-black cursor-pointer hover:underline dark:text-white">Cargar Pedidos</p> </Link> 
                        <p className="text-black cursor-pointer hover:underline dark:text-white">Talleres de Confeccion</p>
                    </div>
                  
                 </div>
            </div>
            <div className="flex items-center gap-2 lg:gap-4 xl:gap-6 mr-0 lg:mr-2">
                 <p className="font-bold text-black text-md dark:text-white">Franco Jara</p>
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-9 h-9 text-black dark:text-white">
                  <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>

            </div>
        </div>
   </div> 
    
  );
}
