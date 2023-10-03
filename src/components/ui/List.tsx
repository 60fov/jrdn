import styles from "./List.module.scss";

export default function List(props: {
	direction?: "row" | "col";
	className?: string;
	children: React.ReactNode;
}) {
	const { children } = props;
	return (
		<div className={styles.base} data-direction={props.direction || "col"}>
			{children}
		</div>
	);
}