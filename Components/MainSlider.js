'use client'
import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'




import { useRef } from "react";

function MainSlider() {
  
  const [karuseli, setKaruseli] = useState([])

  useEffect(() => {
    const link = 'https://khulo.gov.ge/api/banner_carusel.php';
    fetch(link)
      .then((response) => response.json())
      .then((data) => {

        // console.log(data)
        // setExactNews(data[id])
        data && setKaruseli(data)

        // console.log(data.სიახლეები)
        // console.log(Object.entries(data.სიახლეები))


        // console.log(data)
        // console.log('news', news)

        // console.log('object keys menu', Object.keys(menu))
        // console.log('object entries news', Object.entries(data))


      });
    // console.log('news', news)
    // console.log('news 0', news[0])


  }, [])




  // SLIDER
  const [time, setTime] = useState(1)




  const sliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: time ? 24000 : 4000,
    speed: 1000,
    // adaptiveHeight: true,
    lazyLoad: 'ondemand',
    fade: true,
    Easing: 'cubic-bezier(0.600, -0.280, 0.735, 0.045)',
    useTransform: true,
    pauseOnHover: false,

    dots: true

  }
  const [sliderRef, setSliderRef] = useState(null)


  return (
    <>
      <div className='content'>


        <Slider ref={setSliderRef} {...sliderSettings} afterChange={() => setTime(0)}>

          {<div className="full" style={{ Height: '100%' }}>
            <div className="image-gradient"></div>
            <video autoPlay loop muted playsInline>
              <source src="https://khulo.gov.ge/uploads_script/333473305_208216088535790_1956266680882685671_n.mp4" type="video/mp4" />
            </video>
            <div className="carouselText margin-280px">

              {/*<span className="mainColor">SKI RESORT GODERDZI </span> */}
            </div>
          </div>}
          {/* <div className="">
  
    <iframe width="560" height="315" src="https://www.youtube.com/embed/UcCuD78bvu8?autoplay=1&&mute=1&playlist=UcCuD78bvu8&loop=1&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; mute" allowfullscreen></iframe>
    <div className="carouselText margin-280px">
            <span className="mainColor">SKI RESORT GODERDZI </span>
        </div>
</div> */}


          {karuseli.length ? [...karuseli].reverse().map((item, index) => {


            return <div
              key={item.id}
              id={index}
            >
              <div className="image-gradient"></div>
              <img src={`https://khulo.gov.ge/${item.img}`} alt="photos" className='slider_image' />

              <div className="carouselText margin-280px">

                <span>

                  {language == 1 ? item.title_geo : ""}
                  {language == 2 ? item.title_eng : ""}
                  {language == 3 ? item.title_ru : ""}
                </span>



              </div>
              <button className='margin-280px'> <a href={item.url} target='blank'>{language == 1 ? " ვრცლად" : ""}
                {language == 2 ? " see more" : ""}
                {language == 3 ? " узнать больше" : ""}  </a> </button>






            </div>

          }) : " "}
        </Slider>

      </div>


    </>
  )
}

export default MainSlider