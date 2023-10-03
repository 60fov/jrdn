import { RadixIconsArrowTopRight } from "../icons";
import styles from "./Anchor.module.scss";

export default function Anchor(props: {
	href: string;
	external?: boolean;
	icon?: React.ReactNode;
	children: React.ReactNode;
}) {
	const { children } = props;
	return (
		<a
			href={props.href}
			className={styles.base}
			target={props.external ? "_blank" : "_self"}
		>
			{props.icon}
			{children}
			{props.external && <RadixIconsArrowTopRight data-external-icon />}
		</a>
	);
}

interface AnchorPreviewContextInterface {
	href: string;
	setHref: (href: string) => void;
}

Anchor.Preview = function () {
	return <div />;
};
