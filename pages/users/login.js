import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../context/AuthUserContext";

import { Form, FormInput, FormGroup, Alert, Button } from "shards-react";

import styled from "styled-components";

const LoginWrapper = styled.div`
	width: 70vw;
	margin: 10rem auto;
`;

const FormWrapper = styled.div`
	width: 30rem;
	margin-top: 3rem;
`;

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [notify, setNotification] = useState("");
	const [notifyVisible, setNotifyVisible] = useState(false);
	const router = useRouter();

	const { signInWithEmailAndPassword } = useAuth();

	const handleLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(username, password)
			.then((authUser) => {
				router.push("/");
			})
			.catch((error) => {
				setNotification(error.message);
				setNotifyVisible(true);
			});
	};

	return (
		<LoginWrapper>
			<h1>Login</h1>
			<FormWrapper>
				<Form onSubmit={handleLogin}>
					<Alert
						theme="danger"
						dismissible={() => setNotifyVisible(false)}
						open={notifyVisible}
						style={{ marginTop: "3rem" }}
					>
						{notify}
					</Alert>
					<FormGroup>
						<label htmlFor="#username">Email</label>
						<FormInput
							type="text"
							placeholder="username"
							value={username}
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
					<Button type="submit" style={{ marginTop: "1rem" }}>
						Login
					</Button>
					<div style={{ marginTop: "1rem" }}>
						No account?{" "}
						<Link href="/users/register">Create one</Link>
					</div>
				</Form>
			</FormWrapper>
		</LoginWrapper>
	);
};
export default Login;
