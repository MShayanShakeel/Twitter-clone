import React, { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// import { useUserdetails } from "../../../useContext";

const Signup = () => {



  //navitag hook
  const navigate = useNavigate();
  // Singup Section State
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [passWord, setPassWord] = useState("");
  // const [profilePicture, setProfilePicture] = useState();


  // ERROR MESSAGE STATE
  const [errorMessage, setErrorMessage] = useState("");

  //REGISTER DISABLE BUTTON
  const [disableButton, setDisableButton] = useState(false);

  const handlesubmit = async () => {
    if (!fullName || !userName || !email || !contact || !passWord) {
      setErrorMessage("Please Fill all fields");
      return;
    }

    setErrorMessage("");
    setDisableButton(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, passWord);
      console.log(res);
      setErrorMessage(res.message);
      setDisableButton(false);

      const user = res.user;

      // Update user profile in Authentication
      await updateProfile(user, {
        displayName: fullName,
      });

      await updateProfile(user, {
        photoURL: "",
      });
      // const UserData = {
      //    uid: user.uid,
      //   fullName: fullName,
      //   userName: userName,
      //   email: email,
      //   contact: contact,
      // }
      // Update user Data in Firestore
      const db = getFirestore();
      const usersCollection = collection(db, "users");

      await  addDoc(usersCollection, {
        uid: user.uid,
        fullName: fullName,
        userName: userName,
        email: email,
        contact: contact,
        // profilePicture : profilePicture,
      });
      console.log(usersCollection , "usersCollection")
      navigate("/");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.message);
      setDisableButton(false);
    }
  };

  // console.log(profilePicture, "profilePicture")
 
  return (
    <>
      <section
        className="vh-100 bg-image"
        style={{
          backgroundImage:
            "url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp')",
        }}
      >
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-95">
            <div className="row d-flex justify-content-center align-items-center h-95">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div
                  className="card"
                  style={{ borderRadius: "15px", width: "100%" }}
                >
                  <div className="card-body">
                    <h2 className="text-uppercase text-center mb-3">
                      Create an account
                    </h2>

                    <form>

                    {/* <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4cdg">
                          Upload picture
                        </label>
                        <input
                          type="file"
                          accept=".png, .svg, .jpg"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          onChange={(e) => setProfilePicture(e.target.files[0])}
                        />
                      </div> */}

                      
                      <label className="form-label" for="form3Example1cg">
                        Full Name
                      </label>
                      <div className="form-outline mb-3">
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example3cg">
                          User Name
                        </label>
                        <input
                          type="text"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4cg">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4cdg">
                          Contact # No
                        </label>
                        <input
                          type="text"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          onChange={(e) => setContact(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-3">
                        <label className="form-label" for="form3Example4cdg">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example4cdg"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassWord(e.target.value)}
                        />
                      </div>

                      <b>{errorMessage}</b>
                      <div className="d-flex justify-content-center">
                        {/* <Link to="/layout"> */}
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg gradient-custom-4 text-body register-button"
                          onClick={handlesubmit}
                          disabled={disableButton}
                        >
                          Register
                        </button>
                        {/* </Link> */}
                      </div>
                      <p className="text-center text-muted mt-3 mb-0">
                        Have already an account?{" "}
                        <Link to="/" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;

