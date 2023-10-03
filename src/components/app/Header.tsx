import Link from "next/link";

import { routes } from "@/data";

import styles from "./Header.module.scss";

export default function Header() {
	return (
		<header className="flex justify-between items-baseline">
			<h1 className="">Jrdn</h1>
			<Navigation />
		</header>
	);
}

function Navigation() {
	return (
		<nav className="flex gap-8">
			{routes.map((route, i) => {
				return (
					<Link key={String(i)} className={styles.navlink} href={route}>
						{route.slice(1)}
					</Link>
				);
			})}
		</nav>
	);
}
