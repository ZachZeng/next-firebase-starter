import "../styles/globals.css";
import { AuthUserProvider } from "../context/AuthUserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Theme from "../styles/theme";

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
    }
 
    body, html {
        font-family: ${(props) => props.theme.fonts.main};
        height: 100%;
        background-color: ${(props) => props.theme.colors.light1};
    }
 
`;

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyles />
			<AuthUserProvider>
				<Component {...pageProps} />
			</AuthUserProvider>
		</ThemeProvider>
	);
}

export default MyApp;
