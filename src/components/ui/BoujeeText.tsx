import styles from "./BoujeeText.module.scss";

export function BoujeeText(props: { children: React.ReactNode }) {
	const { children } = props;
	return <span className={styles.base}>{children}</span>;
}
