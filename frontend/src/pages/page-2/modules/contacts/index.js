window.addEventListener('DOMContentLoaded', () => {

    setTimeout(() => {
        const btn1 = document.querySelector('#button1');
        const btn2 = document.querySelector('.sent');


        btn1.addEventListener('click', function () {
            console.log('clicked');

            btn1.style.display = 'none';
            btn2.style.display = 'block';
        });


    }, 2000);

});