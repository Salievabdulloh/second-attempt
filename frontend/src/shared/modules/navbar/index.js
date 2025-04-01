window.addEventListener('DOMContentLoaded', () => {

    const navbar = document.querySelector('#nav');
    const callBackForm = document.querySelector('#popup-form');
    const nameInput = document.querySelector('.name-input');
    const mailInput = document.querySelector('.mail-input');
    const phoneInput = document.querySelector('.phone-input');
    const btnSubmit = document.querySelector('.popup-button')
    const popupSucceed = document.querySelector('.popup-succeed');
    const popupCloseBtn = document.querySelector('.popup-close-btn');
    const callbackPopup = document.querySelector('.callback-popup');

    const scrollControl = () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', scrollControl);


    const popupBackground = document.querySelector('.callback-popup-back');
    const closeIcon = document.querySelector('.close-icon');
    const callButton = document.querySelector('.call-button');
    const popupCallback = document.querySelector('.callback-popup');

    
    const popupToggle = (element) => {
        element.classList.toggle('d-none');
    }

    callButton.addEventListener('click', () => {
        setTimeout(() => {
            (function () {
                alert('Для закрытия окна можете воспользоваться клавишей Escape');
            })()
        }, 1000);
        popupToggle(popupBackground);
    });

    closeIcon.addEventListener('click', () => {
        popupToggle(popupBackground);
    });  

   
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            popupToggle(popupBackground);
        }
    })


    const localData = [];
    
    callBackForm.addEventListener('submit', (event) => {
        event.preventDefault();
        localData.push(nameInput);

        localData.push(nameInput, mailInput, phoneInput);

        localData.forEach(input => {
            if (input.classList.contains('name-input')) {
                localStorage.setItem('name', input.value);
            } else if (input.classList.contains('mail-input')) {
                localStorage.setItem('mail', input.value);
            } else {
                localStorage.setItem('phone', input.value);
            }
        })

        popupToggle(callbackPopup);

        popupToggle(popupSucceed);
         
    });

    popupCloseBtn.addEventListener('click', () => {
        popupToggle(popupBackground);
        popupToggle(popupCallback);
        popupToggle(popupSucceed);
    });

})