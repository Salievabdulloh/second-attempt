const loadPartial = (elementId, partialFile) => {
    fetch(partialFile)
        .then(response => response.text())
        // .then(data => document.getElementById(elementId).innerHTML = data)
        .then(data => {
            const element = document.getElementById(elementId);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Элемент с id "${elementId}" не найден`);
            }
        })
        .catch(error => console.error('Ошибка загрузки partial:', error));
}

loadPartial('navbar', '../src/shared/modules/navbar/ui.html');
loadPartial("main", "../src/pages/home/modules/product-list/ui.html");

loadPartial('product-list', '../src/pages/shop/modules/product-list/ui.html');

loadPartial('one-item', '../src/pages/one-item/modules/item-info/ui.html');

loadPartial('about-brand', '../src/pages/page-1/modules/about-brand/ui.html');
loadPartial('contacts', '../src/pages/page-2/modules/contacts/ui.html');

loadPartial('footer', '../src/shared/modules/footer/ui.html');

