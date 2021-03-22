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

    const stikyMenu = () => {
        window.addEventListener('scroll', () => {
            if (window.screen.availWidth > 992) {
                const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
                const element = document.querySelector('.header__menu')

                window.addEventListener('scroll', () => {
                    if (scrollTop >= 100) {
                        element.classList.add('stiky')
                    } else {
                        element.classList.remove('stiky')
                    }
                })
            }
        })
    }

    const forms = () => {
        const form = document.querySelector('form'),
              inputs = document.querySelectorAll('input, textarea')

        const message = {
            loading: 'Loading...',
            success: 'Thanks! Your message has been submitted.',
            failure: 'Something went wrong...',
            spinner: 'lds-spinner',
            ok: 'confirm',
            fail: 'reject'
        }

        const ok = document.querySelector(`.${message.ok}`)
        const fail = document.querySelector(`.${message.fail}`)

        const postData = async (url, data) => {
            // document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: 'POST',
                body: data
            })

            return await res.text()
        }

        function clearInputs() {
            inputs.forEach(input => {
                input.value = ''
            })
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            form.parentNode.appendChild(statusMessage)

            let textMessage = document.createElement('div')
            textMessage.textContent = message.loading
            statusMessage.appendChild(textMessage)

            const formData = new FormData(form)
            postData('../server.php', formData)
                .then(() => {
                    ok.classList.add('active')
                    textMessage.textContent = message.success
                    textMessage.style.color = 'green'
                })
                .catch(() => {
                    fail.classList.add('active')
                    textMessage.textContent = message.failure
                    textMessage.style.color = 'red'
                })
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        ok.classList.remove('active')
                        fail.classList.remove('active')
                        statusMessage.remove()
                    }, 5000);
                })
        })
    }

    const popupWindow = () => {
        const modal = document.querySelector('.contact'),
              modalClose = document.querySelector('.contact__close'),
              openPopup = document.querySelector('#reply'),
              popup = document.querySelector('.popup'),
              popupClose = document.querySelector('.popup__close'),
              select = document.querySelector('.popup__select'),
              selectTitle = select.querySelector('.popup__select-title'),
              selectLabels = select.querySelectorAll('.popup__select-label')

        setTimeout(() => {
            modal.classList.add('show')
        }, 3000)

        openPopup.addEventListener('click', () => {
            popup.classList.add('active')
            document.body.style.overflow = 'hidden'
            modal.remove()
        })

        modalClose.addEventListener('click', () => {
            modal.remove()
        })

        popupClose.addEventListener('click', () => {
            document.body.style.overflow = ''
            popup.classList.remove('active')
        })

        selectTitle.addEventListener('click', () => {
            if (select.getAttribute('data-state') === 'active') {
                select.setAttribute('data-state', '')
            } else {
                select.setAttribute('data-state', 'active')
            }
        })

        selectLabels.forEach(label => {
            label.addEventListener('click', (e) => {
                selectTitle.textContent = e.target.textContent
                select.setAttribute('data-state', '')
            })
        })
    }

    const scrollToTop = () => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
            const btn = document.querySelector('.scroll__top')

            if (scrollTop > 2000) {
                btn.classList.add('show')
            } else {
                btn.classList.remove('show')
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault()
                window.scrollTo(0, 0)
            })
        })
    }

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
    stikyMenu()
    forms()
    popupWindow()
    scrollToTop()
})