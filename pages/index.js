import { useState, useEffect } from "react";
import Head from "next/head";
import fire from "../config/fire-config";
import CreatePost from "../components/CreatePost";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

import { Button } from "shards-react";

const Home = () => {
	const [blogs, setBlogs] = useState([]);
	const [notification, setNotification] = useState("");
	const [loggedIn, setLoggedIn] = useState(false);
	const { authUser, loading, signOut } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !authUser) router.push("/users/login");

		fire.firestore()
			.collection("blog")
			.onSnapshot((snap) => {
				const blogs = snap.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setBlogs(blogs);
			});
	}, [authUser, loading]);

	return !loading ? (
		<div>
			<Head>
				<title>Blog App</title>
			</Head>
			<h1>Blog</h1>
			<Button onClick={signOut}>Logout</Button>
			<ul>
				{blogs.map((blog) => (
					<li key={blog.id}>
						<Link href="/blog/[id]" as={"/blog/" + blog.id}>
							<a itemProp="hello">{blog.title}</a>
						</Link>
					</li>
				))}
			</ul>
			<CreatePost />
		</div>
	) : (
		<div>Loading</div>
	);
};
export default Home;
