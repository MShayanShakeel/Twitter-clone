import React, { useEffect, useState } from "react";
import { BiSolidHome } from "react-icons/bi";
import { FaTwitter, FaUserFriends, FaStreetView ,FaSearch } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoMdSettings } from "react-icons/io";
import "./Menu.css";
import { MdMoreHoriz } from "react-icons/md";
import { Modal } from "react-bootstrap";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../Firebase";
import { useAuth } from "../../DataContext";
import { Link } from "react-router-dom";
import ShowDataModal from "./ShowDataModal";

const Menu = () => {
  const { userID  } = useAuth();

  // SHOW UPDATE MODEL CODE STATES AND FUNCTIONS
  const [showUpdateModel, setShoUpdateModel] = useState(false);
  const handleClose = () => setShoUpdateModel(false);
  const handleShow = () => setShoUpdateModel(true);

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");

  

  // const [getData, setGetData] = useState({});
  // const [getAllData, setGetAllData] = useState({});

  const [userAllData, setUserAllData] = useState([]);

  // GET ALL DATA API

 


  // GET SINGLE DATA API

  // const docRef = doc(db, "users", "B4t7bh7brEZYFaaBeqTIgNLmuos1");
  // getDoc(docRef).then((doc) => {
  //   console.log(doc?.data(), doc?.id, "shay");
  // });

  const updateUserProfile = async (userId, updatedData) => {
    const userDocRef = doc(db, "users", userId);

    try {
      await updateDoc(userDocRef, updatedData);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error.message);
    }
  };

  // Update the first user's email
  useEffect(() => {
    userAllData.forEach((user) => {
      if (user.id === userID?.uid) {
        const userIdToUpdate = user.id;
        const updatedUserData = {
          UserData: {
            fullName,
            userName,
            email,
            contact,
          },
        };
        updateUserProfile(userIdToUpdate, updatedUserData);
      }
    });
  }, [userAllData, userID?.uid, fullName, userName, email, contact]);

  

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  console.log(userID?.fullName, "userID");
  console.log(userID?.displayName, "USERNAME");
  console.log(userID?.email, "USEREMAIL");

  return (
    <>
      {/*START UPDATE MODEL FORM  */}
      <Modal show={showUpdateModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Your Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={updateUserProfile}>
            <div class="form-group">
              <label for="exampleInputEmail1">Enter FullName </label>
              <input
                type="text"
                class="form-control"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter Name"
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Enter User Name</label>
              <input
                type="text"
                class="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter User Name"
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Enter Email</label>
              <input
                type="email"
                class="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Emai;"
              />
            </div>

            <div class="form-group">
              <label for="exampleInputPassword1">Contact</label>
              <input
                type="text"
                class="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Enter Phone No"
              />
            </div>

            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        </Modal.Footer>
      </Modal>

      {/* END UPDATE MODEL FORM  */}

      <div className="main-menu-bar">
        <div className="row">
          <div className="col-12">
            <div class="container">
              <div className="Profile-Picture">
                <img
                  className="Profile-image-sec"
                  width={50}
                  height={50}
                  src="https://marketplace.canva.com/EAFuJ5pCLLM/1/0/1600w/canva-black-and-gold-simple-business-man-linkedin-profile-picture-BM_NPo97JwE.jpg"
                  alt="Profile-picture"
                />
                <h4 className="Profile-image-sec Profile-text">
                  {userID?.fullName}
                </h4>

                <MdMoreHoriz
                  onClick={handleShow}
                  style={{
                    position: "absolute ",
                    right: "5",
                    marginLeft: "0.5rem",
                    // marginRight:"o.5rem",
                    marginTop: "0.5rem",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div className="All-sections">
                <ul>
                  <li className="List-item">
                    <BiSolidHome style={{ marginRight: "10px" }} />
                    Home
                  </li>
                  <li className="List-item">
                    <FaTwitter style={{ marginRight: "10px" }} />
                    Your Tweet
                  </li>
                  <li className="List-item">
                  <Link to="/showdata" style={{ textDecoration: "none" , color: "black"
                 }}>
                    <FaSearch style={{ marginRight: "10px" }} />
                    Search
                  </Link>
                  </li>
                  
                  <li className="List-item">
                    <AiFillLike style={{ marginRight: "10px" }} />
                    Likes
                  </li>
                  <li className="List-item">
                    <FaUserFriends style={{ marginRight: "10px" }} />
                    Friends
                  </li>
                  <li className="List-item">
                    <IoMdSettings style={{ marginRight: "10px" }} />
                    Settings
                  </li>
                  
                </ul>
              </div>
              <div className="Post-button">
                <button
                  type="button"
                  class="btn btn-primary Post-button-btn"
                >
                  Post
                </button>
              </div>
              {/* <ShowDataModal
                userAllData={userAllData}
                showModal={showModal}
                handleClose={handleCloseModal}
              /> */}

              <div className="Menu-Footer-section">
                {" "}
                <img
                  className="Profile-image-sec"
                  width={50}
                  height={50}
                  src="https://marketplace.canva.com/EAFuJ5pCLLM/1/0/1600w/canva-black-and-gold-simple-business-man-linkedin-profile-picture-BM_NPo97JwE.jpg"
                  alt="Profile-picture"
                  style={{ marginLeft: "-9rem" }}
                />
                {userID?.email}
                <MdMoreHoriz
                  style={{ position: "absolute", right: "5", fontSize: "2rem" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
