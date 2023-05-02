

import Link from 'next/link'
import PressCenterItems from '@/Components/PressCenterItems'
import Head from 'next/head'

export const metadata = {
  title: 'სიახლეები',
  opengraph:{
  },
  icons: 
    {icon: '/public/images/logo.png'}
  ,
  
}
export default async function NewsPage() {
  return (
    <>
    
    <PressCenterItems id='1'/>
    </>
  )
  }