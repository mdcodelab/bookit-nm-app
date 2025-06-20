import { Inter } from 'next/font/google';
import "./globals.css";
import Header from './(components)/Header';
import Footer from './(components)/Footer';
import { AuthProvider } from './userContext';
import ToastProvider from "./(components)/ToastProvider";

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Bookit App | Book a Room',
  description: 'Book a meeting or conference room for your team',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <AuthProvider>
          <ToastProvider />
          <Header />
          <main className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
