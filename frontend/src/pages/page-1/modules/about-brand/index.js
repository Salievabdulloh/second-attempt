import { getProduct } from "./api.js"


const showProducts = async () => {
    try {
        const products = await getProduct();
        const productList = document.getElementById('');

        products.forEach(element => {
            const h1 = document.createElement('h1');
            h1.textContent = element.name;
            productList.append(h1)
        });

    } catch (e) {
        console.error(e)
    }
}

showProducts();

