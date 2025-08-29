window.onload = function (loadEvent) {
    let body = document.body,
        headerMenu = document.querySelector(".header-menu"),
        burgerBtn = document.querySelector(".burger-btn"),
        nav = document.querySelector(".header-nav"),
        aboutUsScroll = document.querySelector(".about-us-scroll"),
        scrollBtn = [...document.querySelectorAll(".scroll-btn")],
        elemsWithParallax = [...document.querySelectorAll(".parallax")],
        getStartedBtn = document.querySelector(".bg-trans-btn"),
        servicesItemsBox = document.querySelector(".services-items"),
        servicesItemTitle = [...document.querySelectorAll(".services-item-title")],
        readMoreBtns = [...document.querySelectorAll(".read-more")],
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
        close = [...document.querySelectorAll(".close")],
        latestWorksCardsSection = document.querySelector(".latest-works-cards"),
        latestWorksBtns = [...document.querySelectorAll(".latest-works-categories-item")],
        gap,
        sliderCards,
        elementsWithAnimation = [...document.querySelectorAll(".animation")],
        headerNavLinks = [...document.querySelectorAll(".nav-link")],
        clientsSlider = document.querySelector(".clients-logos"),
        clientsLogosArr = ["images/deorham.webp", "images/ratings.webp", "images/malik-media.webp", "images/bcause.webp", "images/womgify.webp"],
        clientsText = document.querySelector(".clients-texts")

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
                zone.innerHTML = ""
                zone.append(span)
            })

            let answerBtn = document.querySelector(".answer"),
                captcha = document.querySelector(".log-in-pop-up")

            captchaFunc(captcha, dropZones, answerBtn)

            answerBtn.addEventListener("click", () => {
                if (answerBtn.classList.contains("answer-disabled")) return

                let rightArr = [1, 2, 3, 4],
                    rects = [...document.querySelectorAll(".box-num")],
                    correct = true
                console.log(document.querySelectorAll(".box-num"), "усі box num")
                console.log(rects, "Box Num")

                rects.forEach((rect, i) => {
                    if (+rect.dataset.num !== rightArr[i]) {
                        correct = false
                    }
                })

                if (correct) {
                    alert("You are the Human")
                    // localStorage.setItem("isLoged", "true")
                } else {
                    alert("Incorrect")
                    // localStorage.setItem("isLoged", "false")
                }
                answerBtn.classList.add("answer-disabled")
                captcha.classList.add("dn")
                body.classList.remove("oh")
            })

            function captchaFunc(captcha, dropZones, answerBtn) {
                let rects = [...document.querySelectorAll(".box-num")],
                    movedItem
                console.log(document.querySelectorAll(".box-num"), "усі box num")
                body.classList.add("oh")
                captcha.classList.remove("dn")

                dropZones.forEach(zone => {
                    console.log(zone)
                    zone.addEventListener("dragover", dragOver.bind(null, zone))
                    zone.addEventListener("drop", dropAct.bind(null, zone))
                })
                rects.forEach(rect => {
                    rect.addEventListener("dragstart", dragStart.bind(null, rect))
                    rect.addEventListener("dragend", dragEnd.bind(null, rect))

                    rect.addEventListener("touchstart", (e) => {
                        movedItem = rect
                        movedItem.classList.add("z1")
                        startCord = {
                            top: Math.abs(e.touches[0].pageY - rect.getBoundingClientRect().top),
                            left: Math.abs(e.touches[0].pageX - rect.getBoundingClientRect().left)
                        }
                    })
                    rect.addEventListener("touchmove", (touchMoveEvent) => {
                        rect.style.width = getComputedStyle(rect).width
                        rect.style.height = getComputedStyle(rect).height
                        rect.parentElement.style.position = "static"
                        moveHandler(touchMoveEvent)
                    })

                    function moveHandler(event) {
                        move(movedItem, startCord, event)
                    }
                    function move(movedItem, startCord, event) {
                        movedItem.style.transform = "none"
                        movedItem.style.top = `${event.touches[0].pageY - startCord.top}px`
                        movedItem.style.left = `${event.touches[0].pageX - startCord.left}px`
                    }
                    rect.addEventListener("touchend", touchEndEvent => {
                        dropZones.forEach(zone => {
                            let rectPos = rect.getBoundingClientRect(),
                                zonePos = zone.getBoundingClientRect(),
                                rectParent = rect.parentElement

                            if (
                                rectPos.left >= zonePos.left &&
                                rectPos.right <= zonePos.right &&
                                rectPos.top >= zonePos.top &&
                                rectPos.bottom <= zonePos.bottom
                            ) {
                                zone.style.position = "relative"
                                rect.style.top = "50%"
                                rect.style.left = "50%"
                                rect.style.transform = `translate(-50%, -50%)`
                                if (zone.querySelector(".box-num")) {
                                    rectParent.style.position = "relative"
                                    rectParent.append(zone.querySelector(".box-num"))
                                    if (answerBtn.classList.contains("answer-disabled")) {
                                        answerBtn.classList.remove("answer-disabled")
                                    }
                                }
                                zone.append(rect)
                            }
                        })
                        rect.parentElement.style.position = "relative"
                        rect.style.top = "50%"
                        rect.style.left = "50%"
                        rect.style.transform = `translate(-50%, -50%)`
                        movedItem.classList.remove("z1")
                        movedItem = null
                    })
                })

                function dragStart(rect, dragStartEvent) {
                    console.log(rect)
                    setTimeout(() => {
                        movedItem = rect
                        movedItem.classList.add("dn", "z1")
                    }, 0)
                }

                function dragOver(zone, dragOverEvent) {
                    dragOverEvent.preventDefault()
                }

                function dropAct(zone, dropEvent) {
                    dropEvent.preventDefault()
                    console.log(movedItem, "TEST")
                    if (movedItem) {
                        let oldParent = movedItem.parentElement
                        if (zone.querySelector(".box-num")) {
                            oldParent.append(zone.querySelector(".box-num"))
                        }
                        zone.append(movedItem)
                        answerBtn.classList.remove("answer-disabled")
                    }
                }

                function dragEnd(rect, dragEndEvent) {
                    movedItem = null
                    movedItem.classList.remove("dn", "z1")
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
        if (JSON.parse(localStorage.formData)[`person-name`] && JSON.parse(localStorage.formData)[`person-name`].length > 0) {
            document.querySelector("h1").innerText = `Hello ${(JSON.parse(localStorage.formData)[`person-name`]).split(" ")[0]}`
        }
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
        element.style.backgroundPosition = `calc(50% - ${(event.clientX * 0.1).toFixed()}px) calc(50% - ${(event.clientY * 0.1).toFixed()}px)`
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
                            if (data.category.includes(btn.textContent)) {
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
                    p.textContent = data.category[0].length > 1 ? data.category.join(", ") : data.category
                    button.dataset.cardname = data.name

                    button.textContent = "View"

                    figure.append(img)
                    figcaption.append(h3)
                    figcaption.append(p)
                    figcaption.append(button)
                    figure.append(figcaption)

                    latestWorksCardsSection.append(figure)
                })
            }
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
                            text.style.color = "red"
                            text.style.fontWeight = "bold"
                        })
                        clearInterval(clickinterval)
                        return
                    }

                    clickinterval = setInterval(() => {
                        clickCounter = 0
                        clearInterval(clickinterval)
                    }, 800)
                }
            })

            formData = {}
            document.forms.form.addEventListener("submit", (e) => {
                e.preventDefault()
                let checkCorrectPopup = document.querySelector(".check-form"),
                    checkFormBox = checkCorrectPopup.querySelector(".check-form-box"),
                    formCopy = document.forms.form.cloneNode(true),
                    formBox = document.querySelector(".form-box"),
                    formFooter = formCopy.querySelector(".form-footer")
                if (checkFormBox.querySelector("form")) {
                    console.log(formBox)
                    formBox.innerHTML = ""
                }
                formFooter.innerHTML = ""
                let allowBtn = document.createElement("button"),
                    dismissBtn = document.createElement("button")

                allowBtn.classList.add("check-from-allow-btn", "check-form-btn")
                dismissBtn.classList.add("check-from-dismiss-btn", "check-form-btn")

                allowBtn.textContent = "Allow"
                dismissBtn.textContent = "Dismiss"

                formFooter.append(allowBtn)
                formFooter.append(dismissBtn)
                formBox.append(formCopy)
                checkCorrectPopup.classList.remove("dn")

                let resultBtns = [...document.querySelectorAll(".check-form-btn")]
                console.log(resultBtns)
                resultBtns.forEach(btn => {
                    btn.addEventListener("click", (eventBtn) => {
                        eventBtn.preventDefault()
                        console.log(eventBtn)
                        if (btn.classList.contains("check-from-dismiss-btn")) {
                            document.forms.form.reset()
                        } else if (btn.classList.contains("check-from-allow-btn")) {
                            let lastImputs = [...document.querySelectorAll(".check-form-box .input")]
                            lastImputs.forEach((element) => {
                                if (element.value.length > 0 && element.value.length < 150) {
                                    formData[element.name] = element.value
                                }
                            })
                            localStorage.setItem("formData", JSON.stringify(formData))
                        }
                        btn.closest(".parent").classList.add("dn")
                        console.log(btn.closest(".parent"))
                    })
                })

                // checkFormBox.append(document.forms.form.cloneNode(true))
                // footerFormInputs.forEach((element) => {
                //     if (element.value.length > 0 && element.value.length < 150) {
                //         formData[element.name] = element.value
                //     }
                // })
                // localStorage.setItem("formData", JSON.stringify(formData))
            })

            readMoreBtns.forEach((btn) => {
                btn.addEventListener("click", () => {
                    if (document.querySelector(".read-more-content").querySelector(".text")) {
                        document.querySelector(".read-more-content").querySelector(".text").remove()
                    }
                    document.querySelector(".read-more-box").classList.remove("dn")
                    let p = document.createElement("p"),
                        text = btn.closest(".post").querySelector(".text").innerText
                    p.classList.add("text", "post-paragraph")
                    p.textContent = text + text + text
                    document.querySelector(".read-more-content").append(p)
                })
            })


            close.forEach((close) => {
                close.addEventListener("click", () => {
                    close.closest(".parent").classList.add("dn")
                })
            })

            let logosGap,
                logosCoach = document.createElement("div")
            // console.log(logosCoach)
            clientsLogosArr.forEach((logoPath, i) => {
                let img = document.createElement("img"),
                    sliderWidth = Math.floor(clientsSlider.getBoundingClientRect().width),
                    howMuchCards = Math.floor(sliderWidth / (150 + 20)) > clientsLogosArr.length ? clientsLogosArr.length : Math.floor(sliderWidth / (150 + 20))
                logosGap = parseInt((howMuchCards > 1) ? (sliderWidth - (howMuchCards * 150)) / (howMuchCards - 1) : sliderWidth)
                let left = (150 + logosGap) * i,
                    delay = 0.4
                // console.log(left)

                logosCoach.classList.add("logos-coach")
                img.classList.add("client-logo", "animation", "anim-bottom")
                img.src = logoPath
                img.style.transition = `transform ${i * delay + delay}s`
                img.style.left = `${left}px`
                logosCoach.append(img)
                if (i + 1 === clientsLogosArr.length) {
                    logosCoach.style.width = `${parseInt(img.style.left) + 150}px`
                }
            })
            clientsSlider.style.width = `${parseFloat(getComputedStyle(clientsSlider).width) - (parseFloat(getComputedStyle(clientsSlider).width) % 10)}px`
            clientsSlider.append(logosCoach)

            // infinitySlider()

            function infinitySlider() {
                setTimeout(() => {
                    infinitySliderAct()
                }, 3200)
            }

            function infinitySliderAct() {
                let allCoaches = [...clientsSlider.querySelectorAll(".logos-coach")]
                setTimeout(() => {
                    if (allCoaches.length < 2) {
                        let newCoach = createNewCoach((allCoaches.length < 1) ? logosCoach : allCoaches[allCoaches.length - 1]) //Перевірити
                        // console.log((allCoaches.length < 1) ? logosCoach : allCoaches[allCoaches.length - 1])
                        // console.log(newCoach)
                    }
                    allCoaches = [...clientsSlider.querySelectorAll(".logos-coach")]
                    moveCoaches(allCoaches, 10000)
                }, 1000)
            }

            function createNewCoach(exampleCoach, pos) {
                let newCoach = exampleCoach.cloneNode(true)
                newCoach.style.left = `${parseInt(getComputedStyle(exampleCoach).width) + logosGap}px`
                clientsSlider.append(newCoach)
                return newCoach
            }

            function moveCoaches(allCoaches, delay) {
                let coachWidth = parseInt(getComputedStyle(allCoaches[0]).width)

                allCoaches.forEach((coach, i) => {
                    coach.style.transition = `left ${delay}ms linear`
                    coach.style.left = `${(coachWidth + logosGap) * (i - 1)}px`
                    coach.firstElementChild.offsetLeft //Роблю це для того щоб перерахувати усі позиції для правильного рендера
                })
                setTimeout(() => {
                    createNewCoach(allCoaches[1])
                    allCoaches[0].remove()
                    allCoaches = [...clientsSlider.querySelectorAll(".logos-coach")]
                    allCoaches.forEach((coach, i) => {
                        coach.style.transition = "0s"
                        coach.style.left = `${(coachWidth + logosGap) * i}px`
                    })
                    infinitySliderAct()
                }, delay <= 1000 ? 0 : delay - 1000)
            }

            fetch("js/quotes.json")
                .then(response => response.json())
                .then(result => {
                    let text = clientsText.querySelector(".clients-text"),
                        autor = clientsText.querySelector(".client"),
                        dotsBox = clientsText.querySelector(".dots")

                    function inputContent(dot, data, event) {
                        text.classList.add("anim-visible")
                        autor.classList.add("anim-visible")
                        setTimeout(() => {
                            if (event) {
                                dot.classList.remove("dot-pressed")
                            }
                            text.classList.remove("anim-visible")
                            autor.classList.remove("anim-visible")
                            text.innerText = data[dot.dataset.number - 1].text
                            autor.innerText = data[dot.dataset.number - 1].autor
                            if (!dot.classList.contains("dot-active")) {
                                let dotsBox = clientsText.querySelector(".dots")
                                if (dotsBox.querySelector(".dot-active")) {
                                    dotsBox.querySelector(".dot-active").classList.remove("dot-active")
                                }
                                dot.classList.add("dot-active")
                            }
                        }, 1000)
                    }
                    for (let i = 0; i < result.length; i++) {
                        let dot = document.createElement("span")
                        dot.className = "dot"
                        dot.dataset.number = i + 1
                        dot.addEventListener("click", (e) => {
                            dot.classList.add("dot-pressed")
                            inputContent(dot, result, e)
                        })
                        if (i < 1) {
                            inputContent(dot, result)
                        }
                        dotsBox.append(dot)
                    }
                    function quotesChange() {
                        intervalId = setInterval(() => {
                            let activeDot = document.querySelector(".dot-active")
                            inputContent(activeDot.nextElementSibling ? activeDot.nextElementSibling : dotsBox.firstElementChild, result)
                        }, 5000)
                    }

                    let intervalId
                    quotesChange()
                    // clearInterval(intervalId)

                    clientsText.addEventListener("mouseenter", () => {
                        clearInterval(intervalId)
                    })
                    clientsText.addEventListener("mouseleave", () => {
                        quotesChange()
                    })
                })
                .then(() => {
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
                                if (element.classList.contains("client-logo") && element === element.parentElement.lastElementChild) {
                                    infinitySlider()
                                }
                            } else {
                                distsanceToAnimatedElemArray.push([element, elementPos.top])
                            }
                        } else {
                            removeAnim(element)
                        }
                    }
                    let menuShow = false,
                    header = document.querySelector("header"),
                    headerMenu = document.querySelector(".header-menu-box")

                    window.onscroll = (e) => {
                        let zoneBottomBorder = window.scrollY + window.innerHeight
                        if (window.scrollY >= window.innerHeight && !menuShow) {
                            console.log("Показати")

                            headerMenu.classList.add("header-menu-fixed", "anim-top")
                            header.insertAdjacentElement("beforebegin", headerMenu)
                            setTimeout(() => {
                                headerMenu.classList.remove("anim-top")
                            }, 0)
                            menuShow = !menuShow
                        }

                        if (window.scrollY <= window.innerHeight && menuShow) {
                            console.log("Сховати")

                            headerMenu.classList.remove("header-menu-fixed")
                            header.insertAdjacentElement("afterbegin", headerMenu)

                            menuShow = !menuShow
                        }
                        // console.log(headerMenu.getBoundingClientRect().height)
                        distsanceToAnimatedElemArray.forEach(data => {
                            if (zoneBottomBorder > data[1]) {
                                removeAnim(data[0])
                                distsanceToAnimatedElemArray.splice(distsanceToAnimatedElemArray.indexOf(data), 1)
                                if (data[0].classList.contains("client-logo") && !data[0].parentElement.classList.contains("scroll-run")) {
                                    // console.log(data[0])
                                    data[0].parentElement.classList.add("scroll-run")
                                    infinitySlider()
                                }
                            }
                        })
                        // headerMenu
                    }
                })

        })

}