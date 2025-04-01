import { getProduct } from "./api.js"


window.addEventListener('DOMContentLoaded', () => {

    const showProducts = async () => {

        try {
            const shopContainer = document.querySelector('.shop-container');
            const pagination = document.querySelector('.pagination');
            const productCount2 = document.querySelector('#product-count2');
            const productList = document.querySelector('#products');
            const loadingMessage = document.querySelector('#loading-message');
            loadingMessage.style.display = 'block';

            const filterButtons = document.querySelectorAll('.filter-btn');


            filterButtons.forEach(button => {

                button.addEventListener('focus', () => {
                    filterButtons.forEach(btn => btn.classList.remove('btn-actived'));
                    button.classList.add('btn-actived');
                });

                button.addEventListener('click', async (event) => {
                    filterButtons.forEach(btn => btn.classList.remove('btn-actived'));
                    event.target.classList.add('btn-actived');

                    const category = event.target.dataset.category;

                    await loadProducts(category);
                });

                button.addEventListener('keydown', async (event) => {
                    if (event.key === 'Tab') {
                        filterButtons.forEach(btn => btn.classList.remove('btn-actived'));
                        button.classList.add('btn-actived');

                        const category = button.dataset.category;

                        await loadProducts(category);
                    }
                });

            });


            async function loadProducts(category) {
                productList.innerHTML = '';

                const products = await getProduct();

                const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);

                document.addEventListener('keydown', (event) => {
                    if (event.key === 'Tab') {
                        const focusedButton = document.activeElement;
                        console.log('Текущая кнопка: ', focusedButton.textContent);
                    }

                });



                filteredProducts.forEach(element => {
                    const productContent = document.createElement('div');
                    productContent.classList.add('product-content');

                    const imageContent = document.createElement('div');
                    imageContent.classList.add('image-content');

                    const oneItemLink = document.createElement('a');
                    oneItemLink.classList.add('image-link');
                    oneItemLink.href = `../public/one-item.html?id=${element.id}`;
                    

                    const arrowRight = document.createElement('img');
                    arrowRight.src = '../src/shared/icons/arrow-right.svg';
                    arrowRight.classList.add('arrow');

                    const productImg = document.createElement('img');
                    productImg.classList.add('product-img');
                    productImg.src = element.img;

                    const productName = document.createElement('p');
                    productName.classList.add('product-name');
                    productName.textContent = element.name;

                    const productPrice = document.createElement('p');
                    productPrice.classList.add('product-price');
                    productPrice.textContent = `$${element.price}`;


                    oneItemLink.append(productImg, arrowRight);
                    imageContent.append(oneItemLink);
                    productContent.append(imageContent, productName, productPrice);
                    productList.append(productContent);
                });
            }




            const products = await getProduct();


            products.forEach(element => {
                const productContent = document.createElement('div');
                productContent.classList.add('product-content');

                const imageContent = document.createElement('div');
                imageContent.classList.add('image-content');

                const oneItemLink = document.createElement('a');
                oneItemLink.classList.add('image-link');
                oneItemLink.href = `../public/one-item.html?id=${element.id}`;
                

                const arrowRight = document.createElement('img');
                arrowRight.src = '../src/shared/icons/arrow-right.svg';
                arrowRight.classList.add('arrow');


                const productImg = document.createElement('img');
                productImg.classList.add('product-img');
                productImg.src = element.img;

                const productName = document.createElement('p');
                productName.classList.add('product-name');
                productName.textContent = element.name;

                const productPrice = document.createElement('p');
                productPrice.classList.add('product-price');
                productPrice.textContent = `$${element.price}`;


                oneItemLink.append(productImg, arrowRight);
                imageContent.append(oneItemLink);
                productContent.append(imageContent, productName, productPrice);
                productList.append(productContent);
                loadingMessage.style.display = 'none';


            });

            shopContainer.append(productList, productCount2, pagination);


        } catch (e) {
            console.error(e)
        }
    }

    showProducts();
})    
