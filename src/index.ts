const formWrapp = document.querySelectorAll('.contactsFormWrapper') as NodeListOf<HTMLElement>;
const forms = document.querySelectorAll('.contactsForm') as NodeListOf<HTMLFormElement>;
const button = document.getElementById('getStarted') as HTMLButtonElement;
const buttonFrom = document.getElementById('buttonFrom') as HTMLButtonElement;
const modale = document.getElementById('modale') as HTMLElement;

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

        modale.classList.toggle('active');

        form.reset();
    });
});

const closeModale = (event) => {
    if(!Array.from(event.target.classList).includes('modale')) return;
    modale.classList.toggle('active');
    document.body.style.overflow = 'auto';
    modale.removeEventListener('click', closeModale);
}

const setListener = () => {
    modale.addEventListener('click', closeModale)
}

button.addEventListener('click', () => {
    modale.classList.toggle('active');
    setListener();
    document.body.style.overflow = 'hidden';
})
