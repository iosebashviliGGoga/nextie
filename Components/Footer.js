'use client'
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'

import { FaAngleRight } from 'react-icons/fa'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import logo from '../public/images/logo.png'
import Image from 'next/image'


function Footer() {
    const language = 1;
    const goToTop = () => {
  
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  
  
    const [subscribe, setSubscribe] = useState('')
  
    const [menu, setMenu] = useState({})
  
    useEffect(() => {
      const link = 'https://khulo.gov.ge/api/site_menu1.php';
      fetch(link)
        .then((response) => response.json())
        .then((data) => {
  
  
          setMenu(data.menu)
  
          //  console.log('menu', menu)
  
  
          //  console.log('object entries', Object.entries(menu))
          // Object.entries(menu).map(item =>{
  
          //   if(item[1].level == 1)
          //   console.log('entries item', item[1].name_eng , item[1].level)
          // })
  
        });
  
  
  
    }, [])
  
    function handleClick(e) {
      console.log(subscribe)
  
      fetch('http://------------:8080/', {  // Enter your IP address here
  
        method: 'POST',
        mode: 'cors',
        ContentType: 'application/json',
  
        body: subscribe // body data type must match "Content-Type" header
  
      }
        .then((response) => console.log(response))
  
      )
  
  
    }
  
  
    return (
      <div className='footer'>
  
        <div className="topFooter padding-280px">
  
          <div className="">
            <Link href='/meria-samartlebrivi-aqtebi'>
             
              <Image src={require('../public/images/meriaSamarlebriviaqtebi.png')} alt="" />
            </Link>
          </div>
  
          <div className="">
            <Link href='/sajaro-Informacia'>
             
              <Image src={require('../public/images/Group 272.png')} alt="" />
            </Link>
          </div>
          <div className="">
           
            <Image src={require('../public/images/Group 271.png')} alt="" />
          </div>
  
          <div className="">
            <Link href='/writeMessage'>
              
              <Image src={require('../public/images/Group 270.png')} alt="" />
            </Link>
          </div>
        </div>
        <div className="bottomFooter ">
          <div className="footer-gmail margin-280px">
            <div className="">
              <span>
                {language == 1 && 'მიიღე ყველა სიახლე ელ.ფოსტის საშუალებით'}
                {language == 2 && 'Get all the news via Email'}
                {language == 3 && 'Получайте все новости по электронной почте'}
              </span>
            </div>
  
            <div className="">
              <form action="">
                <input type="text" name="" id="" placeholder={`${language == 1 ? 'ელ.ფოსტა' : ""}${language == 2 ? 'Email' : ""}${language == 3 ? 'Эл. адрес' : ""}`} onChange={e => setSubscribe(e.target.value)} />
              </form>
  
            </div>
            <div className="">
              <button style={{ cursor: "pointer" }} onClick={(e) => handleClick(e)} type='submit' >
                {language == 1 && ' გამოწერა'}
                {language == 2 && 'Subscribe'}
                {language == 3 && 'подписываться'}
  
              </button>
            </div>
  
          </div>
          <div className="footer-nav padding-280px">
            {Object.entries(menu).length && Object.entries(menu).map((item) => {
              if (item[1].parent_id == 1 && item[1].name_geo != 'სამართლებრივი აქტები' && item[1].name_geo != 'საკრებულოს აპარატი' && item[1].name_geo != 'საკრებულოს სხდომის ოქმები' && item[1].name_geo != 'საჯარო ინფორმაცია') {
                return <div className="" key={item[1].name_geo}>
                  <span>
                    {language == 1 && item[1].name_geo}
                    {language == 2 && item[1].name_eng}
                    {language == 3 && item[1].name_ru}
  
  
                  </span>
                  {Object.entries(menu).map((qveItem) => {
                    if (item[1].cat_id == qveItem[1].parent_id && qveItem[1].level == 2) {
                      return <span key={qveItem[1].slug}><Link href={`/${qveItem[1].slug}`}>
                        <FaAngleRight />
  
                        {language == 1 && qveItem[1].name_geo}
                        {language == 2 && qveItem[1].name_eng}
                        {language == 3 && qveItem[1].name_ru}
  
                      </Link></span>
                    }
                  })}
                </div>
              }
            })}
  
          </div>
          <div className="credits padding-280px">
            <div className="">
             
              <Image src={logo} alt="" />
            </div>
            <div className="">
              <span>
                &copy; {language == 1 && `ყველა უფლება დაცულია 2022`}
                {language == 2 && 'All rights reserved'}
                {language == 3 && 'все права защищены'}
  
              </span>
            </div>
            <div className="">
              <span>Created by <a href='https://proservice.ge/' target='blank'> ProService</a> </span>
            </div>
  
          </div>
          <div className="goToTop" onClick={goToTop}>
            <FaArrowAltCircleUp />
          </div>
        </div>
  
  
      </div>
    )
  }
  
  export default Footer