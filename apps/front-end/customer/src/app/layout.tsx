// import Footer from './components/footer/Footer';
import { Providers } from '@my-relax-app/shared-ui';
import Navbar from './components/navbar/Navbar';
import './global.css';
import '@my-relax-app/shared-ui'

export const metadata = {
  title: 'Madagascar',
  description: 'Découvrez Madagascar',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body>
        <Providers>
          <Navbar />
          <main className='container py-8'>{children}</main>
          {/* <Footer/> */}
        </Providers>
      </body>
    </html>
  );
}
