$(".category-title").parent().attr("data-aos", "fade-up").attr("data-aos-once", true).attr("data-aos-duration", "1000")
$(".products-row").attr("data-aos", "fade-up").attr("data-aos-once", true).attr("data-aos-duration", "1000").attr("data-aos-delay", "100")

$(".menu-btn").click(function (e) {
    let sideMenu = $(".side-menu");
    let menu = $(".side-menu .menu")
    if (menu.hasClass("covered")) {
        menu.removeClass("covered");
        $(".side-menu .wrapper").removeClass("covered")
        $(".side-menu .sub-menu").removeClass("open")
    } else {
        if (sideMenu.hasClass("open")) {
            sideMenu.removeClass("open")
        } else {
            sideMenu.addClass("open")
        }
    }
})
$(".main-about-link").click(function (e) {
    e.preventDefault();
    $(".side-menu").addClass("open")
    $("#menu-about-link").click();
})
$(function () {
    const langBtn = $(".language-dropdown .toggler");
    const menu = $(".language-dropdown ul");
    langBtn.on("click", function (e) {
        e.preventDefault();
        menu.toggleClass("open")
    })
    $(".language-dropdown").focusout(function () {
        menu.removeClass("open")
    })

    var lastScrollTop = 0;
    // side-menu
    const sideMenu = $(".side-menu .menu");
    const sideMenuLinks = $(".side-menu .menu-link");

    sideMenuLinks.on("click", function (e) {
        e.preventDefault();
        sideMenu.toggleClass("covered")
        $(".side-menu .wrapper").toggleClass("covered")
        let menu = $(this).attr("href");
        $(menu).addClass("open");
    })

})

// slider
$(function () {
    const slides = $(".about-slider .slide")
    const controls = $(".about-slider .control");
    var slideIndex = 0;
    // prev/next slide
    controls.on("click", function (e) {
        if (String($(this).attr("id")) === String("prev")) {
            slideIndex--;
        } else {
            slideIndex++;
        }
        if (slideIndex > slides.length - 1) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }

        slides.removeClass("active");

        $(slides[slideIndex]).addClass("active");

    })
})

$(function () {
    $(".scroll-link").on("click", function (e) {
        e.preventDefault();
        let section = $(this).attr("href");
        const element = $(section)[0];
        const bodyRect = document.body.getBoundingClientRect().top;
        let totalNavHeight = $(".navbar.main-nav").height()
        const offset = totalNavHeight - 100;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        $("html, body").animate({
            scrollTop: offsetPosition
        });
    })

    $("#login-here-link").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        $("#login-dropdown-toggler").click()
    })

})

$(function () {
    const slider = $(".product-slider .slider");
    const products = $(".product-slider .products a");
    const slides = $(".product-slider .slides");
    var slideIndex = 0;
    products.on("click", function (e) {
        e.preventDefault();
        slideTo($(this).data("slide"));

    })

    function slideTo(index) {
        let width = $(".slides").width();
        $(".slides .slide").removeClass("active");
        $($(".slides .slide")[index]).addClass("active")
        slides[0].style.left = index * -(width / 3) + "px";
    }


    $(document).scroll(function () {
        var scrollTop = $(this).scrollTop();
        if (scrollTop > 100) {
            $(".main-nav").addClass("scrolling")

        } else {
            $(".main-nav").removeClass("scrolling")
        }
    })
})

// block of code for the img magnifier
function magnify(img, zoom) {
    var glass, w, h, bw;
    /* Create magnifier glass: */
    glass = document.createElement("DIV");
    glass.setAttribute("class", "img-magnifier-glass");

    /* Insert magnifier glass: */
    img.parentElement.insertBefore(glass, img);

    /* Set background properties for the magnifier glass: */
    glass.style.backgroundImage = "url('" + img.src + "')";
    glass.style.backgroundRepeat = "no-repeat";
    glass.style.backgroundSize = ($(img).width() * zoom) + "px " + ($(img).height() * zoom) + "px";
    bw = 3;
    w = glass.offsetWidth / 2;
    h = glass.offsetHeight / 2;

    /* Execute a function when someone moves the magnifier glass over the image: */
    glass.addEventListener("mousemove", moveMagnifier);
    img.addEventListener("mousemove", moveMagnifier);

    /*and also for touch screens:*/
    glass.addEventListener("touchmove", moveMagnifier, false);
    img.addEventListener("touchmove", moveMagnifier, false);
    function moveMagnifier(e) {
        var pos, x, y;
        /* Prevent any other actions that may occur when moving over the image */
        e.preventDefault();
        /* Get the cursor's x and y positions: */
        pos = getCursorPos(e);
        x = pos.x;
        y = pos.y;
        /* Prevent the magnifier glass from being positioned outside the image: */
        if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
        if (x < w / zoom) { x = w / zoom; }
        if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
        if (y < h / zoom) { y = h / zoom; }
        /* Set the position of the magnifier glass: */
        glass.style.left = (x - w) + "px";
        glass.style.top = (y - h) + "px";
        /* Display what the magnifier glass "sees": */
        glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
    }

    function getCursorPos(e) {
        var a, x = 0, y = 0;
        e = e || window.event;
        /* Get the x and y positions of the image: */
        a = img.getBoundingClientRect();
        /* Calculate the cursor's x and y coordinates, relative to the image: */
        x = e.pageX - a.left;
        y = e.pageY - a.top;
        /* Consider any page scrolling: */
        x = x - window.pageXOffset;
        y = y - window.pageYOffset;
        return { x: x, y: y };
    }
}

$(function () {
    $(".product-collapse .collapse").on("show.bs.collapse", function (e) {
        let id = $(this).attr("id");
        let toggler = $(".product-collapse .collapse-toggler").filter(function () {
            return $(this).attr("href") == `#${id}`;
        })

        toggler.find("i").removeClass("bx-plus").addClass("bx-minus")
    })
    $(".product-collapse .collapse").on("hidden.bs.collapse", function (e) {
        let id = $(this).attr("id");
        let toggler = $(".product-collapse .collapse-toggler").filter(function () {
            return $(this).attr("href") == `#${id}`;
        })

        toggler.find("i").removeClass("bx-minus").addClass("bx-plus")
    })

    // mobile filter menu
    $(".filter-btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).data("open")) {
            $("#mobile-filter-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".filter-btn").attr("data-open", false)
        } else {
            $("#mobile-filter-menu").addClass("open");
            $(".mobile-menu-overlay").show();
            $(".filter-btn").attr("data-open", true)
        }
    })
    $("#mobile-filter-menu").click(function (e) {
        if (e.target == $("#mobile-filter-menu")[0]) {
            $("#mobile-filter-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".filter-btn").attr("data-open", false)
        }
    })

    $(".mobile-filters").click(function () {
        $("#mobile-filter-menu").removeClass("open");
        $(".mobile-menu-overlay").hide();
        $(".filter-btn").attr("data-open", false)
    })


    // mobile side menu
    $(".mobile-menu-btn").on("click", function (e) {
        e.preventDefault();
        if ($(this).data("open")) {
            $("#mobile-side-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".mobile-menu-btn").attr("data-open", false)
        } else {
            $("#mobile-side-menu").addClass("open");
            $(".mobile-menu-overlay").show();
            $(".mobile-menu-btn").attr("data-open", true)
        }
    })
    $("#mobile-side-menu").click(function (e) {
        if (e.target == $("#mobile-side-menu")[0]) {
            $("#mobile-side-menu").removeClass("open");
            $(".mobile-menu-overlay").hide();
            $(".mobile-menu-btn").attr("data-open", false)
        }
    })

})

$(function () {
    let productsRow = $("#products .products-row");

    let products = productsRow.html();

    productsRow.html(products + products + products + products);

    $(".categories-nav .top-link").on("mouseover", function (e) {
        let width = $(this).width();
        let arrow = $(this).siblings(".menu-wrapper").find(".arrow");
        $(this).siblings(".menu-wrapper").css('width', (width * 2 + 60) + "px")
        arrow.css("left", width + "px");
    })
})

$(function () {
    $(".category-btn").on("click", function (e) {
        let width = $("#mobile-category-menu").width();
        $("#mobile-category-menu").find(".top-arrow").css("left", (width / 2 - 10) + "px")
        if ($("#mobile-category-menu").hasClass("open")) {
            $("#mobile-category-menu").removeClass("open");
            $(this).find("i").addClass("bx-chevron-up").removeClass("bx-chevron-down")

        } else {
            $("#mobile-category-menu").addClass("open");
            $(".category-btn").find("i").removeClass("bx-chevron-up").addClass("bx-chevron-down");

        }

    })
    $(".mobile-categories-nav .top-link").on("click", function (e) {

        let width = $(this).width();
        let arrow = $(this).siblings(".menu-wrapper").find(".arrow");
        $(this).siblings(".menu-wrapper").css('width', (width * 2 + 60) + "px")
        arrow.css("left", width + "px");

        $(this).parent().parent().toggleClass("open")
    })
    $(".product img").addClass("w-100")

    $(".product-info-pills").on("click", function (e) {
        $(".product-info-pills").parent().removeClass("active");
        $(this).parent().addClass("active")
    })

})

$(function () {
    let loginModal = $("#login-modal");
    let resetBtn = loginModal.find(".reset-pass");
    let createAccountBtn = loginModal.find(".create-account");
    let loginBtn = loginModal.find(".login-account");
    createAccountBtn.on("click", function () {
        loginModal.modal("hide");
    })

    //resetbtn
    resetBtn.on("click", function (e) {
        e.preventDefault();
        $(".login-form").addClass("d-none")
        $(".reset-form").removeClass("d-none")
    })

    // login btn
    loginBtn.on("click", function (e) {
        e.preventDefault();
        $(".login-form").removeClass("d-none")
        $(".reset-form").addClass("d-none")
    })
})

$(function () {
    $(".profile-link").on("click", function (e) {
        e.preventDefault();
        if (connection.auth.user()) {
            $(this).siblings(".dropdown-menu").dropdown("toggle")
        } else {
            $("#login-modal").modal("show")
        }
    })

    $("#view-modal").on("show.bs.modal", function (e) {
    })
    $("#view-modal").on("hidden.bs.modal", function (e) {
        $(this).find(".sub-preloader").removeClass("closed")
        $(this).find(".placeholder").removeClass("d-none")
        $(this).find(".content").remove()
        $(".slides .placeholder").addClass("active")
        $(".slides").css("left", 0)
        $("#view-modal span.placeholder").siblings("span").html("")
        $("#add-to-cart-form #quantity-box").val(1)
    })
    $(".quantity-up").on("click", function (e) {
        $(this).siblings("input")[0].stepUp()
    })
    $(".quantity-down").on("click", function (e) {
        $(this).siblings("input")[0].stepDown()
    })

    $("#add-to-cart-form").on("submit", async function (e) {
        e.preventDefault();
        const user = await connection.auth.user();

        if (user) {
            Swal.fire({
                title: 'Add to cart?',
                text: "Product(s) will be added to your cart!",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#801515',
                cancelButtonColor: '#000',
                confirmButtonText: 'Confirm',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    let form = $("#add-to-cart-form");

                    let userId = user.id
                    let productId = form.find(".product-id").val();
                    let quantity = form.find("#quantity-box").val();

                    let added = addToCart(userId, productId, quantity);

                    if (added.error) {
                        new Toast({
                            message: added.error,
                            type: 'danger',

                        });
                    } else {
                        new Toast({
                            message: 'Successfully added to cart!',
                            icon: "bx bx-sm bxs-check-circle bx-burst text-success"
                        });
                    }

                }
            })
        } else {
            $("#view-modal").modal("hide")
            $(".profile-link").click()
        }



    })
})
function numberToPrice(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const viewProduct = async (btn) => {
    const modal = $("#view-modal");
    modal.modal("show")

    let id = $(btn).data('id')

    let product = await findProduct(id);
    product = product.data[0]

    //add product slider slides
    const slider = $(".product-slider .slider");
    const slides = $(".product-slider .slides");
    //clear slides first
    modal.find(".placeholder").addClass("d-none")
    $(".slides .placeholder").removeClass("active")
    // set product infos
    modal.find("#product-name").html(product.name).attr("title", product.name)
    modal.find("#description").html(product.description)
    modal.find("#price").html("$. " + numberToPrice(product.price))
    modal.find("#category").html("Category: " + product.category.description)
    modal.find("#type").html(product.type.description)

    modal.find(".product-id").val(product.id)
    let i = 0
    for (let img of product.product_images) {
        let p = `
             <div class="mb-3 content">
                 <a href="#" data-slide="${i}">
                     <div class="card">
                         <div class="card-body p-0">
                             <img src="${img.src}"
                                 alt="" class="img-fluid">
                         </div>
                     </div>
                 </a>
             </div>
              `
        let slide = `
              <div class="content img-magnifier-container slide ${i == 0 ? "active" : ""}">
                  <img onload="magnify(this,3)" src="${img.src}"
                      alt="" class="">
              </div>`
        slides.append(slide);
        $(".product-slider .products").append(p);

        i++;
    }
    // let slideImages = $(".img-magnifier-container");
    // console.log("slide images: ", slideImages.length)
    // for (let slide of slideImages) {
    //     magnify($(slide).find("img")[0], 3)
    // }

    const products = $(".product-slider .products a");
    products.on("click", function (e) {
        e.preventDefault();
        slideTo($(this).data("slide"));

    })

    function slideTo(index) {
        let width = $(".slides").width();
        let count = $(".slides .content").length
        $(".slides .slide").removeClass("active");
        $($(".slides .content")[index]).addClass("active")
        slides[0].style.left = index * -(width / count) + "px";
        // magnify($($(".slides .content")[index]).find("img")[0],4)
    }


    modal.find(".sub-preloader").addClass("closed")
}

const setCartItemsCount = async () => {
    var user = await connection.auth.user();
    if (user) {
        const { data, error } = await connection
            .from('cart')
            .select("*")
            .eq("userId", user.id)
        var count = 0;
        for (let item of data) {
            count += item.quantity
        }
        $(".cart-items-count").html(count)
    }
}
const showPreloader = () => {
    $("body").addClass("preloader-open")
    $("#page-preloader").removeClass("closed")

}
const closePreloader = () => {
    // $("html, body").scrollTop(0)

    setTimeout(function () {
        $("body").removeClass("preloader-open")
        $("#page-preloader").addClass("closed")
    }, 500)

}


const addProductDisplay = (product, container, method = "append") => {
    let productEl = ` 
    <div class="col-md-2 product-card" data-id="${product.id}">
    <div class="card rounded-0 product " title="${product.name}" data-id="${product.id}">
        <div class="card-body">
            <div class="text-center">

                <img onclick="viewProduct(this)" style="cursor:pointer;" data-id="${product.id}" src="${product.product_images.length > 0 ? product.product_images[0].src : ""}"
                    alt="" class="img-fluid">
                <p class="text-dark text-truncate mt-2 mb-1 fw-bolder" title="${product.name}"><small>${product.name}</small></p>
                <p class="text-center  mb-1"><span class="text-black-50 me-1"><small>${product.category.description}</small></span><span class="text-black-50"><small>${product.type.description}</small></span></p>

                <p class="text-center text-danger fw-bolder mb-1">P ${numberToPrice(product.price)}</p>

            </div>
        </div>
    </div>
</div>
    `

    if (method.toLowerCase() == "append") {
        container.append(productEl)
    } else {
        container.prepend(productEl)
    }
}


// load data from database
$(function () {
    async function loadData() {
        await setCartItemsCount();
    }

    loadData();

    const mySubscription = connection
        .from('cart')
        .on('*', payload => {
            setCartItemsCount();
        })
        .subscribe()
})

$(function () {
    function load() {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
            "method": "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded",
                "X-RapidAPI-Key": "a315685f17msh41e6b9438259d40p198ad5jsn9e86a2e59fbb",
                "X-RapidAPI-Host": "google-translate1.p.rapidapi.com"
            },
            "data": {
                "q": "Hello, world!",
                "target": "fi",
                "source": "en"
            }
        };

        $.ajax(settings).done(function (response) {
            console.log(response);
        });
    }
    // load();
})

$(".log-out").on("click", function (e) {
    e.preventDefault();
    Swal.fire({
        title: 'Log out?',
        text: "Your account will be log out from this device!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#801515',
        cancelButtonColor: '#000',
        confirmButtonText: 'Confirm',
    }).then(async (result) => {
        if (result.isConfirmed) {
            const { error } = await connection.auth.signOut()
            location.reload();
        }
    })
})

$("#login-form").on("submit", async function (e) {
    e.preventDefault();
    showPreloader();
    const form = $("#login-form");
    let email = form.find(".email").val();
    let password = form.find(".password").val();

    const { user, session, error } = await connection.auth.signIn({
        email,
        password
    })
    if (!error) {
        closePreloader();
        Swal.fire({
            title: 'Success',
            text: "You have successfully log in!",
            icon: 'success',
            confirmButtonColor: '#801515',

        }).then(() => {
            location.reload();

        })
    } else {
        Swal.fire({
            title: 'Failed',
            text: "Invalid email address or password!",
            icon: 'error',
            confirmButtonColor: '#801515',

        })
    }
})

$(".cart-link").on("click", async function (e) {
    e.preventDefault();
    const user = await connection.auth.user();

    if (user) {
        location.href = $(this).attr("href")
    } else {
        $(".profile-link").trigger("click")
    }
})

$(".search-form").on("submit", function (e) {
    e.preventDefault();
    const form = $(this);

    let search_query = form.find(".search-box").val();

    // save search query to local storage
    localStorage.setItem("searchQuery", search_query)

    // redirect to search page
    location.href = "search.html"
})

$("#mobile-filter-menu input[type=radio]").on("click", function (e) {
    $("#mobile-filter-menu").removeClass("open");
    $(".mobile-menu-overlay").hide();
    $(".filter-btn").attr("data-open", false)
})

$("#recover-form").on("submit", async function (e) {
    e.preventDefault();
    showPreloader();
    let form = $("#recover-form");
    let email = form.find(".email").val()
    const { data, error } = await connection.auth.api
        .resetPasswordForEmail(email)

    if (data) {
        localStorage.setItem("resetEmailAddress", email)
        location.href = "reset-sent.html"
    }
})