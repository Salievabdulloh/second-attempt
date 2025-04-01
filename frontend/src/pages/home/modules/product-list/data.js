
let contenerProducts = document.querySelector(".product")

function getDate(data){
    data.slice(0,3).forEach((el)=>{
            const div = document.createElement("div")
        const img = document.createElement("img")
        img.src = el.img

        const div1 = document.createElement("div")
        div1.classList.add("content1")
        div.classList.add("context")

        const button = document.createElement("button")
        button.innerHTML ="&ShortRightArrow;"

        button.classList.add("to-link")

        const nameProducts = document.createElement("h2")
        nameProducts.innerHTML = el.name
        
        const priceProducts = document.createElement("p")
        priceProducts.innerHTML = el.price+"$"

        div1.appendChild(button)

        div.append(img,nameProducts,priceProducts,div1)
        contenerProducts.appendChild(div)
    })
}
export default getDate