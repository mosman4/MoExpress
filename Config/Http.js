import { firebase,db } from "./fbConfig";
export async function fetchProducts(){
        let productsObj = [];
        const response = db.collection("Products")
        const data = await response.get();
        data.docs.forEach((item)=>{
            productsObj.push({
                id:item.id,
                title:item.data().title,
            	categoryIds:item.data().categoryIds,
            	description:item.data().description,
            	header:item.data().header,
            	imageUrl:item.data().imageUrl,
            	price:item.data().price,
            	size:item.data().size,
            	stars:item.data().stars,
            })
        })
        
      return productsObj;
}

export async function addOrder (productData){
    const addToRef = firebase.firestore().collection("Orders")
    let id;
    if (productData != null){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
	Cart:productData,
	User: {  
	    userId:"Mkbhd",
	    name:"Mohamed"
	    }
	};

        try{
            const response = await addToRef.add(data) 
            id = response.id;
        }catch (error) {
            alert(error)
        }
    }
   return id;
}




// export function addProduct (productData){
//     const addToRef = firebase.firestore().collection("Products")

//     if (productData != null){
//         const timestamp = firebase.firestore.FieldValue.serverTimestamp();
//         const data = {
//             title:productData.title,
//             categoryIds:productData.categoryIds,
//             description:productData.description,
//             header:productData.header,
//             imageUrl:productData.imageUrl,
//             price:productData.price,
//             size:productData.size,
//             stars:productData.stars,
//             createdAt:timestamp
//         };
//         addToRef
//                 .add(data)
//                 .then(() => {
//                     console.log("Product was sent")
//                 })
//                 .catch((error) => {
//                     alert(error)
//          })
//     }
// }
