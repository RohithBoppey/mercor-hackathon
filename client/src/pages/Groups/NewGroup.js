import React, { useRef, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import {
	Button,
	Center,
	Container,
	Select,
	Text,
	TextInput,
	Textarea,
	createStyles,
	rem,
} from "@mantine/core";
import { IconHash } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 500,
		fontSize: 35,
	},
	root: {
		position: "relative",
	},
}));

const NewGroup = () => {
	const mocktags = ["engineering", "medical", "computer_science"];

	const titleRef = useRef();
	const descRef = useRef();
	const { classes, theme } = useStyles();

	const [tag, setTag] = useState([mocktags]);

	return (
		<div>
			<Navbar />
			<Container align="center" pt={50}>
				<Text className={classes.title} pb={50} underline>
					Add a new group
				</Text>
				<Textarea
					placeholder="Title"
					label="Enter the title of Study group below"
					size="lg"
					w="60%"
					ref={titleRef}
					withAsterisk
				/>
				<Textarea
					pt={10}
					placeholder="Description"
					label="Describe about your Study group below"
					size="lg"
					w="60%"
					ref={descRef}
					withAsterisk
				/>
			</Container>
			<Container size="xs" align="center">
				<Select
					mt="md"
					withinPortal
					data={mocktags}
					onChange={setTag}
					searchable
					allowDeselect
					icon={<IconHash size="1rem" />}
					placeholder="Pick one tag which suits the best"
					label="Choose a tag"
					classNames={classes}
					required
				/>
				<TextInput placeholder="New tag" label="tag" withAsterisk />
				<Button mt={30} mb={30}>
					Add a new group
				</Button>
			</Container>
		</div>
	);
};

export default NewGroup;
