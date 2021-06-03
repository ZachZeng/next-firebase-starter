import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthUserContext";
import Link from "next/link";

import { Form, FormInput, FormGroup, Alert, Button } from "shards-react";

import styled from "styled-components";

const SignupWrapper = styled.div`
	width: 70vw;
	margin: 10rem auto;
`;

const FormWrapper = styled.div`
	width: 30rem;
	margin-top: 3rem;
`;

const Register = () => {
	const router = useRouter();
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passConf, setPassConf] = useState("");
	const [notification, setNotification] = useState("");
	const [notifyVisible, setNotifyVisible] = useState(false);

	const { createUserWithEmailAndPassword } = useAuth();

	const handleLogin = (e) => {
		e.preventDefault();
		if (password !== passConf) {
			setNotification(
				"Password and password confirmation does not match"
			);
			setNotifyVisible(true);
			return null;
		}

		createUserWithEmailAndPassword(userName, password)
			.then((authUser) => {
				console.log("Success. The user is created in Firebase");
				router.push("/");
			})
			.catch((error) => {
				// An error occurred. Set error message to be displayed to user
				setNotification(error.message);
				setNotifyVisible(true);
			});
	};
	return (
		<SignupWrapper>
			<h1>Create new user</h1>

			<FormWrapper>
				<Form onSubmit={handleLogin}>
					<Alert
						theme="danger"
						dismissible={() => setNotifyVisible(false)}
						open={notifyVisible}
					>
						{notification}
					</Alert>
					<FormGroup>
						<label htmlFor="#username">Email</label>
						<FormInput
							type="text"
							placeholder="username"
							value={userName}
							onChange={({ target }) => setUsername(target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<label htmlFor="#password">Password</label>
						<FormInput
							type="password"
							placeholder="username"
							value={password}
							onChange={({ target }) => setPassword(target.value)}
						/>
					</FormGroup>
					<FormGroup>
						<label htmlFor="#passwordconf">Password</label>
						<FormInput
							type="password"
							placeholder="password confirmation"
							value={passConf}
							onChange={({ target }) => setPassConf(target.value)}
						/>
					</FormGroup>
					<Button type="submit" style={{ marginTop: "1rem" }}>
						Signup
					</Button>
					<div style={{ marginTop: "1rem" }}>
						Already have an account?{" "}
						<Link href="/users/login">Login</Link>
					</div>
				</Form>
			</FormWrapper>
		</SignupWrapper>
	);
};
export default Register;
