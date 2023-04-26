'use client'
import React from 'react'
import { useEffect, useState, useLocation, useContext, createContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import {motion} from 'framer-motion'

//import { useMatch } from 'react-router-dom'
import Link from 'next/link'
import { FaSearch } from 'react-icons/fa'
import { FaFacebookF } from 'react-icons/fa'
import { FaYoutube } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaAngleDown } from 'react-icons/fa'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation';


function HeaderApi() {
   const router = useRouter();
   
   const [path, setPath] = useState(usePathname())
   //console.log('path ', path)
  
  const [wraper, setWraper] = useState(false)
  const handlewraper = (e) => {
    e.stopPropogation()
    setWraper((prev) => !prev)
  }
  const ref = useRef()
  const handleBurgerButton = () => {

    ref.current.checked = false
  };


  
  /*
    const { search } = useContext(SearchContext)
    const { setSearch } = useContext(SearchContext)
    const { language } = useContext(SearchContext)
    const { setLanguage } = useContext(SearchContext)
  */
  const [search, setSearch] = useState('')
  const [language, setLanguage] = useState(1)


  const [menu, setMenu] = useState({})
  const [loaded, setLoaded] = useState(false)
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


      setLoaded(true)
  }, [])

  //  console.log(menu)
  // es mnishvnelovania friad  console.log('object entries', Object.entries(menu))
  const [width, setWidth] = useState(1920)
  useEffect(()=>{

    if (typeof window !== "undefined") {
    
    
      window.addEventListener('load', function () {
        setWidth(window.innerWidth)
        
    
      })    
   }
   
  })
  useEffect(()=>{
    
    setPath(window.location.pathname)



  },)
 
 


  // const homeMatch = useMatch("/");

  const [small, setSmall] = useState(true);
  
  useEffect(() => {
   
    const scrollHandler = () => {
      if (width < 500) {
        setSmall(window.scrollY < 40);

      }
      if (width < 700) {
        setSmall(window.scrollY < 50);

      } else {
        setSmall(window.scrollY < 100);
      }

    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", scrollHandler, { passive: true });
    };
  }, []);



  /* DROPDOWN language */
  const data = [{ id: 1, link: 'geo', label: "GE" }, { id: 2, link: 'eng', label: "ENG" }];


  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(1);

  const toggleDropdown = () => setOpen(!isOpen);

  const handleItemClick = (id) => {

    setLanguage(id)
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
    toggleDropdown();
    setLanguage(id)


  }


  //console.log(path)
  return (
    <>
      <nav className={[
        "padding-280px",
        path == '/' && small ? "transparent" : "colorful"
      ].join(" ")}
      >
        <div className="topNav">
          <div className="topNav-items">
            <div className="topNav-socials">
              <a href='https://www.facebook.com/KhuloCityHall' target='blank'>
                <FaFacebookF />
              </a>
              <a href='https://www.instagram.com/khulocityhall/' target='blank'>
                <FaInstagram />
              </a>
              <a href='https://www.youtube.com/channel/UCCP3nGfRLDohB8GWsDmM8mA' target='blank' className='youtube'>
                <FaYoutube />
              </a>
            </div>
          </div>
          <div className="topNav-items">
            <Link href='/'>
              
              <Image src={require('../public/images/logo.png')} alt='logo' height={95} width={455}/>
              
            </Link>
          </div>
          <div className="topNav-items">
            <div className='topNav-last'>
              <div className='hover'>
                <input type="text" placeholder='ძიება' style={{
                  borderBottom: search ? "1px solid white" : "",
                  color: search ? "white" : ""
                }}
                  onChange={(e) => setSearch(e.target.value)} />
                <FaSearch style={{ color: search ? "#00A859" : "" }} />
              </div>
              <div className="search">
                <div className='dropdown'>
                  <div className='dropdown-header' onClick={toggleDropdown}>
                    {selectedItem ? items.find(item => item.id == selectedItem).label : "GE"}
                    <FaAngleDown />
                  </div>
                  <div className={`dropdown-body ${isOpen && 'open'}`}>
                    {items.map(item => (
                      <React.Fragment key={item.id}>
                        {selectedItem == item.id ? '' : <div className="dropdown-item" onClick={e => handleItemClick(e.target.id)} id={item.id}>

                          {item.label}
                        </div>}

                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <div className="bottomNav">
          <div className="hotline">
            <span>
              {language == 1 && 'ცხელი ხაზი'}
              {language == 2 && 'Hotline'}
              {language == 3 && 'горячая линия'}
              <span>sfg</span>      551 00 52 72</span>
          </div>

          {Object.entries(menu).length ? Object.entries(menu).map((item, index) => {

            // console.log(item[1])
            if (item[1].parent_id == 1 && item[1].name_geo != 'სამართლებრივი აქტები' && item[1].name_geo != 'საკრებულოს აპარატი' && item[1].name_geo != 'საკრებულოს სხდომის ოქმები' && item[1].name_geo != 'საჯარო ინფორმაცია') {
              //  console.log('entries item', item[1].name_eng , item[1].parent_id)

              return <div className="dropdown" key={item[1].name_geo + item[1].href}>
                <div className="hoverButtons">
                  <button className='dropbtn'>
                    {language == 1 && item[1].name_geo}
                    {language == 2 && item[1].name_eng}
                    {language == 3 && item[1].name_ru}

                    <FaAngleDown />
                  </button>
                  <div className={`dropdown-content ${index == 14 ? 'flex-reverse' : ''}`}>
                    {Object.entries(menu).map(qveItem => {

                      if (item[1].cat_id == qveItem[1].parent_id && qveItem[1].level == 2) {
                        // console.log(qveItem)
                        return <Link href={`/${qveItem[1].slug}`} className='aqtebi' key={qveItem[1].name_geo}

                        >

                          {language == 1 && qveItem[1].name_geo}
                          {language == 2 && qveItem[1].name_eng}
                          {language == 3 && qveItem[1].name_ru}
                          <div className='aqtebi-a'>
                            {Object.entries(menu).map(qveqveItem => {

                              if (qveqveItem[1].level == 3 && qveqveItem[1].parent_id == qveItem[1].cat_id) {
                                return <Link href={`${qveqveItem[1].slug}`} key={qveqveItem[1].name_geo}>
                                  {language == 1 && qveqveItem[1].name_geo}
                                  {language == 2 && qveqveItem[1].name_eng}
                                  {language == 3 && qveqveItem[1].name_ru}
                                </Link>

                              }
                            })}
                          </div>
                        </Link>

                      }
                    })}
                  </div>
                </div>
              </div>
            }

          }) : 'LOADING...'}


          <div className="bottomNav-contact" >
            <span>
              <Link href='/contact'>
                {language == 1 && ' კონტაქტი'}
                {language == 2 && 'Contact'}
                {language == 3 && 'контакт'}
              </Link>
            </span>
          </div>
        </div>






        <div className="wrapperr" style={wraper ? { height: '667px' } : { height: '50px' }} >
          <nav>
            <input type="checkbox" id="menu" name="menu" className="m-menu__checkbox" ref={ref} />
            <label className="m-menu__toggle" htmlFor="menu" onClick={() => setWraper((prev) => !prev)}>
              <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="arcs" ><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18" ></line></svg>
            </label>
            <label className="m-menu__overlay" htmlFor="menu" ></label>

            <div className="m-menu">
              <div className="m-menu__header">
                <label className="m-menu__toggle" htmlFor="menu" onClick={() => setWraper((prev) => !prev)}>
                  <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="arcs">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </label>
                <span>MENU</span>
              </div>
              {Object.entries(menu).length ? Object.entries(menu).map((item, index) => {

                if (item[1].parent_id == 1 && item[1].name_geo != 'სამართლებრივი აქტები' && item[1].name_geo != 'საკრებულოს აპარატი' && item[1].name_geo != 'საკრებულოს სხდომის ოქმები' && item[1].name_geo != 'საჯარო ინფორმაცია') {
                  return <ul key={item[1].name_geo + item[1].href}>
                    <li>
                      <label className="a-label__chevron" htmlFor={`item-${index + 1}`}>
                        {language == 1 && item[1].name_geo}
                        {language == 2 && item[1].name_eng}
                        {language == 3 && item[1].name_ru}
                      </label>
                      <input type="checkbox" id={`item-${index + 1}`} name={`item-${index + 1}`} className="m-menu__checkbox" />
                      <div className="m-menu">
                        <div className="m-menu__header">
                          <label className="m-menu__toggle" htmlFor={`item-${index + 1}`}>
                            <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="butt" strokeLinejoin="arcs">
                              <path d="M19 12H6M12 5l-7 7 7 7" />
                            </svg>
                          </label>

                          <span>
                            {language == 1 && item[1].name_geo}
                            {language == 2 && item[1].name_eng}
                            {language == 3 && item[1].name_ru}
                          </span>
                        </div>
                        <ul>
                          {Object.entries(menu).length ? Object.entries(menu).map(qveItem => {


                            if (item[1].cat_id == qveItem[1].parent_id && qveItem[1].level == 2) {

                              return <li key={qveItem[1].name_geo}>
                                <label htmlFor="">
                                  <Link href={`/${qveItem[1].slug}`} onClick={() => [handleBurgerButton, handlewraper]}>

                                    {language == 1 && qveItem[1].name_geo}
                                    {language == 2 && qveItem[1].name_eng}
                                    {language == 3 && qveItem[1].name_ru}

                                  </Link>
                                </label>
                              </li>
                            }
                          }) : "loading"}
                        </ul>
                      </div>
                    </li>
                  </ul>
                }
              }) : "LOADING"}

            </div>
          </nav>
        </div>


      </nav>
      <div className="header-wrapper" style={{ display: `${(typeof window !== undefined && loaded  && window.location.pathname === '/') ? 'none' : 'block'}` }}></div>
    </>
  )
}

export default HeaderApi