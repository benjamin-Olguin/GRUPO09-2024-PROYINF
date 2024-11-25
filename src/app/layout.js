// app/layout.js
import { UserProvider } from './components/UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}