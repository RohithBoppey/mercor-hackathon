import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";
import {
	Button,
	Container,
	Select,
	Text,
	Textarea,
	createStyles,
} from "@mantine/core";
import { IconHash } from "@tabler/icons-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
	// const mocktags = [
	// 	"Jee",
	// 	"Medical",
	// 	"Computer Science",
	// 	"NEET",
	// 	"Self Help",
	// ];

	const titleRef = useRef();
	const descRef = useRef();
	
	const navigate = useNavigate();

	const { classes, theme } = useStyles();

	const [tag, setTag] = useState("");
	const [allTagNames, setAllTagNames] = useState([]);
	const [allTags, setAllTags] = useState([]);

	const userDetails = useSelector((state) => state.userDetails);

	useEffect(() => {
		const getAllTags = async () => {
			const response = await axios.get(
				"http://localhost:5000/genres/all"
			);
			// console.log(response);
			const names = [];
			for (let i of response.data) {
				names.push(i.name);
			}
			setAllTags(response.data);
			setAllTagNames(names);
		};
		getAllTags();
	}, []);

	const submitHandler = async () => {
		const title = titleRef.current.value;
		const desc = descRef.current.value;

		if (title.length === 0) {
			alert("Enter a valid title");
			return;
		}

		if (desc.length === 0) {
			alert("Enter a valid description");
			return;
		}

		if (tag == null || tag.length === 0) {
			alert("Select a valid tag");
			return;
		}

		let index = allTagNames.findIndex(function (name) {
			return name === tag;
		});

		// console.log(index);

		const details = {
			title: title,
			description: desc,
			genre: allTags[index]._id,
			created_by: userDetails._id
		};

		console.log(details);

		// sending to backend

		await axios.post(
			"http://localhost:5000/groups/new-group",
			details
		);
		
		alert(`New Group added in ${tag} genre, check it out!`)

		navigate('/groups')
	};

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
					data={allTagNames}
					onChange={setTag}
					searchable
					allowDeselect
					icon={<IconHash size="1rem" />}
					placeholder="Pick one tag which suits the best"
					label="Choose a tag"
					classNames={classes}
					required
				/>
				<Button mt={30} mb={30} onClick={submitHandler}>
					Add a new group
				</Button>
				{/* <Loader /> */}
			</Container>
		</div>
	);
};

export default NewGroup;
