import getDate from "./data.js"

let api = "http://localhost:3000/data"


async function get(){
    try {
        let {data} = await axios.get(api)
        getDate(data)
    } catch (error) {
        console.error(error);
    }
}
export {get}