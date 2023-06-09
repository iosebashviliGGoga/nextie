import getNews from '@/lib/getNews'
import Link from 'next/link'

import { FaFacebookF, FaTwitter } from 'react-icons/fa'


export async function generateMetadata(id) {
  const newsId = id.params.id;
  const Neews = await getNews();
  const News = await Neews;
  //console.log(News.სიახლეები[newsId])

  return {
    title: News.განცხადებები[newsId].geo.title,
    type: 'website',
    openGraph: {
      images: [`https://khulo.gov.ge/${News.განცხადებები[newsId].geo.img}`],
      title: News.განცხადებები[newsId].geo.title,
      url:  `http://test.georgianart.ge/presscenter/NEWS/${News.სიახლეები[newsId].geo.rec_id}`
    },

  };
}
export default async function page(id) {

  const newsId = id.params.id;
  const language = 1;
  const Neews = getNews()
  const News = await Neews;
  const currentLocation = `http://test.georgianart.ge/presscenter/ganckhadebebi/${newsId}`
  //console.log(News)

  const exactNews = News.განცხადებები[newsId]
  //console.log(News.სიახლეები[newsId])

  const newsList = Object.entries(News.განცხადებები).length ? Object.entries(News.განცხადებები).reverse().filter(news => newsId !== news[0]).map((news, i) => {
    if (i <= 1) {
      // console.log('this are news' , news)

      return <Link href={`/presscenter/ganckhadebebi/${news[0]}`} key={news.id}>
        <div className="landing-items-container-infos" id={news.id} key={news.id}>
          <div className='new-image-wrapper'>
            <img src={'https://khulo.gov.ge/' + (news[1].geo.thumb_img ? news[1].geo.thumb_img : news[1].geo.img)} alt="" />
          </div>
          <div>
            <span className='time'>{language == 1 ? news[1].geo.date : ""}{language == 2 ? news[1].eng.date : ""}</span>
            <span className='header'>{language == 1 ? news[1].geo.title : ""}{language == 2 ? news[1].eng.title : ""}</span>
            <span className='vrclad'>
              {language == 1 ? " ვრცლად" : ""}
              {language == 2 ? " See more" : ""}

            </span>
          </div>
        </div></Link>

    }
  }) : "loading "

  return (
    <div className="news1-container margin-280px">
      <header>
        <span className='big'> {language == 1 ? " პრესცენტრი" : ""}
          {language == 2 ? " PRESS CENTER" : ""}</span>
        <span>{language == 1 ? " განცხადებები" : ""}
          {language == 2 ? " ANNOUNCMENTS" : ""}</span>
      </header>
      <div className="main">
        <div>
          <div className="main-picture">
            <img src={'https://khulo.gov.ge/' + (exactNews.geo.thumb_img ? exactNews.geo.thumb_img : exactNews.geo.img)} alt="" />
            <span className='time'>{language == 1 ? exactNews.geo.date : ""}{language == 2 ? exactNews.eng.date : ""}</span>
            <span className='header'>{language == 2 ? exactNews.eng.title : ""}{language == 1 ? exactNews.geo.title : ""}</span>
          </div>
          <div className="main-content">
            {language == 1 ? <span className='main-content-text' dangerouslySetInnerHTML={{ __html: exactNews.geo.text ? exactNews.geo.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads', 'https://www.khulo.gov.ge/uploads') : "" }} ></span> : ""}
            {language == 2 ? <span className='main-content-text' dangerouslySetInnerHTML={{ __html: exactNews.eng.text ? exactNews.eng.text.replaceAll('<img', '<img tabIndex="-1"').replaceAll('../uploads', 'https://www.khulo.gov.ge/uploads') : "" }} ></span> : ""}
            <span>    {language == 1 ? "   გააზიარე:" : ""}
              {language == 2 ? "SHARE:" : ""}
              <a href={`https://www.facebook.com/sharer.php?u=${currentLocation}`} rel="noreferrer" target='_blank'>
                <FaFacebookF />
              </a>
              <a href={`https://twitter.com/intent/tweet?url=${currentLocation}&text=${exactNews.geo.title}`} rel="noreferrer" target='_blank'>
                <FaTwitter />
              </a>

            </span>
          </div>
        </div>
        <div className="moreNews">
          <span> {language == 1 ? "   სხვა განცხადებები:" : ""}
            {language == 2 ? "OTHER ANNOUNCMENTS:" : ""}</span>
          {newsList}
        </div>

      </div>


    </div>
  )
}``