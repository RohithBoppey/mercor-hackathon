import { Routes, Route, useNavigate } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import axios from "axios";
import Home from "./pages/Homepage/Home";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./pages/UserProfile/UserProfile";

function App() {
	const navigate = useNavigate();
	const dispatcher = useDispatch();

	const loginHandler = async (details) => {
		// console.log(details);
		const { useremail, password } = details;
		let det;

		det = await axios.post("http://localhost:5000/students/login", {
			email: useremail,
			password: password,
		});

		console.log(det.data);
		if (typeof det.data === "string") {
			alert(det.data);
			navigate("/login");
		} else {
			console.log(det.data);
			localStorage.setItem("id", `${det.data._id}`);
			dispatcher({ type: "login", value: det.data });
			// console.log(userDetails);
			navigate("/");
		}

		return true;
	};

	const registerHandler = async (details) => {
		console.log(details);
		const { username, useremail, password, gender, year } = details;

		let det;

		det = await axios.post("http://localhost:5000/students/register", {
			email: useremail,
			password: password,
			fullname: username,
			gender: gender,
			year: year,
		});

		if (typeof det.data === "string") {
			alert(det.data);
			navigate("/login");
		} else {
			console.log(det);
			localStorage.setItem("id", `${det.data._id}`);
			dispatcher({ type: "login", value: det.data });
			navigate("/");
		}
		return true;
	};

	useEffect(() => {
		const checkLocalStorageAndLogin = async () => {
			const id = localStorage.getItem("id");
			if (id !== undefined && id !== null) {
				let det;
				det = await axios.get(
					`http://localhost:5000/students/find/${id}`
				);
				dispatcher({ type: "login", value: det.data[0] });
			}
		};
		checkLocalStorageAndLogin();
	}, []);

	const logoutHandler = () => {
		dispatcher({ type: "logout" });
		localStorage.removeItem("id");
		navigate("/login");
	};

	return (
		<Routes>
			<Route path="/" element={<Home />} exact />
			<Route
				path="/login"
				element={<Login onLogin={loginHandler} />}
				exact
			/>
			<Route
				path="/user-profile"
				element={<UserProfile onLogout={logoutHandler} />}
				exact
			/>
			<Route
				path="/register"
				element={<Register onRegister={registerHandler} />}
				exact
			/>
		</Routes>
	);
}

export default App;
