import { nanoid } from "nanoid";

type Project = {
	id: string;
	href: string;
	name: string;
	subtitle: string;
};

type Thought = {
	title: string;
	slug: string;
	tags?: string[];
};

type Route = string;

export const routes: Route[] = [
	// "/projects",
	// "/playground"
];

export const about: string[] = [
	"i'm a developer currently working in the web, focusing on the user experience. i really enjoy taking ideas and turning them into reality.",
	"i'm also a strong advocate of quality, accessible education. i believe it's essential to overall societal improvement.",
	"i was previously a hobbyist developer working mostly on game developement and computer graphics. my favorite part of game development is exploring game concepts, design, and of course making a fun experience.",
];

export const projects: Project[] = [
	{
		id: nanoid(),
		href: "https://ko-ta.vercel.app/",
		name: "KoTA",
		subtitle: "a korean typing app",
	},
	{
		id: nanoid(),
		href: "https://github.com/60fov/softsrv",
		name: "softsrv",
		subtitle: "a software renderer",
	},
];

export const thoughts: Thought[] = [];
