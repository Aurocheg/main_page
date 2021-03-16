window.addEventListener('DOMContentLoaded', () => {
    'use strict'

    AOS.init()

    const burger = (selector, menu) => {
        const burgerMenu = document.querySelector(selector)
        const list = document.querySelector(menu)

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active')
            list.classList.toggle('active')

            if (burgerMenu.classList.contains('active')) {
                document.body.classList.add('lock')
            } else {
                document.body.classList.remove('lock')
            }
        })
    }

    document.addEventListener('scroll', () => {
        if (window.screen.availWidth > 992) {
            const element = document.querySelector('.header__menu')
            const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop);

            if (scrollTop >= 100) {
                element.classList.add('stiky')
            } else {
                element.classList.remove('stiky')
            }
        }
    })

    // const partnersSlider = new Swiper('.partners .swiper-container', {
    //     spaceBetween: 30,
    //     grabCursor: true,
    //     slidesPerView: 6
    // })

    const articleSlider = new Swiper('.article .swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.article__next',
            prevEl: '.article__prev',
        },
        grabCursor: true
    })

    burger('.header__burger', '.header__list')
})