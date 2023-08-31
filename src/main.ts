const formWrapp = document.querySelectorAll('.contactsFormWrapper') as NodeListOf<HTMLElement>;
const forms = document.querySelectorAll('.contactsForm') as NodeListOf<HTMLFormElement>;
const button = document.getElementById('getStarted') as HTMLButtonElement;
const modale = document.getElementById('modale') as HTMLElement;
const contentElements = document.querySelectorAll('.content') as NodeListOf<HTMLSpanElement>;
const selectLang = document.getElementById('lang') as HTMLSelectElement;

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
