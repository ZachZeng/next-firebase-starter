import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import Link from "next/link";

import { useAuth } from "../../context/AuthUserContext";

import { Form, FormInput, FormGroup, Alert } from "shards-react";

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
		<div>
			<h2>Login</h2>
			<Alert
				theme="danger"
				dismissible={() => setNotifyVisible(false)}
				open={notifyVisible}
			>
				{notify}
			</Alert>

			<Form onSubmit={handleLogin}>
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
				<button type="submit">Login</button>
				No account? <Link href="/users/register">Create one</Link>
			</Form>
		</div>
	);
};
export default Login;
