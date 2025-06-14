import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import ReservationProvider from "./_components/ReservationContext";
import { Analytics } from "@vercel/analytics/next"



const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: {
		template: "%s",
		default: "Welcome 👲 The Wild Oasis",
  	},

  	description: "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({children}){
	return <html lang="en">
		<body className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`} >
			<Header />
			<div className="flex-1 px-8 py-12">
				<main className="max-w-7xl mx-auto w-full">
					<ReservationProvider>
						{children}
					</ReservationProvider>
				</main>
			</div>
			<footer className="text-center">
				Copyright &copy; {new Date().getFullYear()} by The Wild Oasis team.
			</footer>
			<Analytics />
		</body>
    </html>
}
