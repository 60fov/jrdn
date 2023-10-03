import {
	RadixIconsGithubLogo,
	RadixIconsLinkedinLogo,
	RadixIconsTwitterLogo,
	ReadCVLogo,
} from "@/components/icons";

import Anchor from "@/components/ui/Anchor";
import Spacer from "@/components/ui/Spacer";

import { Bebas_Neue, Inter } from "next/font/google";
import Project from "@/components/app/Project";
import ReactBoy from "@/lib/reactboy/ReactBoy";
import { useReactBoy } from "@/lib/reactboy";
import SimonClassCartridge from "@/cartridges/SimonClass";
import SimonESCartridge from "@/cartridges/SimonES";
import { BoidSimCartridge } from "@/cartridges/Boids";
// import Canvas from "@/components/app/Canvas";
// import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const bebas = Bebas_Neue({ weight: ["400"], subsets: ["latin"] });

export default function Home() {
	// const cartrige = useReactBoy(SimonCartridge);

	return (
		<>
			{/* <Head></Head> */}
			{/* <Canvas className={"absolute"} style={{ color: "var(--accent-1)" }} /> */}
			<div className={"absolute"}>
				<ReactBoy
					displayMode={"page"}
					cartridge={BoidSimCartridge}
				/>
			</div>
			<main className="relative flex flex-col gap-4">
				<div className="absolute right-8 top-8">
					<Socials />
				</div>
				<Section className="h-[100svh]">
					<h1>Jordan Bailey</h1>
					<div className="grow" />
					<Headline>web engineer focusing on the user experience.</Headline>
					<Spacer.Vertical size={16} />
					<p>
						I design for the sake of self-expression.
						<br />
						I care very much about quality, accessible education.
					</p>
				</Section>
				<Section title="projects">
					<List>
						<Project.Link
							href="https://ko-ta.vercel.app/"
							name="KoTA"
							subtitle="a korean typing app"
							tags={["work in progress"]}
						/>
						<Project.Link
							href="https://ko-ta.vercel.app/"
							name="wamei"
							subtitle="a web game interface"
							tags={["work in progress"]}
						/>
					</List>
				</Section>
				<Section title="now">
					<div className="max-w-lg flex flex-col gap-2 items-start">
						<p>
							exploring the in's and out's of the web; looking to learn, teach,
							and build. feel free to contact me about any of the three.
						</p>
						<p>skateboarding.</p>
					</div>
				</Section>
			</main>
		</>
	);
}
function Socials() {
	return (
		<List className="items-end">
			<Anchor href="https://read.cv/water" icon={<ReadCVLogo />} external>
				Read.cv
			</Anchor>
			<Anchor
				href="https://github.com/60fov"
				icon={<RadixIconsGithubLogo />}
				external
			>
				Github
			</Anchor>
			<Anchor
				href="https://twitter.com/personalcontext"
				icon={<RadixIconsTwitterLogo />}
				external
			>
				Twitter
			</Anchor>
			<Anchor
				href="https://www.linkedin.com/in/i-am-jordan-bailey/"
				icon={<RadixIconsLinkedinLogo />}
				external
			>
				LinkedIn
			</Anchor>
		</List>
	);
}

function Headline(props: { children: React.ReactNode }) {
	const { children } = props;
	return (
		<p
			style={{
				fontSize: "clamp(36px, 4vw, 64px)",
				lineHeight: 1.2,
				color: "var(--foreground)",
			}}
		>
			{children}
		</p>
	);
}

function List(props: {
	horizontal?: boolean;
	className?: string;
	children: React.ReactNode;
}) {
	const { children } = props;
	return (
		<div
			className={`flex ${props.horizontal ? "" : "flex-col"} flex-wrap ${
				props.className
			}`}
		>
			{children}
		</div>
	);
}

function Section(props: {
	title?: string;
	className?: string;
	children: React.ReactNode;
}) {
	const { children } = props;

	return (
		<div
			className={`p-8 rounded-3xl max-w-2xl flex flex-col ${props.className}`}
		>
			{props.title && (
				<>
					<h2 className="font-medium">{props.title}</h2>
					<Spacer.Vertical size={16} />
				</>
			)}
			{children}
		</div>
	);
}
