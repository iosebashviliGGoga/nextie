
import HeaderApi from '@/Components/HeaderApi'
import './globals.css'
import Footer from '@/Components/Footer'
import { AnimatePresence } from 'framer-motion'

export const metadata = {
  title: 'Khulo',
  description: 'Generated by Goga',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
       
      <HeaderApi/>
      {children}
      <Footer/>
      
      </body>
    </html>
  )
}
