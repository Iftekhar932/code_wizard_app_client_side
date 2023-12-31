import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GithubAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import app from "../../Firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth(app);

export const AuthContext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  // const [theme,setTheme] = useState('dark')

  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };
  const githubSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const emailSignUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const emailVerificationMail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const pwdResetLinkMail = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const emailLogIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const collectName = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const logOut = () => {
    console.log("logged Out");
    return signOut(auth);
  };

  const userDeletion = () => {
    deleteUser(user);
  };

  const reAuthentication = (email, password) => {
    const credential = EmailAuthProvider.credential(email, password);
    return reauthenticateWithCredential(user, credential);
  };

  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
    };
    return () => unSubscribe();
  }, []);

  const authInfo = {
    googleSignIn,
    githubSignIn,
    emailSignUp,
    emailLogIn,
    emailVerificationMail,
    pwdResetLinkMail,
    collectName,
    logOut,
    userDeletion,
    reAuthentication,
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default UserContext;
