"use client";

import { useRef } from "react";
import Link from "next/link";
import { useEventListener } from "usehooks-ts";

import { RadixIconsExternalLink } from "../icons";

import styles from "./Project.module.scss";

function Display(props: {
	href: string;
	img: string;
	name: string;
	subtitle: string;
	tags?: string[];
}) {
	return (
		<div className={styles.display}>
			<a data-external href={props.href}>
				<RadixIconsExternalLink />
			</a>
			<img data-img src={props.img} alt={""} />
		</div>
	);
}

function ProjectLink(props: {
	href: string;
	name: string;
	subtitle: string;
	tags?: string[];
}) {
	const refElement = useRef<HTMLAnchorElement>(null);

	useEventListener(
		"mousemove",
		(e) => {
			const element = refElement.current;
			if (!element) return;
			const rect = element.getBoundingClientRect();
			const range = 0.2;
			let x = (e.x - rect.left) / rect.width;
			x = ((x * 2 - 1) * range + 0.5) * 100;
			refElement.current.style.setProperty("--x", `${x}%`);
		},
		refElement,
	);

	return (
		<Link ref={refElement} href={props.href} className={styles.link}>
			<div data-text>
				<span data-name>{props.name}</span>
			</div>
			<div style={{ flex: "1" }} />
			<span data-subtitle>{props.subtitle}</span>
		</Link>
	);
}

const Project = {
	Link: ProjectLink,
	Display,
};

export default Project;
