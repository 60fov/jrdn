import styles from "./Abbr.module.scss";

export default function Abbr(props: {
	title?: string;
  tip: React.ReactNode;
	children: React.ReactNode;
}) {
	return (
		<abbr className={styles.base} title={props.title}>
			<p data-text>{props.children}</p>
			<p data-tip>{props.tip}</p>
		</abbr>
	);
}
