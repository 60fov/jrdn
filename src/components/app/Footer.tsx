import Abbr from "../ui/Abbr";
import styles from "./Footer.module.scss";

export default function Footer() {
	return (
		<div className={styles.base}>
			<p data-quote>
				<em>the beauty of magic is not in the illusion alone</em>
			</p>
			<div className="grow" />
			<Abbr
				title="search me"
				tip="i shouldn't have to tell you this, but do what the fuck you want"
			>
				WTFPL
			</Abbr>
		</div>
	);
}
