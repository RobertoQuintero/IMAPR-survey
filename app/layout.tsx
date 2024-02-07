
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import './globals.css'
import { Inter } from 'next/font/google';
import { ContextElement } from './context/ContextElement';
import { Navbar } from './components';

const inter = Inter({subsets:['latin']})

export default function RootLayout({children}:{children:React.ReactNode}) {
  
  return (
    <html lang="en">
      <ThemeRegistry >
        <ContextElement>
          <body className={inter.className} >
            <Navbar/>
            <main className='mainStyle'>
              {children}
            </main>
          </body>
        </ContextElement>
      </ThemeRegistry>
    </html>
  );
}
