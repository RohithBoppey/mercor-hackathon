import { Button, Dialog, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar/Navbar";

import "./userprofile.css";

const UserProfile = (props) => {
	// console.log(props)
	const userDetails = useSelector((state) => state.userDetails);
	const userLoggedIn = useSelector((state) => state.userLoggedIn);
	const [opened, { toggle, close }] = useDisclosure(false);

	const navigate = useNavigate();

	useEffect(() => {
		console.log(userDetails);
		if (!userLoggedIn) {
			navigate("/login");
		}
	}, []);

	return (
		<div>
			<Navbar />
			<div class="container-up middle">
				<div class="outer">
					<div
						id="userprofilepage"
						class="profile-nav col-md-14 middle">
						<div class="panel">
							<div class="container-up user-heading round">
								<h1 style={{ fontSize: 28 }}>
									<br />
									Hello {userDetails.fullname}
								</h1>
								<p>
									<b>Your Unique User ID: </b> &nbsp;&nbsp;{" "}
									{userDetails._id}
								</p>
							</div>
						</div>

						<div>
							<h1 style={{ textAlign: "center", fontSize: 50 }}>
								<b>User details</b>
							</h1>
							<div class="row">
								<table
									className="table-m"
									border="1px"
									style={{ margin: "20px" }}>
									<tr>
										<th className="th-m">Email</th>
										<td className="td-m">
											{userDetails.email}
										</td>
									</tr>
									<tr>
										<th className="th-m">Full Name</th>
										<td className="td-m">
											{userDetails.fullname}
										</td>
									</tr>

									{userDetails.position === undefined ? (
										<>
											<tr>
												<th className="th-m">
													Year of Study
												</th>
												<td className="td-m">
													{userDetails.year}
												</td>
											</tr>
											
										</>
									) : (
										<>
											<tr>
												<th className="th-m">
													Position
												</th>
												<td className="td-m">
													{userDetails.position}
												</td>
											</tr>
										</>
									)}
								</table>
								<div style={{ textAlign: "center" }}>
									<br />
									{/* <Button onClick = {() => alert('Currently, updating is only possible')}>Update Profile</Button> */}
									<Button onClick={toggle}>
										Update Profile
									</Button>
									<br />
									<br />
									<Button onClick={props.onLogout}>
										Logout
									</Button>
								</div>
							</div>
							<Dialog
								opened={opened}
								withCloseButton
								onClose={close}
								size="lg"
								position={{ top: 20, right: 20 }}
								radius="md">
								<Text size="sm" weight={500}>
									Sorry, updating your profile currently only
									happens through contacting{" "}
									<i>
										<u>
											<a href="#">
												admin@grietportal.com
											</a>
										</u>
									</i>
								</Text>
							</Dialog>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
