import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import PageContent from "./page_content";

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};


export default function RootLayout({ children }) { 
	return (
		<html lang="en" className="white">
			<body className={inter.className}>
				<Providers> 
				   <PageContent children={children}/>
				</Providers>
			</body>
		</html>
	);
}
