

import Link from 'next/link'
import PressCenterItems from '@/Components/PressCenterItems'


export const metadata = {
  title: 'სიახლეები'
}
export default async function NewsPage() {
  return (
    <>
    <PressCenterItems id='1'/>
    </>
  )
  }