import {
  collection,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./Menu.css";
import { useAuth } from "../../DataContext";

const ShowDataModal = () => {
  const { userID } = useAuth();

  const [userAllData, setUserAllData] = useState([]);
  const [userFollowingList, setUserFollowingList] = useState({});


  

  const db = getFirestore();

  useEffect(() => {
    const colRef = collection(db, "users");
    getDocs(colRef)
      .then((snapshot) => {
        let usersData = [];
        snapshot.docs.forEach((doc) => {
          // console.log(doc.data(),doc.id)
          usersData.push({ ...doc.data(), id: doc.id });
        });
        setUserAllData(usersData);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getFollowerStatus = (userUid) => userFollowingList[userUid] || false;

  const handleFollow = async (userData) => {
    const userUid = userData?.UserData ? userData.UserData.uid : userData.uid;
    const currentUserUid = userID?.UserData ? userID.UserData.id : userID.id;

    // const isFollowing = userID?.followers?.includes(userUid)
    const isFollowing = getFollowerStatus(userUid);
    try {
      if (!isFollowing) {
        const userDocRef = doc(db, "users", currentUserUid);
        await updateDoc(userDocRef, { followers: arrayUnion(userUid) });
        setUserFollowingList((prevState) => !prevState);
        setUserFollowingList((prev) => ({ ...prev, [userUid]: true }));
        console.log("Follow successful");
      } else {
        const userDocRef = doc(db, "users", currentUserUid);
        await updateDoc(userDocRef, { followers: arrayRemove(userUid) });
        setUserFollowingList((prev) => ({ ...prev, [userUid]: false }));
        console.log("Unfollowing Successfully");
      }
    } catch (err) {
      alert(err.message);
      console.error("Error updating followers:", err.message);
    }
  };

  return (
    <div>
      <div className="container">
        {userAllData.map((user, index) => (
          <div key={index}>
            <div className="main-contact">
              <div>
                <strong>Contact:</strong>{" "}
                {user.UserData
                  ? user.UserData.contact || "N/A"
                  : user.contact || "N/A"}
                <br />
                <strong>Email:</strong>{" "}
                {user.UserData
                  ? user.UserData.email || "N/A"
                  : user.email || "N/A"}
                <br />
                <strong>Full Name:</strong>{" "}
                {user.UserData
                  ? user.UserData.fullName || "N/A"
                  : user.fullName || "N/A"}
                <br />
                <strong>User Name:</strong>{" "}
                {user.UserData
                  ? user.UserData.userName || "N/A"
                  : user.userName || "N/A"}
              </div>
              <div>
                <button
                  onClick={() => handleFollow(user)}
                  type="button"
                  className="btn btn-primary"
                >
                  {getFollowerStatus(user?.uid) ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
            <hr />
          </div>
        ))}
        <Modal.Footer>
          <Button variant="secondary">Close</Button>
        </Modal.Footer>
      </div>
    </div>
  );
};

export default ShowDataModal;

// import { Firestore, collection, getDocs, getFirestore } from "firebase/firestore";
// import React, { useEffect, useState } from "react";
// import { Modal, Button } from "react-bootstrap";
// import "./Menu.css";
// import App from './../../App';

// const ShowDataModal = () => {
//   const [userAllData, setUserAllData] = useState([]);
//   const [userFollowingList , setUserFollowingList] = useState([]);

//   // init service
//   const db = getFirestore();

//   // Get data
//   useEffect(() => {
//     //  collection refference
//     const colRef = collection(db, "users");
//     getDocs(colRef)
//       .then((snapshot) => {
//         let Userss = [];
//         snapshot.docs.forEach((doc) => {
//           Userss.push({ ...doc.data(), id: doc.id });
//           setUserAllData(Userss);
//         });
//         console.log(Userss, "Usersss");
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });
//   }, []);

//   console.log(userAllData?.id , "userAllData?.uid")

//   // const store = Firestore();

//   const userId = userAllData?.id ;

//   const getFollowers = followers => {
//     let followStatue = false;
//     followers.forEach(item => {
//       if (item === userId) {
//         followStatue = true;
//       }
//     });
//     return followStatue;
//   };

//   // FOLLOWER FUNCATION

//   const handlefollow = () => {
//     let tempfollow = userAllData.followers || []; // Initialize to an empty array if undefined
//     if (tempfollow.length > 0) {
//       tempfollow.forEach(item1 => {
//         if (item1 === userId) {
//           let index = tempfollow.indexOf(userId);
//           if (index > -1) {
//             tempfollow.splice(index, 1);
//           }
//         } else {
//           tempfollow.push(userId);
//         }
//       });
//     } else {
//       tempfollow.push(userId);
//     }
//     Firestore().collection('users').doc(userAllData?.id).update({
//       followers: tempfollow,
//     }).then((res) => {
//       console.log(res);
//     }).catch((err) => {
//       console.log(err);
//     });
//     setUserFollowingList(!userFollowingList);
//   };

//   return (
//     <div>
//       <div className="container">
//         <table>
//           <thead>User Data</thead>
//         </table>
//         <tr style={{ display: "flex", flexDirection: "column" }}>
//           {userAllData.map((user, index) => (
//             <div key={index}>
//               {/* <strong>User ID:</strong> {user.id} */}
//               <br />
//               {user.UserData ? (
//                 <>
//                   <div className="main-contact">
//                     <div>
//                       <strong>Contact:</strong> {user.UserData.contact || "N/A"}
//                       <br />
//                       <strong>Email:</strong> {user.UserData.email || "N/A"}
//                       <br />
//                       <strong>Full Name:</strong>{" "}
//                       {user.UserData.fullName || "N/A"}
//                       <br />
//                       <strong>User Name:</strong>{" "}
//                       {user.UserData.userName || "N/A"}
//                     </div>
//                     <div>
//                     <button onClick={() => handlefollow()} type="button" class="btn btn-primary"> {(user.UserData.followers) ? 'Unfollow' : 'Follow' }</button>
//                     </div>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <div className="main-contact">
//                     <div>
//                       <strong>Contact:</strong> {user.contact || "N/A"}
//                       <br />
//                       <strong>Email:</strong> {user.email || "N/A"}
//                       <br />
//                       <strong>Full Name:</strong> {user.fullName || "N/A"}
//                       <br />
//                       <strong>User Name:</strong> {user.userName || "N/A"}
//                     </div>
//                     <div>
//                     <button onClick={() => handlefollow()} type="button" class="btn btn-primary">{(user.followers) ? 'Unfollow' : 'Follow' }</button>
//                     </div>
//                   </div>
//                 </>
//               )}
//               <hr />
//             </div>
//           ))}
//         </tr>
//         <Modal.Footer>
//           <Button variant="secondary">Close</Button>
//         </Modal.Footer>
//       </div>
//     </div>
//   );
// };

// export default ShowDataModal;
