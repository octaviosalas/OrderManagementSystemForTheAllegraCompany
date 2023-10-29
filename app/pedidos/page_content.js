"use client"

import React from "react";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

const PageContent = ({ children }) => {
	const pathname = usePathname();

	return (
		<>
			{pathname === "/"  ||  pathname === "/seccion" ||   pathname === "/produccion" ? null : (
				<>
					{
						<header className="flex bg-gray-100 justify-between px-8 py-4">
							<div>
								<Link href="/">
									<img className="w-20" src="/allegra-store-logo.png" alt="" />
								</Link>
							</div>
							<div>
								<nav className="flex">
										<Link href="/pedidos">
										<button
											className="
											 my-4
											 w-full
											 bg-indigo-500z-0
											 group
											 relative
											 inline-flex
											 items-center
											 justify-center
											 box-border
											 appearance-none
											 select-none
											 whitespace-nowrap
											 font-normal
											 subpixel-antialiased
											 overflow-hidden
											 tap-highlight-transparent
											 outline-none
											 data-[focus-visible=true]:z-10
											 data-[focus-visible=true]:outline-2
											 data-[focus-visible=true]:outline-focus
											 data-[focus-visible=true]:outline-offset-2
											 px-unit-4
											 min-w-unit-20
											 h-unit-10
											 text-small
											 gap-unit-2
											 rounded-medium
											 [&>svg]:max-w-[theme(spacing.unit-8)]
											 data-[pressed=true]:scale-[0.97]
											 transition-transform-colors
											 motion-reduce:transition-none
											 text-primary-foreground
											 bg-indigo-500
											 hover:bg-indigo-700
											 ">
											Pedidos
										</button>
										</Link>

										<Link href="/pedidos/crear-orden">
										<button
											className="
											 ml-2
											 my-4
											 w-full
											 bg-indigo-500z-0
											 group
											 relative
											 inline-flex
											 items-center
											 justify-center
											 box-border
											 appearance-none
											 select-none
											 whitespace-nowrap
											 font-normal
											 subpixel-antialiased
											 overflow-hidden
											 tap-highlight-transparent
											 outline-none
											 data-[focus-visible=true]:z-10
											 data-[focus-visible=true]:outline-2
											 data-[focus-visible=true]:outline-focus
											 data-[focus-visible=true]:outline-offset-2
											 px-unit-4
											 min-w-unit-20
											 h-unit-10
											 text-small
											 gap-unit-2
											 rounded-medium
											 [&>svg]:max-w-[theme(spacing.unit-8)]
											 data-[pressed=true]:scale-[0.97]
											 transition-transform-colors
											 motion-reduce:transition-none
											 text-primary-foreground
											 bg-indigo-500
											 hover:bg-indigo-700
											 ">
											Crear órden
										</button>
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
