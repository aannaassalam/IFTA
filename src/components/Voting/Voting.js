import React, { useCallback, useEffect, useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo1 from "../../images/sc2.jpg";
import Navbar from "../Navbar/Navbar";
import YTVideo from "../Home/YTVideo/YTVideo";
import Category from "../Home/Category/Category";
import Footer from "../Footer/Footer";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";
import LoginModal from "../LoginModal/LoginModal";
import CountUp from "react-countup";
import { useHistory } from "react-router-dom";
import LoginTestModal2 from "../LoginModal/LoginModal2";
import { Button, Modal } from "@material-ui/core";
import { stateList } from "../Map/Map";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import toaster from "toasted-notes";

const Voting = () => {
  const [{ userIdentification, totalVotes, userName }, dispatch] =
    useStateValue();
  const [profile, setProfile] = useState(false);
  const [enteredState, setEnteredState] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");
  const [profilePic, setProfilePic] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (userIdentification !== null) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      const config = {
        headers: { Authorization: `Bearer ${authToken}` },
      };

      axios
        .get(`/user/${userId}/`, config)
        .then((res) => {
          setFirstName(res.data.payload.firstName);
          setLastName(res.data.payload.lastName);
          setUsername(res.data.payload.userName);
          setEnteredState(res.data.payload.state);
          setAge(
            parseInt(
              moment(new Date()).diff(
                moment(res.data.payload.dateOfBirth, "YYYY"),
                "years"
              )
            )
          );
          setGender(res.data.payload.gender);
          setPhone(res.data.payload.phone);
          setProfilePic(res.data.payload.avatar);
        })
        .catch((err) => console.log(err));
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: authToken,
      });
    }
  }, [userIdentification]);

  const history = useHistory();

  const customStyles = {
    menuList: (provided) => ({
      ...provided,
      height: 250,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "#fff" : "#333",
      fontSize: 13,
      fontWeight: 600,
    }),
    container: (provided) => ({
      ...provided,
      width: "90%",
      marginTop: 5,
    }),
    control: (provided, state) => ({
      ...provided,
      minHeight: 35,
      width: "100%",
      border: state.isFocused ? "1px solid #999" : "1px solid #ccc",
      boxShadow: state.isFocused ? "none" : "none",
      borderRadius: 3,
      backgroundColor: "transparent",
      "&:hover": {
        borderColor: "#999",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#aaa",
      fontSize: 13,
      fontWeight: 600,
      marginLeft: 10,
    }),
    input: (provided) => ({
      ...provided,
      padding: "0px 8px 10px",
      height: 35,
      fontSize: 13,
      margin: "0 2px",
      color: "#333",
    }),
    valueContainer: (provided) => ({
      height: 35,
    }),
    singleValue: (provided) => ({
      ...provided,
      fontSize: 13,
      fontWeight: 600,
      color: "#333",
      marginLeft: 10,
    }),
  };

  const updateUser = () => {
    if (userIdentification) {
      if (
        enteredState !== "" &&
        age !== "" &&
        age > 0 &&
        firstName !== "" &&
        lastName !== "" &&
        username !== ""
      ) {
        const authToken = localStorage.getItem("authToken").split(" ")[1];
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };

        const bodyParameters = {
          firstName: firstName,
          lastName: lastName,
          userName: username,
          state: enteredState,
          gender: gender,
          dateOfBirth: moment(new Date()).subtract(age, "years").toISOString(),
        };

        // axios.post("/upload/image", {image: }, config)

        axios.patch("/user", bodyParameters, config).then((res) => {
          console.log(res.data);
          localStorage.setItem("state", `${res.data.payload.state}`);
          localStorage.setItem("gender", `${res.data.payload.gender}`);
          localStorage.setItem(
            "dateOfBirth",
            `${res.data.payload.dateOfBirth}`
          );
          localStorage.setItem("userName", `${res.data.payload.userName}`);
          dispatch({
            type: actionTypes.SET_USER_STATE,
            state: res.data.payload.state,
          });
          dispatch({
            type: actionTypes.SET_USERNAME,
            userName: res.data.payload.userName,
          });
          toaster.notify("Profile updated Successfully");
          setEdit(false);
        });
      } else {
        toaster.notify("Fields can not be empty");
      }
    } else {
      // setOpenState(false);
      // setDescription("Please Login First");
      toaster.notify("Please Login First");
    }
  };

  return (
    <div className="voting">
      <div className="voting__login">
        <div>
          <h2 style={{ color: "gold" }}>
            Total votes: <CountUp end={totalVotes} duration={2.75} />
          </h2>
          <div className="username" onClick={() => setProfile(true)}>
            <span>
              {userIdentification ? (
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              ) : null}
            </span>
            <span>{userIdentification ? userName : null}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "min-content",
          }}
        >
          {/* <LoginModal /> */}
          <LoginTestModal2 />
        </div>
      </div>
      <img className="top-img" src={logo1} alt="iifa-logo" />
      <Navbar />
      {/* <img className="bottom-img" src={logo2} alt="iifa-logo" /> */}
      <div className="voting__video">
        <YTVideo />
      </div>
      <div className="voting__category">
        <Category />
      </div>
      <Footer />

      <Modal open={profile} onClose={() => setProfile(false)}>
        <div className="profile">
          <i
            className="fas fa-times"
            onClick={() => {
              setProfile(false);
              setEdit(false);
            }}
          ></i>
          <h3>Profile</h3>
          <div className="body">
            <div className="left">
              <img src={profilePic} alt="" />
            </div>
            <div className="right">
              <label className="input">
                <p>First name</p>
                {edit ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                ) : (
                  <p className="static">{firstName}</p>
                )}
              </label>
              <label className="input">
                <p>Last name</p>

                {edit ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                ) : (
                  <p className="static">{lastName}</p>
                )}
              </label>
              <label className="input">
                <p>Username</p>

                {edit ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <p className="static">{username}</p>
                )}
              </label>
              <label className="input">
                <p>Phone Number</p>

                {edit ? (
                  <input
                    type="number"
                    inputMode="numeric"
                    value={phone}
                    disabled
                    style={{ backgroundColor: "#ddd" }}
                  />
                ) : (
                  <p className="static">{phone}</p>
                )}
              </label>
              <label className="input">
                <p>Age</p>

                {edit ? (
                  <input
                    type="number"
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                ) : (
                  <p className="static">{age}</p>
                )}
              </label>
              <label className="input">
                <p>State</p>

                {edit ? (
                  <Select
                    options={stateList}
                    value={stateList.filter(
                      (state) => state.value === enteredState
                    )}
                    onChange={(value) => {
                      setEnteredState(value.value);
                    }}
                    placeholder="Select your region"
                    styles={customStyles}
                    className="select"
                  />
                ) : (
                  <p className="static">{enteredState}</p>
                )}
              </label>
              <div className="gender">
                {edit ? (
                  <>
                    <label
                      className={gender === "male" ? "box checked" : "box"}
                    >
                      <p>Male</p>
                      <input
                        type="radio"
                        name="gender"
                        onChange={(e) => setGender("male")}
                      />
                    </label>
                    <label
                      className={gender === "female" ? "box checked" : "box"}
                    >
                      <p>Female</p>
                      <input
                        type="radio"
                        name="gender"
                        onChange={() => setGender("female")}
                      />
                    </label>
                    <label
                      className={gender === "others" ? "box checked" : "box"}
                    >
                      <p>Others</p>
                      <input
                        type="radio"
                        name="gender"
                        onChange={() => setGender("others")}
                      />
                    </label>
                  </>
                ) : (
                  <label className="input">
                    <p>Gender</p>
                    <p className="static">{gender}</p>
                  </label>
                )}
              </div>
            </div>
          </div>
          <div className="foot">
            {edit ? (
              <>
                <Button
                  variant="outlined"
                  className="btn-outlined"
                  onClick={() => setEdit(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  className="btn"
                  onClick={updateUser}
                >
                  Update
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                className="btn"
                onClick={() => setEdit(true)}
              >
                Edit
              </Button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Voting;
