import {auth,db} from "./fbConfig";

export async function loginInWithEmailAndPassword(email,password){
    const token = await auth.signInWithEmailAndPassword(email,password);
    return(token.user)//.uid
}

export async function registerWithEmailAndPassword(name,email,password) {
    const res = await  auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await user.updateProfile({displayName:name})
    const addToRef = db.collection("Users").doc(user.uid);
    await addToRef.set({
        uid: user.uid,
        name,
        authProvider:"local",
        email,
  
    });
    return user
}

export async function sendPasswordReset(email){
    await auth.sendPasswordResetEmail(email);
}

export async function logout() {
     await auth.signOut();
  };

