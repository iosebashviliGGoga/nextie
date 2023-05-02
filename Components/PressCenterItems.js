'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import ReactPaginate from 'react-paginate'
import Image from 'next/image'

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function PressCenterItems(props) {

  const menuId = props.id
  // console.log(menuId)
  const [news, setNews] = useState({})
  const [string, setString] = useState('NEWS')
  const isClient = typeof window !== 'undefined'
  const language = 1;
  const search = '';
  useEffect(() => {

    const link = `https://khulo.gov.ge/api/news.php?lang=geo`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)

        switch (menuId) {
          case '1':
            setNews(data.სიახლეები)
            setString('NEWS')
            break;
          case '2':
            setNews(data.განცხადებები)
            setString('ganckhadebebi')
            break;
          case '3':
            setNews(data.ანონსები)
            setString('anonsebi')
            break;
          case '4':
            setNews(data.პრესრელიზები)
            setString('presrelizebi')
            break;

        }

        // console.log(data.სიახლეები)
        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        //  console.log('object entries news', Object.entries(data.სიახლეები))
        //  console.log(Object.entries(data).length)

      });
    if (menuId == 5) {
      const link = `https://khulo.gov.ge/api/video.php`;
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)

          setNews(data)

          // console.log(data.სიახლეები)
          // console.log(data)
          // console.log('news', news)

          // console.log('object keys menu', Object.keys(menu))
          //  console.log('object entries news', Object.entries(data.სიახლეები))
          //  console.log(Object.entries(data).length)

        });
    }

  }, [])
  const [menu, setMenu] = useState({})
  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/site_menu1.php';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log('data.menu',data.menu)
        setMenu(data.menu)

        //  console.log('menu', menu)


        //  console.log('object entries', Object.entries(menu))



      });



  }, [])
  const [siteName, setSiteName] = useState({})
  const presscenterList = Object.entries(menu).length ? Object.entries(menu).map((item, index) => {

    if (item[1].level == 1 && item[1].name_geo.includes('პრესცენტრი')) {

      return Object.entries(menu).map((qveItem, index) => {
        if (qveItem[1].parent_id == item[1].cat_id) {
          const windoww = isClient && window.location.pathname;
          const result = windoww.split('/').pop();
          const slugg = qveItem[1].slug

          if (result === slugg) {


            (!Object.entries(siteName).length) && setSiteName(qveItem[1])
          }
          return <span key={index} className={result === slugg ? "active" : ""}>
            <Link href={`/${qveItem[1].slug}`}>
              {language == 1 ? qveItem[1].name_geo : ""}
              {language == 2 ? qveItem[1].name_eng : ""}
            </Link>
          </span>
        }
      })
    }
  }) : "LOADING"


  //pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;
  const pageCount = news ? Math.ceil(Object.entries(news).length / usersPerPage) : 1;
  const pageChange = ({ selected }) => {
    setPageNumber(selected)
  }




  const newsList = menuId !== '5' ? (news ? Object.entries(news).length ? Object.entries(news).reverse().filter(news => news[1].geo.title.includes(search)).slice(pagesVisited, pagesVisited + usersPerPage).map((News, i) => {
    // console.log(news)
    return <div className="landing-items-container-infos" id={News.id} key={News.id}>
      <Link href={`${isClient && window.location.pathname}/${News[1].geo.rec_id}`}>
        <div className='new-image-wrapper'>

          <Image src={menuId !== "3" ? 'https://khulo.gov.ge/' + News[1].geo.img : require('../public/images/anonsebinew.png')} alt="" unoptimized width={10} height={10} />
        </div>
        <div>
          <span className='time'>{language == 1 ? News[1].geo.date : ""} {language == 2 ? News[1].eng.date : ""}</span>
          <span className='header'>{language == 1 ? News[1].geo.title : ""}{language == 2 ? News[1].eng.title : ""}</span>
          <span className='vrclad'>{language == 1 ? " ვრცლად" : ""}
            {language == 2 ? " See more" : ""}</span>
        </div>
      </Link>
    </div>

  }) : "loading news" : "ვერ მოიძებნა") : [...Object.entries(news)].reverse().filter(news => news[1].title_geo.includes(search)).slice(pagesVisited, pagesVisited + usersPerPage).map((news, index) => {
    // console.log(news)
    const source = news[1].youtube_link.includes('&') ? news[1].youtube_link.replace('youtube.com/watch?v=', 'youtube.com/embed/').slice(0, (news[1].youtube_link.indexOf('&') - 2)) : news[1].youtube_link.replace('youtube.com/watch?v=', 'youtube.com/embed/')

    return <a href={news[1].youtube_link} target='blank' key={index}> <div className="landing-items-container-infos"  >

      <div className='video-wrapper'>
        <div className='new-image-wrapper'>
          <iframe src={source} controls id='video' title={news[1].title_geo}></iframe>
        </div>

      </div>
      <div>
        <span className='time'>{language == 1 ? news[1].date_geo : ""}{language == 2 ? news[1].date_eng : ""}</span>
        <span className='header'>{language == 1 ? news[1].title_geo : ""}{language == 2 ? news[1].title_eng : ""}</span>
        <span className='vrclad'><Link href={`/news/${news.id}`}>{language == 1 ? " ვრცლად" : ""}
          {language == 2 ? " See more" : ""}</Link></span>
      </div>

    </div>
    </a>

  })


  if (menuId == 3) {
    return (
      <div className="news-container margin-280px">
        <header>
          <span className='big'> {language == 1 ? "პრესცენტრი" : " "}{language == 2 ? "PRESS CENTER" : " "}</span>
          <span>{language == 1 ? "ანონსები" : ""}{language == 2 ? "ANNOUNCEMENTS" : ""}</span>

        </header>
        <div>

          <div className="landing-container anonsebi">

            {newsList}

          </div>
          <div className="presscenter-info">
            {presscenterList}
          </div>
        </div>


        <div className="pagination">
          <div className="left-space"></div>
          <ReactPaginate
            previousLabel={<FaArrowLeft />}
            nextLabel={<FaArrowRight />}
            pageCount={pageCount}
            onPageChange={pageChange}
            containerClassName={"paginationButtons"}
            previousLinkClassName={"previusButton"}
            nextLinkClassName={"nextButton"}
            disabledClassName={"disabledButton"}
            activeClassName={"activeButton"}
            onClick={isClient && window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
      </div>
    )
  }
  return (
    <div className="news-container margin-280px">
      <header>
        <span className='big'> {language == 1 ? " პრესცენტრი" : ""}
          {language == 2 ? " PRESS CENTER" : ""}</span>

        <span>{language == 1 ? siteName.name_geo : siteName.name_eng}
        </span>

      </header>
      <div>

        <div className={menuId == '5' ? `landing-container videos` : 'landing-container'}>

          {newsList}

        </div>
        <div className="presscenter-info">
          {presscenterList}
        </div>
      </div>


      <div className="pagination">
        <div className="left-space"></div>
        <ReactPaginate
          previousLabel={<FaArrowLeft />}
          nextLabel={<FaArrowRight />}
          pageCount={pageCount}
          onPageChange={pageChange}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"previusButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"disabledButton"}
          activeClassName={"activeButton"}
          onClick={isClient && window.scrollTo({ top: 0, behavior: 'smooth' })}
        />
      </div>
    </div>
  )
}

export default PressCenterItems