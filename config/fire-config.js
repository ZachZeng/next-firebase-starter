import firebase from "firebase";
const firebaseConfig = {
	apiKey: "AIzaSyCmWJbSOrcA_nO-_YgFGRlI67puRCZysKI",
	authDomain: "next-8ae50.firebaseapp.com",
	projectId: "next-8ae50",
	storageBucket: "next-8ae50.appspot.com",
	messagingSenderId: "21757124473",
	appId: "1:21757124473:web:e235205e76fb6a3b3259a8",
};
try {
	firebase.initializeApp(firebaseConfig);
} catch (err) {
	if (!/already exists/.test(err.message)) {
		console.error("Firebase initialization error", err.stack);
	}
}
const fire = firebase;
export default fire;
