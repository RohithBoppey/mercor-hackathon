import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar/Navbar";

import axios from "axios";

const AllGroups = () => {
	const [allGroups, setAllGroups] = useState([]);

	useEffect(() => {
		const getAllGroups = async () => {
			const details = await axios.get("http://localhost:5000/groups/");
			console.log(details);
			setAllGroups(details.data);
		};
		getAllGroups();

	}, []);

	return (
		<div>
			<Navbar />
			
		</div>
	);
};

export default AllGroups;
