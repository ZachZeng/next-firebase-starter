import { useState, useEffect } from "react";
import fire from "./fire-config";

const formatAuthUser = (user) => ({
	uid: user.uid,
	email: user.email,
});

export default function useFirebaseAuth() {
	const [authUser, setAuthUser] = useState(null);
	const [loading, setLoading] = useState(true);

	const authStateChanged = async (authState) => {
		if (!authState) {
			setAuthUser(null);
			setLoading(false);
			return;
		}

		setLoading(true);
		var formattedUser = formatAuthUser(authState);
		setAuthUser(formattedUser);
		setLoading(false);
	};

	const clear = () => {
		setAuthUser(null);
		setLoading(true);
	};

	const signInWithEmailAndPassword = (email, password) =>
		fire.auth().signInWithEmailAndPassword(email, password);

	const createUserWithEmailAndPassword = (email, password) =>
		fire.auth().createUserWithEmailAndPassword(email, password);

	const signOut = () => fire.auth().signOut().then(clear);

	// listen for Firebase state change
	useEffect(() => {
		const unsubscribe = fire.auth().onAuthStateChanged(authStateChanged);
		return () => unsubscribe();
	}, []);

	return {
		authUser,
		loading,
		signInWithEmailAndPassword,
		createUserWithEmailAndPassword,
		signOut,
	};
}
