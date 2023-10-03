import styles from "./Tag.module.scss";

export default function Tag(props: { className?: string; children: React.ReactNode }) {
	const { children } = props;

	return <p className={styles.base}>{children}</p>;
}
