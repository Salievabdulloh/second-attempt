import { products } from './data.js'


export const getProduct = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const errorOccurred = false; 
      
            if (errorOccurred) {
              reject('Failed to fetch products'); 
            } else {
              resolve(products); 
            }
            
          }, 2000);
    }); 
}
