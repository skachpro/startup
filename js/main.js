window.onload = function (loadEvent) {
    let body = document.body,
        burgerBtn = document.querySelector(".burger-btn"),
        nav = document.querySelector(".header-nav"),
        aboutUsScroll = document.querySelector(".about-us-scroll"),
        scrollBtn = [...document.querySelectorAll(".scroll-btn")],
        elemsWithParallax = [...document.querySelectorAll(".parallax")],
        getStartedBtn = document.querySelector(".bg-trans-btn"),
        servicesItemsBox = document.querySelector(".services-items"),
        servicesItemTitle = [...document.querySelectorAll(".services-item-title")],
        readMoreBtns = [...document.querySelectorAll(".read-more")],
        aboutUsIcons = [...document.querySelectorAll(".about-us-icons")],
        footerFormInputs = [...document.querySelectorAll(".input")],
        formData,
        scrollCardInfo = {
            0: {
                imgPath: "images/khalil.png",
                name: "Md. Khalil Uddin",
                role: "Head of Ideas",
            },
            1: {
                imgPath: "images/rubel.png",
                name: "Rubel Miah",
                role: "Lead WordPress Developer",
            },
            2: {
                imgPath: "images/shamim.png",
                name: "Shamim Mia",
                role: "Sr. Web Developer",
            },
            3: {
                imgPath: "images/john.png",
                name: "John Doe",
                role: "Front-end Developer",
            }
        },
        sliderWidth = parseFloat(getComputedStyle(document.querySelector(".about-us-scroll-box")).width),
        cardPattern = `\n<figure class="scroll-card">
                        <img class="person" src="" alt="">
                        <figcaption class="scroll-card-info">
                            <div class="icons about-us-icons dn">
                                <span class="icon about-us-icons-icon icon-fcb"></span>
                                <span class="icon about-us-icons-icon icon-twt"></span>
                                <span class="icon about-us-icons-icon icon-gp"></span>
                                <span class="icon about-us-icons-icon icon-in"></span>
                            </div>
                            <h3 class="scroll-card-name"></h3>
                            <p class="scroll-card-role"></p>
                        </figcaption>
                    </figure>`,
        close = [...document.querySelectorAll(".close")],
        latestWorksCardsSection = document.querySelector(".latest-works-cards"),
        latestWorksBtns = [...document.querySelectorAll(".latest-works-categories-item")],
        gap,
        sliderCards,
        elementsWithAnimation = [...document.querySelectorAll(".animation")],
        headerNavLinks = [...document.querySelectorAll(".nav-link")]

    localStorage.isLoged = "false"

    if (localStorage.isLoged === undefined || localStorage.isLoged === "false") {
        getStartedBtn.addEventListener("click", () => {
            let arr = [1, 2, 3, 4]
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                    ;[arr[i], arr[j]] = [arr[j], arr[i]]
            }
            console.log(arr)

            let dropZones = [...document.querySelectorAll(".box")]
            dropZones.forEach((zone, i) => {
                let span = document.createElement("span")
                span.classList.add("box-num")
                span.draggable = "true"
                span.dataset.num = arr[i]
                span.textContent = arr[i]

                zone.append(span)
            })

            let answerBtn = document.querySelector(".answer"),
                captcha = document.querySelector(".log-in-pop-up")

            captchaFunc (captcha, dropZones, answerBtn)

            answerBtn.addEventListener("click", () => {
                if (answerBtn.classList.contains("answer-disabled")) return

                let answersArr = [],
                    rightArr = [1, 2, 3, 4],
                    rects = [...document.querySelectorAll(".box-num")],
                    correct = true
                
                
                rects.forEach((rect, i) => {
                    if (+rect.dataset.num !== rightArr[i]) {
                        correct = false
                        return
                    }
                })

                if (correct) {
                    alert("You are the Human")
                    localStorage.setItem("isLoged", "true")
                    captcha.classList.add("dn")
                } else {
                    alert("Incorrect")
                    localStorage.setItem("isLoged", "false")
                }

            })

            function captchaFunc(captcha, dropZones, answerBtn) {
                let rects = [...document.querySelectorAll(".box-num")],
                    movedItem
    
                captcha.classList.remove("dn")
    
                dropZones.forEach(zone => {
                    console.log(zone)
                    zone.addEventListener("dragover", dragOver.bind(null, zone))
    
                    zone.addEventListener("drop", dropAct.bind(null, zone))
                })
    
                rects.forEach(rect => {
                    rect.addEventListener("dragstart", dragStart.bind(null, rect))
                    rect.addEventListener("dragend", dragEnd.bind(null, rect))
                })
    
                function dragStart(rect, dragStartEvent) {
                    console.log(rect)
                    setTimeout(() => {
                        movedItem = dragStartEvent.target
                        movedItem.classList.add("dn")
                    }, 0)
                }
    
                function dragOver(zone, dragOverEvent) {
                    dragOverEvent.preventDefault()
                }
    
                function dropAct(zone, dropEvent) {
                    if (dropEvent.target.parentElement) {
                        movedItem.parentElement.append(dropEvent.target)
                        zone.append(movedItem)
                        if (answerBtn.classList.contains("answer-disabled")) {
                            answerBtn.classList.remove("answer-disabled")
                        }
                    }
                }
    
                function dragEnd(rect, dragEndEvent) {
                    movedItem.classList.remove("dn")
                }
    
            }
        })



    } else {
        getStartedBtn.classList.add("dn")
    }




    let leftArray = []
    for (let i = 0; i < 4; i++) {
        let figure = document.createElement("figure"),
            figcaption = document.createElement("figcaption"),
            img = document.createElement("img"),
            h3 = document.createElement("h3"),
            p = document.createElement("p")

        figure.classList.add("scroll-card", "animation", i % 2 == 0 ? "anim-top" : "anim-bottom")
        figcaption.className = "scroll-card-info"
        img.className = "person"
        img.src = scrollCardInfo[i].imgPath
        h3.className = "scroll-card-name"
        p.className = "scroll-card-role"

        h3.textContent = scrollCardInfo[i].name
        p.textContent = scrollCardInfo[i].role

        figure.append(img)
        figcaption.insertAdjacentHTML(
            "afterbegin",
            `<div class="icons about-us-icons dn">
                <span class="icon about-us-icons-icon icon-fcb"></span>
                <span class="icon about-us-icons-icon icon-twt"></span>
                <span class="icon about-us-icons-icon icon-gp"></span>
                <span class="icon about-us-icons-icon icon-in"></span>
            </div>`
        )

        figcaption.append(h3)
        figcaption.append(p)
        figure.append(figcaption)

        let howMuchCards = Math.floor(sliderWidth / (263 + 20))
        gap = parseInt((howMuchCards > 1) ? (sliderWidth - (howMuchCards * 263)) / (howMuchCards - 1) : sliderWidth)
        let left = (263 + gap) * i

        //console.log(left, gap)
        figure.setAttribute("data-left", left.toFixed())
        figure.style.left = `${left.toFixed()}px`
        leftArray.push(+left.toFixed())

        if (i === 3) {
            let cards = [...document.querySelectorAll(".scroll-card")]
            let startNewCard = figure.cloneNode(true),
                endNewCard = cards[0].cloneNode(true)

            startNewCard.dataset.left = 0 - 263 - gap
            startNewCard.style.left = 0 - 263 - gap + "px"

            endNewCard.dataset.left = +figure.dataset.left + 263 + gap
            endNewCard.style.left = +figure.dataset.left + 263 + gap + "px"

            aboutUsScroll.insertAdjacentElement("afterbegin", startNewCard)
            aboutUsScroll.append(figure)
            aboutUsScroll.append(endNewCard)
        } else {
            aboutUsScroll.append(figure)
        }
    }

    sliderCards = [...document.querySelectorAll(".scroll-card")]
    scrollBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            let newCard
            sliderCards.forEach(card => {
                if (btn.classList.contains("scroll-btn-right")) {
                    let newLeft = +card.dataset.left - 263 - gap,
                        oldLeft = card.dataset.left
                    if (card.dataset.left < 0) {
                        card.style.left = card.dataset.left + "px"
                        card.dataset.left = card.dataset.left
                    } else {
                        card.style.left = newLeft + "px"
                        card.dataset.left = newLeft

                    }
                    if (oldLeft == +leftArray[3] + 263 + gap) {
                        // console.log(sliderCards)
                        newCard = sliderCards[2].cloneNode(true)
                        newLeft = newLeft + 263 + gap

                        newCard.style.left = newLeft + "px"
                        newCard.dataset.left = newLeft
                        aboutUsScroll.append(newCard)
                    }

                    sliderCards[0].remove()
                } else {
                    let newLeft = +card.dataset.left + 263 + gap
                    if (card.dataset.left > sliderWidth) {
                        card.style.left = card.dataset.left + "px"
                        card.dataset.left = card.dataset.left
                    } else {
                        card.style.left = newLeft + "px"
                        card.dataset.left = newLeft
                    }
                    if (sliderCards[0] == card && card.dataset.left == 0) {
                        // console.log(1)
                        let interestedCard = sliderCards[sliderCards.length - 3]
                        newCard = interestedCard.cloneNode(true)
                        let newLeft = 0 - 263 - gap
                        newCard.style.left = newLeft + "px"
                        newCard.dataset.left = newLeft
                        aboutUsScroll.insertAdjacentElement("afterbegin", newCard)
                        sliderCards[sliderCards.length - 1].remove()
                    }
                }
            })

            sliderCards = [...document.querySelectorAll(".scroll-card")]
        })
    })

    let scrlCards = [...document.querySelectorAll(".scroll-card")]
    scrollImg = document.querySelector(".person")

    if (localStorage.formData !== undefined) {
        document.querySelector("h1").innerText = `Hello ${(JSON.parse(localStorage.formData)[`person-name`]).split(" ")[0]}`
        formData = JSON.parse(localStorage.formData)
        footerFormInputs.forEach((input) => {
            if (formData[input.name] && formData[input.name].length > 0) {
                input.value = `${formData[input.name]}`
            }
        })
    }

    burgerBtn.onclick = function () {
        nav.classList.toggle("db")
        nav.classList.toggle("nav-mobile")
        burgerBtn.style.zIndex = "1"
        burgerBtn.classList.toggle("burger-btn-click")
        body.classList.toggle("oh")

        headerNavLinks.forEach(link => {
            link.onclick = () => {
                nav.classList.remove("db")
                nav.classList.remove("nav-mobile")
                burgerBtn.classList.remove("burger-btn-click")
                body.classList.remove("oh")
            }
        })
    }

    scrlCards.forEach((scrollCard) => {
        scrollCard.addEventListener("mouseover", () => {
            scrollCard.querySelector(".about-us-icons").classList.remove("dn")
        })
        scrollCard.addEventListener("mouseleave", () => {
            scrollCard.querySelector(".about-us-icons").classList.add("dn")
        })
    })

    function parallax(element, event) {
        element.style.backgroundPosition = `calc(50% + ${(event.clientX * 0.1).toFixed()}px) calc(50% + ${(event.clientY * 0.1).toFixed()}px)`
    }

    fetch("js/products.json")
        .then(response => response.json())
        .then(res => {
            if (localStorage.category === undefined) {
                localStorage.setItem("category", JSON.stringify(res))
            }

            if (localStorage.categoryName === undefined) {
                localStorage.setItem("categoryName", "All")
            }
            let categoryBtns = [...document.querySelectorAll(".latest-works-categories-item")]
            categoryBtns.forEach(btn => {
                if (btn.textContent === localStorage.categoryName) {
                    btn.classList.add("latest-works-categories-item-active")
                }
            })
            // console.log(localStorage.category)
            createLatestWorksCards(localStorage.category !== undefined ? JSON.parse(localStorage.category) : res)
            latestWorksBtns.forEach(btn => {
                btn.addEventListener("click", () => {
                    let wantedDatas = []
                    res.forEach(data => {
                        if (btn.textContent !== "All") {
                            if (btn.textContent === data.category) {
                                wantedDatas.push(data)
                            }
                        } else {
                            wantedDatas.push(data)
                        }
                    })
                    localStorage.category = JSON.stringify(wantedDatas)
                    localStorage.categoryName = btn.textContent
                    createLatestWorksCards(wantedDatas)
                    let oldPressedBtns = [...document.querySelectorAll(".latest-works-categories-item.latest-works-categories-item-active")]
                    oldPressedBtns.forEach(activeBtn => {
                        activeBtn.classList.remove("latest-works-categories-item-active")
                    })
                    btn.classList.add("latest-works-categories-item-active")
                })
            })

            function createLatestWorksCards(datas) {
                let oldCards = [...latestWorksCardsSection.querySelectorAll(".latest-works-card")]

                if (oldCards.length > 0) {
                    oldCards.forEach(card => {
                        card.remove()
                    })
                }

                datas.forEach(data => {
                    let figure = document.createElement("figure"),
                        img = document.createElement("img"),
                        figcaption = document.createElement("figcaption"),
                        h3 = document.createElement("h3"),
                        p = document.createElement("p"),
                        button = document.createElement("button")

                    figure.classList.add("latest-works-card", "card")
                    img.classList.add("card-img")
                    figcaption.classList.add("card-figcptn")
                    h3.classList.add("card-title")
                    p.classList.add("card-category")
                    button.classList.add("card-btn")

                    img.src = data.imgPath
                    h3.textContent = data.name
                    p.textContent = data.category
                    button.dataset.cardname = data.name

                    button.textContent = "View"

                    figure.append(img)
                    figcaption.append(h3)
                    figcaption.append(p)
                    figcaption.append(button)
                    figure.append(figcaption)

                    latestWorksCardsSection.append(figure)
                })
                // latestWorksCardsSection.style.height = getComputedStyle(latestWorksCardsSection).height
            }
            //console.log(elementsWithAnimation.length)
        })
        .then(() => {
            for (let element of elemsWithParallax) {
                window.addEventListener("mousemove", function handler(event) {
                    const x = event.clientX
                    const y = event.clientY
                    if (element.getBoundingClientRect().left <= x && element.getBoundingClientRect().right >= x && element.getBoundingClientRect().top <= y && element.getBoundingClientRect().bottom >= y) {
                        element.addEventListener("mousemove", parallax.bind(null, element))
                    }
                    window.removeEventListener("mousemove", handler)
                })
                element.addEventListener("mouseenter", () => {
                    element.addEventListener("mousemove", parallax.bind(null, element))
                })

                element.addEventListener("mouseleave", () => {
                    element.removeEventListener("mousemove", parallax)
                })
            }

            let clickCounter = 0
            servicesItemsBox.addEventListener("click", () => {
                let clickinterval
                if (clickinterval !== Number) {
                    clickCounter++

                    if (clickCounter >= 3) {
                        servicesItemTitle.forEach((text) => {
                            text.innerText = `Triple click Hack`
                        })
                        clearInterval(clickinterval)
                        return
                    }

                    clickinterval = setInterval(() => {
                        clickCounter = 0
                    }, 800)
                }
            })

            formData = {}
            document.forms.form.addEventListener("submit", () => {
                footerFormInputs.forEach((element) => {
                    if (element.value.length > 0 && element.value.length < 150) {
                        formData[element.name] = element.value
                    }
                })
                localStorage.setItem("formData", JSON.stringify(formData))
            })

            readMoreBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    document.querySelector(".read-more-box").classList.remove("dn")
                    let p = document.createElement("p"),
                        text = btn.closest(".post").querySelector(".text").innerText
                    p.classList.add("text", "post-paragraph")
                    p.textContent = text + "\n\n" + text
                    document.querySelector(".read-more-content").append(p)
                })
            })


            close.forEach((close) => {
                close.addEventListener("click", () => {
                    close.closest(".parent").classList.add("dn")
                })
            })

            elementsWithAnimation = [...document.querySelectorAll(".animation")]

            function removeAnim(elem) {
                if (JSON.stringify(elem.classList).match(/(anim-)\w+/g)) {
                    elem.classList.remove(JSON.stringify(elem.classList).match(/(anim-)\w+/g)[0])
                }
            }

            let distsanceToAnimatedElemArray = []
            for (let element of elementsWithAnimation) {
                let scrollPos = window.scrollY,
                    elementPos = {
                        elem: element,
                        top: element.getBoundingClientRect().top + scrollPos,
                    }

                if (element.classList.contains("anim-top")) {
                    elementPos.top += parseFloat(getComputedStyle(element).height)
                } else if (element.classList.contains("anim-bottom")) {
                    elementPos.top -= parseFloat(getComputedStyle(element).height)
                }

                if (elementPos.top > window.scrollY) {
                    if (elementPos.top < window.scrollY + window.innerHeight) {
                        removeAnim(element)
                    } else {
                        distsanceToAnimatedElemArray.push([element, elementPos.top])
                    }
                } else {
                    removeAnim(element)
                }
            }
            // console.log(distsanceToAnimatedElemArray)

            window.onscroll = (e) => {
                let zoneBottomBorder = window.scrollY + window.innerHeight
                distsanceToAnimatedElemArray.forEach(data => {
                    if (zoneBottomBorder > data[1]) {
                        removeAnim(data[0])
                        distsanceToAnimatedElemArray.splice(distsanceToAnimatedElemArray.indexOf(data), 1)
                        console.log(distsanceToAnimatedElemArray)
                        console.log(distsanceToAnimatedElemArray, zoneBottomBorder, data[1])
                    } else {

                    }
                })
            }

            //console.log(elementsWithAnimation.length)
            /* let elementsWithAnimationArray = []
            for (let i = 0; i < elementsWithAnimation.length; i++) {
                let res = elementsWithAnimation[i].offsetTop
                if (elementsWithAnimation[i].classList.contains("anim-top")) {
                    res += parseFloat(getComputedStyle(elementsWithAnimation[i]).height)
                } else if (elementsWithAnimation[i].classList.contains("anim-bottom")) {
                    res -= parseFloat(getComputedStyle(elementsWithAnimation[i]).height)
                }
                // console.table(elementsWithAnimation[i].getBoundingClientRect().top, elementsWithAnimation[i].parentElement.getBoundingClientRect().height)
                if (res > window.scrollY) {
                    console.log(document.documentElement.scrollHeight, "Test")
                    elementsWithAnimationArray.push(res)
                } else {
                    console.log("Елемент який вище нашого проскролу", elementsWithAnimation[i].offsetTop, elementsWithAnimation[i], res)
                    let animStyleClass = JSON.stringify(elementsWithAnimation[i].classList).match(/(anim-)\w+/g)
                    elementsWithAnimation[i].classList.remove(animStyleClass)
                    console.log(elementsWithAnimation[i], animStyleClass)
                }
                console.log(elementsWithAnimationArray, window.scrollY)
            } */

        })
}