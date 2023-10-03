"use client";

import Project from "./Project";
import { about, projects } from "@/data";

function Section(props: React.HTMLProps<HTMLDivElement> & { title?: string }) {
	const { title, ...restProps } = props;

	return (
		<div className="flex flex-col gap-4" {...restProps}>
			{props.title && <h1>{`∂ ${props.title}`}</h1>}
			{props.children}
		</div>
	);
}

export function AboutSection() {
	return (
		<Section title="hey" id="jrdn-section-about">
			{about.map((p, i) => {
				return <p key={`${p.slice(0, 10)}${i}`}>{p}</p>;
			})}
		</Section>
	);
}

export function ProjectSection() {
	return (
		<Section title="projects">
			<div className="flex flex-col">
				{projects.map((project) => {
					return <Project.Link key={project.id} {...project} />;
				})}
			</div>
		</Section>
	);
}
