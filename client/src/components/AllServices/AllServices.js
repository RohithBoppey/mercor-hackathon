import {
	createStyles,
	Text,
	SimpleGrid,
	UnstyledButton,
	rem,
	Container,
} from "@mantine/core";
import {
	IconCalendarTime,
	IconTimeline,
	IconReceipt,
	IconQuestionMark,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const mockdata = [
	{
		title: "Ask or browse Questions",
		icon: IconQuestionMark,
		color: "red",
		link: "/questions",
	},
	{
		title: "Show your Time Table",
		icon: IconCalendarTime,
		color: "teal",
		link: "/timetable",
	},
	{
		title: "Recent Announcements",
		icon: IconTimeline,
		color: "pink",
		link: "/announcements",
	},
	{
		title: "Remarks",
		icon: IconReceipt,
		color: "violet",
		link: "/remarks",
	},
];

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

export function AllServices() {
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
		// <Card withBorder radius="md" className={classes.card}>
		<>
			<Container size="70%" align="center" mt={80} mb={100}>
				<Text className={classes.title}>Student Help</Text>
				<SimpleGrid cols={2} mt="md">
					{items}
				</SimpleGrid>
			</Container>
		</>
		// </Card>
	);
}
