import { getmyPro } from "./api.js";

console.log(document.querySelector('#one-item'));

window.addEventListener('DOMContentLoaded', () => {
    const products = async () => {
        try {

            const cartCount = document.querySelector('.count-cart');
            const products = await getmyPro();

            const productId = new URLSearchParams(window.location.search).get('id');
            if (!productId) {
                return console.error('товара нет');
            }

            const product = products.find(item => item.id === parseInt(productId));

            if (!product) {
                return console.error('товара тоже нет');
            }

            const detailContent = document.getElementById('detail-content');
            detailContent.innerHTML = `
                <h2 class="item-name">${product.name}</h2>
                <div class="item-links">
                    <a href="../public/home.html" class="item-link">Главная</a>
                    <div class="line"></div>
                    <a href="../public/shop.html" class="item-link">Магазин</a>
                    <div class="line"></div>
                    <a href="#" class="item-link current-name">${product.name}</a>
                </div>

                <div class="product-content">
                <img class="product-img-item" src="${product.img}" alt="${product.name}">

                <div class="form-content">
                <span class="current-price">$${product.price}</span> <span class="prev-price">$450</span>
                    <form id="product-form">


                <p class="size">Выберите размер</p>
                <div class="select-size">
                    <button type="button" class="size-btn size-selected" data-size="S">S</button>
                    <button type="button" class="size-btn" data-size="M">M</button>
                    <button type="button" class="size-btn" data-size="L">L</button>
                    <button type="button" class="size-btn" data-size="XL">XL</button>
                    <button type="button" class="size-btn" data-size="XXL">XXL</button>

                </div>
                
                
                <p class="color">Выберите цвет</p>
                <div class="select-color">
                    <button type="button" class="color-btn brown"></button>
                    <button type="button" class="color-btn grey"></button>
                    <button type="button" class="color-btn pink"></button>
                    <button type="button" class="color-btn yellow"></button>
                </div>
    
                <div class="quantity-content">
                <input type="text" id="quantity" min="1" value="1">
                <button type="submit" class="btn-add-cart">Добавить в корзину</button>
                </div>
            </form>
                </div>
                </div>
                
                <section class="binded-products">
                    <h2 class="binded-text">Связанные товары</h2>

                    <div class="similar-products">                    
                    <div class="binded-content">
                        <div class="image-content">
                        <a href="../public/one-item.html?id=${product.id}">
                        <img class="arrow" src="../src/shared/icons/arrow-right.svg"/>
                        <img class="product-img" src="../src/shared/images/footbolka.png">            
                        </a>
                        </div>
                        <p class="product-name">Футболка USA</p>
                        <p class="product-price">$129</p>
                    </div>

                    <div class="binded-content">
                        <div class="image-content">
                        <a href="../public/one-item.html?id=${product.id}">
                        <img class="arrow" src="../src/shared/icons/arrow-right.svg"/>
                        <img class="product-img" src="../src/shared/images/cupalnick.png">            
                        </a>
                        </div>
                        <p class="product-name">Купальник Glow</p>
                        <p class="product-price">$129</p>
                    </div>
                    </div>

                </section>
                `;


            const sizeBtns = document.querySelectorAll('.size-btn');
            let currentPrice = document.querySelector('.current-price');
            const sizeButtons = document.querySelectorAll('[data-size]');

            

            let prodPrice = product.price;
            sizeBtns.forEach(btn => {
                
                btn.addEventListener('click', () => {
                    if (btn.dataset.size === 'S') {
                        currentPrice.textContent = `$129`;
                    } else if (btn.dataset.size === 'M') {
                        currentPrice.textContent = `$${prodPrice+100}`;
                    } else if (btn.dataset.size === 'L') {
                        currentPrice.textContent = `$${prodPrice+200}`;
                    } else if (btn.dataset.size === 'XL') {
                        currentPrice.textContent = `$${prodPrice+300}`;
                    } else if (btn.dataset.size === 'XXL') {
                        currentPrice.textContent = `$${prodPrice+400}`;
                    }
                    sizeBtns.forEach(button => button.classList.remove('size-selected'));
                    btn.classList.add('size-selected');
                });
            });


            const colorBtns = document.querySelectorAll('.color-btn');
            colorBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const productImg = document.querySelector('.product-img-item');

                    if (btn.classList.contains('brown')) {
                        productImg.style.filter = 'sepia(100%)';
                    } else if (btn.classList.contains('grey')) {
                        productImg.style.filter = 'grayscale(100%)';
                    } else if (btn.classList.contains('pink')) {
                        productImg.style.filter = 'hue-rotate(270deg)';
                    } else if (btn.classList.contains('yellow')) {
                        productImg.style.filter = 'sepia(100%) saturate(100%)';
                    }

                    colorBtns.forEach(button => button.classList.remove('selected-color'));
                    btn.classList.add('selected-color');
                });
            });


            let count = 0;
            const form = document.getElementById('product-form');
            form.addEventListener('submit', (event) => {
                event.preventDefault();

                const popupitemBack = document.querySelector('.popup-back-item');
                const itemClose = document.querySelector('.item-close');
                const selectedSize = document.querySelector('.size-selected');
                const selectedColor = document.querySelector('.selected-color');
                const quantity = document.getElementById('quantity').value;

                if (!selectedSize) {
                    alert('Пожалуйста, выберите размер.');
                    return;
                }

                if (!selectedColor) {
                    alert('Пожалуйста, выберите цвет.');
                    return;
                }

                if (quantity < 1 || isNaN(quantity)) {
                    alert('Пожалуйста, укажите правильное количество.');
                    return;
                }

                popupitemBack.classList.remove('d-none');
                ++count;
                cartCount.textContent = count;
                cartCount.classList.remove('d-none');
                itemClose.addEventListener('click', () => {
                    popupitemBack.classList.add('d-none');
                })

                const cartItem = {
                    id: product.id,
                    name: product.name,
                    size: selectedSize.dataset.size,
                    color: selectedColor.classList[0],
                    quantity,
                    price: currentPrice.textContent,
                };

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push(cartItem);
                localStorage.setItem('cart', JSON.stringify(cart));
            });


        } catch (e) {
            console.error(e)
        }
    }


    products();
})
