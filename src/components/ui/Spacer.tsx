interface SpacerProps {
	size: number;
}

const Spacer = {
	Vertical: (props: SpacerProps) => <div style={{ height: props.size }} />,
	Horizontal: (props: SpacerProps) => (
		<div style={{ width: props.size, height: "100%" }} />
	),
};

export default Spacer;
