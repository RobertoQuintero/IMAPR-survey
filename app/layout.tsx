
import { ThemeRegistry } from '@/theme/ThemeRegistry';
import './globals.css'
import { Inter } from 'next/font/google';
import { ContextElement } from './context/ContextElement';
import { Navbar } from './components';



const inter = Inter({subsets:['latin']})
const mainStyle={
  padding:'4rem 1rem 0',
  width:'100%',
  maxWidth:'1100px',
  margin:'0 auto ',
  height:'100vh'
}

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
