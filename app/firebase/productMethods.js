import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export async function addProduct(imageArray, title, price, location, description, productTags) {
  let nameArray = [];
  const currentUser = auth().currentUser;
  imageArray.forEach(async (file) => {
    const imageRef = storage().ref(`product/${file.fileName}`)
      await imageRef.putFile(profileImage.uri).catch(() => {
         throw ('image Uploading failed') 
        })
      
      const url = await imageRef.getDownloadURL().catch(() => { 
        throw ('images are not correctly uploaded')
       });
    nameArray.push(url)
  })

  console.log("nameArray:", nameArray)
  const db = firestore();
  await db.collection("products").add({
    uid: currentUser.uid,
    imageArray: Object.assign({ ...nameArray }),
    title: title,
    price: price,
    location: location,
    description: description,
    productTags: productTags,
    viewCount: 0,
    followCount: 0,
    rating: 0
  }).catch(() => { 
    throw ('Product not Added.')
 });
}

export async function getProducts() {
  let product = [];
  let snapshot = await firestore()
    .collection('products')
    .orderBy('rating', 'desc')
    .get().catch(() => { 
      throw ('Unknown error occurred.')
   });

  snapshot.forEach((doc) => {
    product.push({
      key: doc.id,
      uid: doc.data().uid,
      imageArray: Object.values(doc.data().imageArray),
      title: doc.data().title,
      price: doc.data().price,
      location: doc.data().location,
      description: doc.data().description,
      productTags: doc.data().productTags,
      viewCount: doc.data().viewCount,
      followCount: doc.data().followCount,
      rating: doc.data().rating
    });
  });
  return product
}