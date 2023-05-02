
import { motion } from 'framer-motion'
import { Inter } from 'next/font/google'
import getNews from '@/lib/getNews'
import Link from 'next/link'
import MainSlider from '@/Components/MainSlider'
import seeMore from '../public/images/Group 51.png'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default async function Home() {

  const language = 1;
  const Neews = getNews()
  const moreNews = await Neews;
  //console.log('this is moreNews', moreNews)

  const newsList = Object.entries(moreNews.სიახლეები).reverse().map((news, i) => {
    if (i < 6) {


      return <div className="landing-items-container-infos" id={i} key={i}>
        <Link href={`/NEWS/${news[1].geo.rec_id}`}>
          <div className='new-image-wrapper'>
            <img src={'https://khulo.gov.ge/' + news[1].geo.img} alt="" />
          </div>
          <div>
            <span className='time'>

              {language == 1 ? news[1].geo.date : ""}
              {language == 2 ? news[1].eng.date : ""}
              {language == 3 ? news[1].eng.date : ""}

            </span>
            <span className='header'>

              {language == 1 ? news[1].geo.title : ""}
              {language == 2 ? news[1].eng.title : ""}
              {language == 3 ? news[1].eng.title : ""}

            </span>
            <span className='vrclad'>{language == 1 ? " ვრცლად" : ""}
              {language == 2 ? " See more" : ""}
              {language == 3 ? " увидеть все" : ""}</span>
          </div>
        </Link>
      </div>

    }
  }
  )


  return (
    <div className='landing' 
   >
    
      <MainSlider />
      <div className="landing-items margin-280px">
        <div className="landing-items-info"><Link href='/NEWS'>
          <span>


            {language == 1 ? " სიახლეები" : ""}
            {language == 2 ? " News" : ""}
            {language == 3 ? " Новости" : ""}
          </span>
        </Link> </div>
        <div className="landing-items-info"><Link href='/ganckhadebebi'>
          <span>
            {language == 1 ? " განცხადებები" : ""}
            {language == 2 ? " statements" : ""}
            {language == 3 ? " заявления" : ""}

          </span>
        </Link></div>
        <div className="landing-items-info"><Link href='/biujeti'>
          <span>
            {language == 1 ? " ბიუჯეტი" : ""}
            {language == 2 ? " Budget" : ""}
            {language == 3 ? " бюджет" : ""}

          </span>
        </Link> </div>
        <div className="landing-items-info"><Link href='/anonsebi'>
          <span>
            {language == 1 ? "  ანონსები" : ""}
            {language == 2 ? " Announcement" : ""}
            {language == 3 ? " Объявление" : ""}


          </span>
        </Link></div>
        <div className="landing-items-info"><Link href='/meris-angarishi'>
          <span>
            {language == 1 ? "  ანგარიშები" : ""}
            {language == 2 ? " accounts" : ""}
            {language == 3 ? " учетные записи" : ""}


          </span>
        </Link></div>
      </div>
      <div className="landing-items-container margin-280px">
        <div className="landing-items-header">
          <span> {language == 1 ? " სიახლეები" : ""}
            {language == 2 ? " News" : ""}
            {language == 3 ? " Новости" : ""}</span>
          <div className="seeAll">
            <img src={seeMore} alt="" />
            <span><Link href='/NEWS'> {language == 1 ? " ყველას ნახვა" : ""}
              {language == 2 ? " See all" : ""}
              {language == 3 ? " увидеть все" : ""}</Link></span>
          </div>
        </div>
        <div className='landing-container'>
          {newsList}
        </div>
        <div className="about">
          <span><Link href='/NEWS'>{language == 1 ? " სიახლეების გვერდი" : ""}
            {language == 2 ? " News page" : ""}
            {language == 3 ? " страница новостей" : ""}</Link></span>
        </div>
      </div>

    </div>
  )
}
