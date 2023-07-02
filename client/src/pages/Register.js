import {
	Paper,
	createStyles,
	TextInput,
	Button,
	Title,
	Text,
	Anchor,
	rem,
	Select,
} from "@mantine/core";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordCompenent } from "../components/Password/PasswordComponent";

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

export function Register(props) {
	const { classes } = useStyles();
	const usernameRef = useRef();
	const useremailRef = useRef();
	const passwordRef = useRef();
	const [gender, setGender] = useState("Male");
	const [year, setYear] = useState("Secondary School");
	const [isLoading,setIsLoading] = useState(false)
	const navigate = useNavigate();

	const onRegister = () => {
		setIsLoading(true)
		// alert("in reg");
		// alert(useremailRef.current.value);
		// validating
		console.log(passwordRef);
		const username = usernameRef.current.value;
		const useremail = useremailRef.current.value;
		const password = passwordRef.current.value;
		// const gender = genderRef;

		const requirements = [
			{ re: /[0-9]/, label: "Includes number" },
			{ re: /[a-z]/, label: "Includes lowercase letter" },
			{ re: /[A-Z]/, label: "Includes uppercase letter" },
			{
				re: /[$&+,:;=?@#|'<>.^*()%!-]/,
				label: "Includes special symbol",
			},
		];

		if (password.length < 6) {
			alert("Please make sure you include atleast 6 characters");
			return;
		}

		if (requirements[0].re.test(password) == false) {
			alert("Should include number");
			return;
		}

		if (requirements[1].re.test(password) == false) {
			alert("Should include lowercase letter");
			return;
		}

		if (requirements[2].re.test(password) == false) {
			alert("Should include uppercase letter");
			return;
		}

		if (requirements[3].re.test(password) == false) {
			alert("Should include special character");
			return;
		}

		if (password.length === 0) {
			alert("Enter a valid Full Name");
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

		props.onRegister({
			username,
			useremail,
			password,
			gender,
			year,
			fun : () => setIsLoading(false)
		});
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
						Welcome to Student Group Website!
					</Title>
					<TextInput
						label="Full Name"
						placeholder="FirstName LastName"
						size="md"
						ref={usernameRef}
						// value="R"
						required
					/>
					<TextInput
						label="Email address"
						placeholder="hello@gmail.com"
						size="md"
						mt="md"
						// value="hello@gmail.com"
						ref={useremailRef}
						required
					/>
					<PasswordCompenent customRef={passwordRef} />
					<Select
						label="Choose your Gender"
						data={[
							{ value: "Male", label: "Male" },
							{ value: "Female", label: "Female" },
							{ value: "Other", label: "Other" },
						]}
						required
						value={gender}
						mt="md"
						onChange={setGender}
					/>

					<>
						<Select
							label="Choose your current study"
							data={[
								{
									value: "Secondary School",
									label: "Secondary School",
								},
								{
									value: "Intermediate",
									label: "Intermediate",
								},
								{ value: "Degree", label: "Degree" },
								{
									value: "Degree Passed Out",
									label: "Degree Passed Out",
								},
							]}
							required
							value={year}
							mt="md"
							onChange={setYear}
						/>
					</>

					<Button fullWidth mt="xl" size="md" loading={isLoading} onClick={onRegister}>
						Register
					</Button>

					<Text ta="center" mt="md">
						Have an account?{" "}
						<Anchor
							href="#"
							weight={700}
							onClick={() => navigate("/login")}>
							Sign in
						</Anchor>
					</Text>
				</Paper>
			</div>
		</>
	);
}
