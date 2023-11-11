'use client'
import {ReactNode} from 'react'
import { CustomMenuLink } from '../components'
import { ProvidersProvider } from '../context/providers/ProvidersProvider'

const links=[
  {href:'/providers',title:'Proveedores'},
  {href:'/providers/survey',title:'Encuesta'},
]

const RootLayout = ({children}:{children:ReactNode}) => {
  return (
    <ProvidersProvider>
      <div className='mainContainer'>
        <aside className='mainMenuLeft'>
        {
              links.map(link=>(
                <CustomMenuLink key={link.href} {...link}/>
              ))
            }
        </aside>
        <div className='mainPage'>
          {children}
        </div>
      </div>
    </ProvidersProvider>
  )
}

export default RootLayout