import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Home.css";
import { IoMdSettings } from "react-icons/io";
import { MdPermMedia, MdGifBox, MdMoreHoriz } from "react-icons/md";
import { FaPollH } from "react-icons/fa";
import { BsEmojiSmileFill } from "react-icons/bs";
import { AiFillSchedule } from "react-icons/ai";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB, txtDB } from "../../Firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [data, setData] = useState([]);
  const [messagingSenderId,   setMessagingSenderId] = useState("");

  const handleUploadImage = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(imgDB, `Imgs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((res) => {
      getDownloadURL(res.ref).then((val) => {
        setImage(val);
      });
    });
  };
  const handleUploadTxt = async () => {
    const valref = collection(txtDB, "txtData");
    await addDoc(valref, { txtVal: text, imgUrl: image });
    alert("Data added Sucessfully!");
  };
  const handleGetData = async () => {
    const valref = collection(txtDB, "txtData");
    const dataDB = await getDocs(valref);
    const allData = dataDB.docs.map((val) => ({ ...val.data(), id: val.id }));
    setData(allData);

    // USERID FATCHING
    const messagingSenderId =
      dataDB?._firestore?._app?._options?.messagingSenderId;  
      setMessagingSenderId(messagingSenderId);
  };

  useEffect(() => {
    handleGetData();
  }, [image]);

  return (
    <>
      <div className="row">
        <div className="col-12 Home-main">
          <div className="container Home-second">
            {/* HERDER  SECCTION */}
            <div className="Home-Hader-Sec">
              <div className="Home-foryou">For you</div>
              <div className="Home-foryou">Following </div>
              <IoMdSettings
                style={{ fontSize: "2rem", margin: "auto", padding: "6px" }}
              />
            </div>

            {/*MAIN POST AREA SECTION CODE */}
            <div className="Home-post-main">
              <div className="Home-post-second">
                <div className="Profile-Picture">
                  <img
                    className="Profile-image-sec"
                    width={50}
                    height={50}
                    src="https://marketplace.canva.com/EAFuJ5pCLLM/1/0/1600w/canva-black-and-gold-simple-business-man-linkedin-profile-picture-BM_NPo97JwE.jpg"
                    alt="Profile-picture"
                  />
                  <input
                    type="text"
                    id="myInput"
                    className="home-post-text"
                    placeholder="Type something..."
                    onChange={(e) => setText(e.target.value)}
                  />
                </div>

                {/* MEDIA FILL UPLOAD SECTION CODE  */}
                <div className="Home-Media-main">
                  <div className="Home-Media-second">
                    <div className="Media-all-items">
                      <input
                        type="file"
                        accept=".svg, .png, .jpg, .gif, .jpeg"
                        onChange={(e) => handleUploadImage(e)}
                      />
                      <MdPermMedia />
                      <MdGifBox />
                      <FaPollH />
                      <BsEmojiSmileFill />
                      <AiFillSchedule />
                    </div>
                    <button
                      className="btn btn-primary Subscriber-btn Home-post-btn"
                      onClick={handleUploadTxt}
                    >
                      Post
                    </button>
                  </div>
                  <div className="Home-Show-all-post text-center fs-5">
                    Show all Post's
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="banner row">
        <div className="container col-12 banner-second">
          <div className="profile-posting-main">
            <div className="profile-posting-second">
              <img
                className="Profile-image-sec"
                width={50}
                height={50}
                src="https://marketplace.canva.com/EAFuJ5pCLLM/1/0/1600w/canva-black-and-gold-simple-business-man-linkedin-profile-picture-BM_NPo97JwE.jpg"
                alt="Profile-picture"
                style={{ marginRight: "7px" }}
              />
              <h5>M Shayan</h5>
            </div>
            <div>
              <MdMoreHoriz style={{ fontSize: "2rem" }} />
            </div>
          </div>
          <div className="All-post-image-text">
            {data.map((value) => (
              <div className="All-post-second">
                {/* <h5>{messagingSenderId}</h5> */}
                <h5 className="Post-deceription">{value.txtVal}</h5>
                <img src={value.imgUrl} alt="Post" />{" "}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
