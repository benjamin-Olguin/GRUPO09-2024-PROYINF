// /pages/_app.js
import { UserProvider } from '../app/components/UserContext';
import '../app/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}

export default MyApp;
