const formWrapp = document.querySelectorAll('.contactsFormWrapper') as NodeListOf<HTMLElement>;
const forms = document.querySelectorAll('.contactsForm') as NodeListOf<HTMLFormElement>;
const button = document.getElementById('getStarted') as HTMLButtonElement;
const modale = document.getElementById('modale') as HTMLElement;
const contentElements = document.querySelectorAll('.content') as NodeListOf<HTMLSpanElement>;
const selectLang = document.getElementById('lang') as HTMLSelectElement;
const topBtn = document.querySelector('.js-top_btn') as HTMLButtonElement;
const closeButton = document.querySelector('.js-btn-close') as HTMLButtonElement;
const navbarCollapse = document.querySelector('.navbar-collapse') as HTMLElement;
const elementsWithTrigger = document.querySelectorAll('[data-trigger]') as NodeListOf<HTMLElement>;
const scrollElements = document.querySelectorAll('.js-scroll') as NodeListOf<HTMLAnchorElement>;
const mainNavbar = document.getElementById('mainNavbar') as HTMLElement;
const mainNavbarWrapper = document.querySelector(".js-mainNavbar-wrapper") as HTMLElement;
const elements = document.querySelectorAll('.animation-hidden') as NodeListOf<HTMLElement>;


(function() {
    let windowHeight: number;

    function init() {
        windowHeight = window.innerHeight;
    }

    function checkPosition() {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            const positionFromTop = elements[i].getBoundingClientRect().top;

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

// Sticky Menu Add Class
window.addEventListener('scroll' , () => {
    const scroll = window.scrollY;

    if (scroll >= 95) mainNavbarWrapper?.classList.add('is-fixed');
    else mainNavbarWrapper?.classList.remove('is-fixed');
});

// Back to Top Jquery
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 300) {
        topBtn.style.display = 'block';
    } else {
        topBtn.style.display = 'none';
    }
});

topBtn.addEventListener('click', () => {
    const scrollDuration = 500;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    const scrollInterval = setInterval(function() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
        } else {
            clearInterval(scrollInterval);
        }
    }, 15);
});

// close button 
closeButton.addEventListener('click', (e) => {
    navbarCollapse.classList.remove('show');
    document.body.classList.remove('offcanvas-active');
});

// Trigger offcanvas menu
elementsWithTrigger.forEach(function(element) {
    element.addEventListener('click', () => {
        const triggerId = this.getAttribute('data-trigger');
        const triggerElement = document.querySelector(triggerId);

        if (triggerElement) {
            triggerElement.classList.toggle('show');
        }

        document.body.classList.toggle('offcanvas-active');
    });
});

// handle links with @href started with '#' only
// Obtener todos los elementos con la clase 'js-scroll'

// Agregar un evento click a cada elemento con la clase 'js-scroll'
scrollElements.forEach(function(element) {
    element.addEventListener('click', function(e) {
        const id = this.getAttribute('href') || '';
        const headerHt = mainNavbar.offsetHeight;
        const targetElement = document.querySelector(id) || null;
        
        if (!targetElement) {
            return;
        }

        e.preventDefault();

        const targetOffset = targetElement.getBoundingClientRect().top + window.scrollY;
        const pos = targetOffset - headerHt - 20;

        window.scrollTo({
            top: pos,
            behavior: 'smooth'
        });

        if (closeButton) {
            closeButton.click();
        }
    });
});


const i18n = {ES, EN, RU};

const setContent = (lang: string): void => {
    const elements = Array.from(contentElements);
    const content = i18n[lang];

    elements.forEach( element => {
        const data = element.getAttribute('data-text');
        const keys = data?.split('.');

        let temp = content;
        let value = "";

        keys?.forEach( key => {
            if (temp.hasOwnProperty(key)) {
                temp = temp[key];
            }
            if(typeof temp === 'string') {
                value = temp;
            }
        })

        element.innerText = value;
    })
}

Array.from(forms).map( form => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const buttonForm = form.querySelector('#buttonForm') as HTMLButtonElement;
        buttonForm.innerText = 'Loading ...'
        buttonForm.disabled = true;

        if (form?.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form?.classList.add('was-validated');
            buttonForm.innerText = 'Inquire Us'
            buttonForm.disabled = false;
            return false;
        }

        const formData = new FormData(form);

        const data = {
            name: formData.get('first_name'),
            last_name: formData.get('last_name'),
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message')
        }

        console.log(data); 

        fetch("https://formsubmit.co/ajax/ledmaggazin@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            form.reset();
            modale.classList.remove('activeModale');
            document.body.style.overflow = 'auto';
        })
        .catch(error => {
            alert(`Something went wrong\n${error.message}`)
        })
        .finally( () => {
            buttonForm.innerText = 'Inquire Us'
            buttonForm.disabled = false;
        });
    });
});

const closeModale = (event) => {
    if(!Array.from(event.target.classList).includes('modale')) return;
    modale.classList.toggle('activeModale');
    document.body.style.overflow = 'auto';
    modale.removeEventListener('click', closeModale);
}

const setListener = () => {
    modale.addEventListener('click', closeModale)
}

button.addEventListener('click', () => {
    modale.classList.toggle('activeModale');
    setListener();
    modale.style.top = `${window.scrollY}px`;
    console.log('modale.style.top',modale.style.top, 'scroll', window.scrollY)
    document.body.style.overflow = 'hidden';
})

const setContentByLang = () => {
    selectLang.addEventListener('change', (event: any) => {
        const lang = event.target.value;
        setContent(lang);
    })
}

setContentByLang();
