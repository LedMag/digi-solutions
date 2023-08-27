// handle links with @href started with '#' only
$(document).on('click', '.js-scroll', function(e) {
    // target element id
    var id = $(this).attr('href');
    var headerHt = $('#mainNavbar').height();

    // target element
    var $id = $(id);
    if ($id.length === 0) {
        return;
    }

    // prevent standard hash navigation (avoid blinking in IE)
    e.preventDefault();

    // top position relative to the document
    var pos = $id.offset().top - headerHt - 20;

    // animated top scrolling
    $('body, html').animate({ scrollTop: pos });

    $(".js-btn-close").trigger('click');
});

// Trigger offcanvas menu
$("[data-trigger]").on("click", function() {
    var trigger_id = $(this).attr('data-trigger');
    $(trigger_id).toggleClass("show");
    $('body').toggleClass("offcanvas-active");
});

// close button 
$(".js-btn-close").click(function(e) {
    $(".navbar-collapse").removeClass("show");
    $("body").removeClass("offcanvas-active");
});

// Back to Top Jquery
$(window).scroll(function() {
    if ($(this).scrollTop() > 300) {
        $('.js-top_btn').fadeIn()
    } else {
        $('.js-top_btn').fadeOut()
    }
});

$('.js-top_btn').on('click', function() {
    $('body,html').animate({
        scrollTop: 0
    }, 500)
})

// Sticky Menu Add Class
$(window).scroll(function() {
    var sticky = $('#mainNavbar'),
        scroll = $(window).scrollTop(),
        stickyWrapper = $(".js-mainNavbar-wrapper")

    if (scroll >= 95) stickyWrapper.addClass('is-fixed');
    else stickyWrapper.removeClass('is-fixed');
});



$("#contactForm").on("submit", function(e) {

    var form = $(this)[0];
    var submitButton = $(this).find('button[type="submit"]');

    $(submitButton).text('Loading ...').prop('disabled', true);

    if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        submitButton.text('Inquire Us').prop('disabled', false);
        return false;
    }

    var dataString = $(this).serialize();

    // alert(dataString); return false;

    $.ajax({
        type: "POST",
        url: "formmailer/mailer.php",
        data: dataString,
        success: function() {
            $("#contactForm").html("<div id='message' class='text-center'></div>");
            $("#message")
                .html("<h2>Thank you for contacting us!</h2>")
                .append("<p>We will be in touch soon.</p>")
                .hide()
                .fadeIn(1500);
        }
    });

    e.preventDefault();
});

(function() {
    var elements;
    var windowHeight;

    function init() {
        elements = document.querySelectorAll('.animation-hidden');
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var positionFromTop = elements[i].getBoundingClientRect().top;

            if (positionFromTop - windowHeight <= 0) {
                element.classList.add('fade-in-element');
                element.classList.remove('animation-hidden');
            }
        }
    }

    window.addEventListener('scroll', checkPosition);
    window.addEventListener('resize', init);

    init();
    checkPosition();
})();