import {
	Container,
	SimpleGrid,
	Text,
	UnstyledButton,
	createStyles,
	rem,
} from "@mantine/core";
import {
	IconCalendarTime,
	IconQuestionMark,
	IconReceipt,
	IconTimeline,
} from "@tabler/icons-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

const useStyles = createStyles((theme) => ({
	card: {
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.colors.dark[6]
				: theme.colors.gray[0],
	},

	title: {
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontWeight: 700,
		fontSize: 45,
	},

	item: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		borderRadius: theme.radius.md,
		height: rem(180),
		backgroundColor:
			theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
		transition: "box-shadow 150ms ease, transform 100ms ease",

		"&:hover": {
			boxShadow: theme.shadows.md,
			transform: "scale(1.05)",
		},
	},
}));

const mockdata = [
	{
		title: "JEE",
		icon: IconQuestionMark,
		color: "red",
		link: "/groups/jee",
	},
	{
		title: "Computer Science",
		icon: IconCalendarTime,
		color: "teal",
		link: "/groups/cse",
	},
	{
		title: "Medical",
		icon: IconTimeline,
		color: "pink",
		link: "/groups/medical",
	},
];

const Groups = () => {
	const { classes, theme } = useStyles();
	const navigate = useNavigate();

	const items = mockdata.map((item) => (
		<UnstyledButton
			key={item.title}
			className={`${classes.item} ${classes.card}`}
			onClick={() => navigate(`${item.link}`)}>
			<item.icon color={theme.colors[item.color][6]} size="3.5rem" />
			<Text size={20} mt={7}>
				{item.title}
			</Text>
		</UnstyledButton>
	));

	return (
		<div>
            <Navbar />
			<Container size="70%" align="center" mt={80} mb={100}>
				<Text className={classes.title}>Famous Groups</Text>
                <Text pt={20}>Choose your groups based on famous tags</Text>
				<SimpleGrid cols={3} mt="md" pb={20} pt={20}>
					{items}
				</SimpleGrid>
                <Text>You can always start a new group <Link to = {`/groups/new`}>here</Link>!</Text>
			</Container>
		</div>
	);
};

export default Groups;
