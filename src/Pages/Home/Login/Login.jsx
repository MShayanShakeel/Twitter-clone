import React, { useState } from "react";
import "../Signup/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../../Firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../DataContext";

const Login = () => {

  const { signIn, userID } = useAuth();  

  //navitag hook
  const navigate = useNavigate();
  // Singup Section State
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  // ERROR MESSAGE STATE
  const [errorMessage, setErrorMessage] = useState("");

  //REGISTER DISABLE BUTTON
  const [disableButton, setDisableButton] = useState(false);

  const handlesubmit = () => {
    if (!email || !passWord) {
      setErrorMessage("Please Fill all fields");
      return;
    }
    setErrorMessage("");
    setDisableButton(true);
    signInWithEmailAndPassword(auth, email, passWord)
      .then((res) => {
        console.log(res)
        signIn(res.user); 
        navigate("/layout");
      })
      .catch((err) => {
        console.log(err);
        setDisableButton(false);
      });
  };
  
  console.log(userID , "12345656")
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
                    <h2 className="text-uppercase text-center mb-3">Sign IN</h2>

                    <form>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example3cg">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example4cg">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={(e) => setPassWord(e.target.value)}
                        />
                      </div>

                      <b>{errorMessage}</b>
                      <div className="d-flex justify-content-center">
                        {/* <Link to="/layout"> */}
                          <button
                            type="button"
                            className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                            onClick={handlesubmit}
                            disabled={disableButton}
                          >
                            Register
                          </button>
                        {/* </Link> */}
                      </div>
                      <p className="text-center text-muted mt-3 mb-0">
                        Create an account{" "}
                        <Link to="/signup" className="fw-bold text-body">
                          <u>Click here</u>
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

export default Login;
