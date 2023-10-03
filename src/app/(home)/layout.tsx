import Footer from "@/components/app/Footer";
import Header from "@/components/app/Header";

export default function HomeLayout(props: { children: React.ReactNode }) {
	return (
		<div className="max-w-xl mx-auto px-8 box-content">
			<div className="py-16">
				<Header />
			</div>
			<main className="flex flex-col gap-16">{props.children}</main>
			<div className="h-16" />
			<div className="py-16">
				<Footer />
			</div>
		</div>
	);
}
