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
				discount:item.data().discount,
            	stars:item.data().stars,
            })
        })
     return productsObj;
}
// change the long if statements to switch
export async function fetchOrders(uid){
    let productsObj = [];
    const userOrdersRef = db.collection("myContent").doc(uid).collection("orders")
    const data = await userOrdersRef.get();
	console.log(data.doc)
		 data.docs.forEach((item)=>{
			// const fullDate = item.data().createdAt.toDate();
			// var date = fullDate.getDate()+'-'+(fullDate.getMonth()+1)+'-'+fullDate.getFullYear();
				try{
					const fullDate = item.data().createdAt.toDate();
					var date = fullDate.getDate()+'-'+(fullDate.getMonth()+1)+'-'+fullDate.getFullYear();
					console.log(date)
				}catch(error){
					console.log(error)
				}
				productsObj.push({
					id:item.id,
					orderItems:item.data().orders,
					orderDate: date,
				})
			
		})
 	return productsObj;
}


export async function addOrder (productData,username,uid){
    const addToAllOrders = db.collection("Orders")
	const CartRemoveRef =  db.collection("myContent").doc(uid).collection("cart")
    const addToUserOrders = db.collection("myContent").doc(uid).collection("orders")
    let id;
    if (productData != null){
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const data = {
		Orders:{...productData,createdAt:timestamp},
		User: {  
	  	  userId:uid,
	   	  name:username
	    }
	};
        try{
            await addToAllOrders.add(data) 
			const res = await CartRemoveRef.get()
			res.forEach((element) => element.ref.delete())
            const response = await addToUserOrders.add({orders:productData,createdAt:timestamp})
            id = response.id;
        }catch (error) {
            alert(error)
        }
    }
   return id;
}



export async function handleCart (mode,productData,uid){
    const userCartRef = db.collection("myContent").doc(uid).collection("cart").doc(productData.productId)
    if(mode=="add"){
		if (productData != null){
			const timestamp = firebase.firestore.FieldValue.serverTimestamp();
			try{
				await userCartRef.set({cart:productData})
			}catch (error) {
				alert(error)
			}
		}
	} else if(mode=="delete"){
			try{
				await userCartRef.delete() 
			}catch (error) {
				alert(error)
			}
	}else if(mode=="updateQuantity"){
			try{
				await userCartRef.update({"cart.quantity":productData.quantity},) 
			}catch (error) {
				alert(error)
		}
	}else if(mode=="update"){
		try{
			await userCartRef.update({"cart":productData}) 
		}catch (error) {
			alert(error)
	}
	}	
}
export async function fetchCart(uid){
    let productsObj = [];
    const userOrdersRef = db.collection("myContent").doc(uid).collection("cart")
    const data = await userOrdersRef.get();
        data.docs.forEach((item)=>{
            productsObj.push({
                productId:item.id,
				quantity:item.data().cart.quantity,
            	price:item.data().cart.price,
            	size:item.data().cart.size,
				totalPrice:(item.data().cart.price)*(item.data().cart.quantity)
            })
        })
        
     return productsObj;
}

export async function handleFavorite (mode,productData,uid){
	const favoritesRef = db.collection("myContent").doc(uid).collection("favorite").doc(productData.productId);
	if (mode == "add"){
		if (productData != null){
			const timestamp = firebase.firestore.FieldValue.serverTimestamp();
			try{
				await favoritesRef.set({favorite:productData})
			}catch (error) {
				alert(error)
			}
		}
	}else{
			try{
				await favoritesRef.delete() 
			}catch (error) {
				alert(error)
			}
	}
	
}
export async function fetchFavorite(uid){
    let productsObj = [];
    const userOrdersRef = db.collection("myContent").doc(uid).collection("favorite")
    const data = await userOrdersRef.get();
        data.docs.forEach((item)=>{
            productsObj.push({
                productId:item.id,
            })
        })
     return productsObj;
}

export async function addAddress (uid,data){
	const addressRef = db.collection("Users").doc(uid);
	
	if (data != null){
		try{
			await addressRef.update({"Address":data})
		}catch (error) {
			alert(error)
		}
	}
}

export async function FetchUserInfo (uid){
	const addressRef = db.collection("Users").doc(uid);
	
    const addressData = await addressRef.get();
	let userInformation={
		address : addressData.data().Address,
		username : addressData.data().name,
		email : addressData.data().email
	}
        
     return userInformation;
}

// export async function addProducts (productData){
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
// 			discount:productData.discount,
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
