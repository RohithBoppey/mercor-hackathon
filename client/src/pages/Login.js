import {
	Paper,
	createStyles,
	TextInput,
	PasswordInput,
	Checkbox,
	Button,
	Title,
	Text,
	Anchor,
	rem,
} from "@mantine/core";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
	wrapper: {
		backgroundSize: "60%",
		backgroundPosition: "right top",
		backgroundImage:
			"url(https://media0.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif)",
	},

	form: {
		borderRight: `${rem(1)} solid ${
			theme.colorScheme === "dark"
				? theme.colors.dark[7]
				: theme.colors.gray[3]
		}`,
		minHeight: rem(900),
		maxWidth: rem(500),
		paddingTop: rem(80),

		[theme.fn.smallerThan("sm")]: {
			maxWidth: "100%",
		},
	},

	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
	},
}));

export function Login(props) {
	const { classes } = useStyles();
	const useremailRef = useRef();
	const passwordRef = useRef();

	const navigate = useNavigate();

	const onRegister = () => {
		// alert("in reg");
		// alert(useremailRef.current.value);
		// validating
		const useremail = useremailRef.current.value;
		const password = passwordRef.current.value;
		if (useremail.length === 0) {
			alert("Please enter a non-empty email");
			return;
		}
		if (password.length === 0) {
			alert("Please enter a non-empty password");
			return;
		}
		if (!useremail.includes("@")) {
			alert("Enter a valid email");
			return;
		}
		if (!password.length > 8) {
			alert("Enter a password having length > 8");
			return;
		}

		props.onLogin({ useremail, password });
	};

	return (
		<>
			<div className={classes.wrapper}>
				<Paper className={classes.form} radius={0} p={30}>
					<Title
						order={2}
						className={classes.title}
						ta="center"
						mt="md"
						mb={50}>
						Welcome back to Student Forum!
					</Title>

					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						ref={useremailRef}
					/>
					<PasswordInput
						label="Password"
						mt="md"
						ref={passwordRef}
						size="md"
					/>

					<Checkbox label="Keep me logged in" mt="xl" size="md" />
					<Button fullWidth mt="xl" size="md" onClick={onRegister}>
						Login
					</Button>

					<Text ta="center" mt="md">
						Don&apos;t have an account?{" "}
						<Anchor
							href="#"
							weight={700}
							onClick={() => navigate("/register")}>
							Register
						</Anchor>
					</Text>
				</Paper>
			</div>
		</>
	);
}
