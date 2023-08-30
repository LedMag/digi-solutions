const formWrapp = document.querySelectorAll('.contactsFormWrapper') as NodeListOf<HTMLElement>;
const forms = document.querySelectorAll('.contactsForm') as NodeListOf<HTMLFormElement>;
const button = document.getElementById('getStarted') as HTMLButtonElement;
const buttonFrom = document.getElementById('buttonFrom') as HTMLButtonElement;
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

        buttonFrom.innerText = 'Loading ...'
        buttonFrom.disabled = true;

        if (form?.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            form?.classList.add('was-validated');
            buttonFrom.innerText = 'Inquire Us'
            buttonFrom.disabled = false;
            return false;
        }

        const formData = new FormData(form);

        const data = {
            user: `${formData.get('first_name')} ${formData.get('last_name')}`,
            phone: formData.get('phone'),
            email: formData.get('email'),
            message: formData.get('message')
        }

        console.log(data); 

        modale.classList.toggle('activeModale');

        form.reset();
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
