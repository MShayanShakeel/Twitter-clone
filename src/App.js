import { useEffect } from "react";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import ShowAlldata from "./Components/Menu/ShowDataModal";
import { AuthProvider, useAuth } from "./DataContext";
import Login from "./Pages/Home/Login/Login";
import Signup from "./Pages/Home/Signup/Signup";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, txtDB } from "./Firebase";
import { collection, getDocs, getFirestore } from "firebase/firestore";

function App() {
  const authUser = auth;
  const {userID,signIn} = useAuth();
  // const db = getFirestore();

  useEffect(() => {
    const currentUser = async () => {
      onAuthStateChanged(authUser, (user) => {
        if (user) {
          const colRef = collection(txtDB, "users");
          getDocs(colRef)
            .then((snapshot) => {
              // let usersData = [];
              snapshot.docs.forEach((doc) => {
                // console.log(doc.data(),doc.id)
                // console.log(doc);
                const data = doc.data();
                const id = doc.id
                data.id = id
                const userUid = data?.UserData ? data.UserData.uid : data.uid;
                if (userUid === user.uid) {
                  // console.log(data);
                  signIn(data)

                }
                // usersData.push({ ...doc.data(), id: doc.id });
              });
              // setUserAllData(usersData);
            })
            .catch((err) => {
              console.log(err.message);
            });
          // console.log(user);
        } else {
          console.log("userr not logged in");
        }
      });
    };

    currentUser();
  }, []);
  return (
    <>
      {/* <AuthProvider> */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/showdata" element={<ShowAlldata />} />
          </Routes>
        </BrowserRouter>
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
