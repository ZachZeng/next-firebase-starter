import { useState } from "react";
import fire from "../../config/fire-config";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthUserContext";
import Link from "next/link";

const Register = () => {
	const router = useRouter();
	const [userName, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [passConf, setPassConf] = useState("");
	const [notification, setNotification] = useState("");

	const { createUserWithEmailAndPassword } = useAuth();

	const handleLogin = (e) => {
		e.preventDefault();
		if (password !== passConf) {
			setNotification(
				"Password and password confirmation does not match"
			);
			setTimeout(() => {
				setNotification("");
			}, 2000);
			setPassword("");
			setPassConf("");
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
			});
	};
	return (
		<div>
			<h1>Create new user</h1>
			{notification}
			<form onSubmit={handleLogin}>
				Email:{" "}
				<input
					type="text"
					value={userName}
					onChange={({ target }) => setUsername(target.value)}
				/>
				<br />
				Password:{" "}
				<input
					type="password"
					value={password}
					onChange={({ target }) => setPassword(target.value)}
				/>
				<br />
				Password conf:{" "}
				<input
					type="password"
					value={passConf}
					onChange={({ target }) => setPassConf(target.value)}
				/>
				<br />
				<button type="submit">Signup</button>
				Already have an account? <Link href="/users/login">Login</Link>
			</form>
		</div>
	);
};
export default Register;
