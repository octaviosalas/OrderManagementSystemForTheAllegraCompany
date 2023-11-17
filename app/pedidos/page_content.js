"use client"

import React, {useEffect, useState} from "react";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { Button } from "@nextui-org/react";

const PageContent = ({ children }) => {
	const pathname = usePathname();

	const [isMenuOpen, setIsMenuOpen] = React.useState(false);

	const [theme, setTheme] = useState("light");

	useEffect(() => {
		const isDarkMode = matchMedia("(prefers-color-scheme: dark)").matches;
		console.log(isDarkMode)
		setTheme(isDarkMode ? "dark" : "light");
	}, []);

	const handleChangeTheme = () => {
		setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
	  };
	
	useEffect(() => {
		document.querySelector("html").classList.remove("dark");
		document.querySelector("html").classList.add(theme);
	}, [theme]);


	return (
		<>
			{pathname === "/"  ||  pathname === "/seccion" ||   pathname === "/produccion"  ||   pathname === "/produccion/productionPedidos" ? null : (
				<>
					{
						<header className="flex bg-gray-100 justify-between px-8 py-4">
							<div>
								<Link href="/">
									<img className="w-20" src="/allegra-store-logo.png" alt="" />
								</Link>
							</div>
							<div>
								<nav className="flex text-center justify-center items-center gap-2 mt-6">
									   <small onClick={handleChangeTheme}>Cambiar Tema</small>
										<Link href="/pedidos">
											<Button color="primary">
												Pedidos
											</Button>
										</Link>

										<Link href="/pedidos/crear-orden">
											<Button color="primary">
												Crear órden
											</Button>
										</Link>
									
								</nav>
							</div>
						</header>
					}
				</>
			)}

			<div className="px-8">{children}</div>
		</>
	);
};

export default PageContent;
