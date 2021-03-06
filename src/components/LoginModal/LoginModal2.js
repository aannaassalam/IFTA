import React, { useState, useEffect } from "react";
import "./LoginModal2.css";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../Reducer";
import $ from "jquery";
import Select from "react-select";
import { stateList } from "../Map/Map";
import {
  Button,
  Divider,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import toaster from "toasted-notes";
import moment from "moment";

const LoginTestModal2 = () => {
  const [{ userIdentification, userName }, dispatch] = useStateValue();
  const [enteredState, setEnteredState] = useState(null);
  const [openState, setOpenState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useState(null);
  const [description, setDescription] = useState(null);
  const [otpResend, setOtpResend] = useState(false);
  const [referalCode, setReferalCode] = useState("");
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const history = useHistory();

  const resendOTP = () => {
    axios
      .post("/user/login", {
        phone: inputValue,
      })
      .then((res) => {
        setUserId(res.data.payload._id);
        startTimer();
        setOtpResend(false);
      })
      .catch((err) => {
        setUserId(null);
        setDescription("Invalid OTP , Try Again");
        toaster.notify("Invalid OTP, Try Again");
        console.log(err);
      });
  };

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const handleOTP = () => {
    if (
      referalCode.length > 0 &&
      referalCode !== "r7865ikc" &&
      referalCode !== "vds5267g" &&
      referalCode !== "7437sdvi" &&
      referalCode !== "sdjhv852" &&
      referalCode !== "xnmzbm64" &&
      referalCode !== "mcds6730"
    ) {
      alert("Invalid Referral Code");
    } else if (email.length > 0 && !validateEmail(email)) {
      alert("Invalid Email");
    } else {
      if (inputValue !== "" && inputValue.length === 10) {
        axios
          .post("/user/login", {
            phone: inputValue,
            state: "",
            email: email,
          })
          .then((res) => {
            setModal(false);
            setUserId(res.data.payload._id);
            startTimer();
            toaster.notify("OTP sent");
          })
          .catch((err) => {
            setUserId(null);
            setDescription("Invalid OTP , Try Again");
            toaster.notify("Invalid OTP , Try Again");
            console.log(err);
          });
      } else {
        toaster.notify("Invalid Phone Number");
      }
    }
  };

  const handleRegister = () => {
    if (OTP !== "") {
      axios
        .get(`/user/${userId}/verify-otp?otp=${OTP}`)
        .then((res) => {
          setOTP("");
          setUserId(null);
          // Setting the token in local storage
          localStorage.setItem("authToken", `bearer ${res.headers["x-auth"]}`);
          localStorage.setItem("state", `${res.data.payload.state}`);
          localStorage.setItem("userName", `${res.data.payload.userName}`);
          localStorage.setItem("userId", `${res.data.payload._id}`);
          dispatch({
            type: actionTypes.SET_USER,
            userIdentification: res.data.payload._id,
            phone: res.data.payload.phone,
            state: res.data.payload.state,
            userName: res.data.payload.userName,
          });
          if (
            !res.data.payload.state ||
            res.data.payload.state === "" ||
            !res.data.payload.gender ||
            res.data.payload.gender === "" ||
            !res.data.payload.dateOfBirth ||
            res.data.payload.dateOfBirth === ""
          ) {
            setModal(false);
            setOpenState(true);
            setEnteredState(res.data.payload.state || "");
            setAge(res.data.payload.dateOfBirth || "");
            setGender(res.data.payload.gender || "male");
          } else {
            toaster.notify("OTP is successfully verified");
            setDescription("OTP is succesfully verified");
          }
        })
        .catch((err) => {
          setUserId(null);
          setDescription("Invalid OTP");
          toaster.notify("Invalid OTP");
          setOTP("");
          console.log(err);
        });
    } else {
      toaster.notify("Invalid OTP");
      setOTP("");
    }
  };

  const updateSate = () => {
    if (userIdentification) {
      if (enteredState !== "" && age !== "" && age > 0) {
        const authToken = localStorage.getItem("authToken").split(" ")[1];
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };

        const bodyParameters = {
          state: enteredState,
          gender: gender,
          dateOfBirth: moment(new Date()).subtract(age, "years").toISOString(),
        };

        axios.patch("/user", bodyParameters, config).then((res) => {
          localStorage.setItem("state", `${res.data.payload.state}`);
          localStorage.setItem("gender", `${res.data.payload.gender}`);
          localStorage.setItem(
            "dateOfBirth",
            `${res.data.payload.dateOfBirth}`
          );
          dispatch({
            type: actionTypes.SET_USER_STATE,
            state: res.data.payload.state,
            gender: res.data.payload.gender,
            dateOfBirth: res.data.payload.dateOfBirth,
          });
          setOpenState(false);
          toaster.notify("Logged In Successfully");
          setDescription("Logged In Sucessfully");
          //   openModal();
        });
      } else {
        toaster.notify("Fields can not be empty");
      }
    } else {
      setOpenState(false);
      setDescription("Please Login First");
      toaster.notify("Please Login First");
    }
  };

  //   const openModal = () =>
  //     $("#popup1").css({ visibility: "visible", opacity: "1" });

  //   const closeModal = () => {
  //     $("#popup1").css({ visibility: "hidden", opacity: "0" });
  //     setUserId(null);
  //     setDescription(null);
  //   };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: actionTypes.SET_USER,
      userIdentification: null,
      phone: null,
    });
    window.location.reload();
    toaster.notify("You have logged out successfully");
    setDescription("You have logged out successfully");
    // openModal();
  };

  const startTimer = () => {
    let timer = 60;
    let interval = setInterval(() => {
      if (document.getElementById("otp-timer")) {
        document.getElementById("otp-timer").innerHTML = timer--;
      }
      if (timer <= 0) {
        setOtpResend(true);
        clearInterval(interval);
      }
    }, 1000);
  };

  const goToHome = () => {
    history.push("/");
  };

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
      borderRadius: 0,
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

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className="box">
        <div
          className="box"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button className="modal__btn" onClick={() => goToHome()}>
            Home
          </button>
          <button
            onClick={userIdentification ? handleLogout : () => setModal(true)}
            className="modal__btn"
          >
            {userIdentification ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      <Modal open={modal} onClose={() => setModal(false)}>
        <div className="modal">
          <h4>Login</h4>
          {/* <p>
            You will be recieving an OTP on the number given below, once you
            click Login button
          </p> */}

          <div className="inputs">
            <input
              autoFocus
              type="number"
              placeholder="Phone Number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              inputMode="numeric"
            />
            {/* <Select
              options={stateList}
              value={stateList.filter((state) => state.value === enteredState)}
              onChange={(value) => {
                setEnteredState(value.value);
              }}
              placeholder="Select your region"
              styles={customStyles}
              className="select"
            /> */}
            <input
              type="text"
              placeholder="Referal code(If any)"
              value={referalCode}
              onChange={(e) => setReferalCode(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            onClick={handleOTP}
            className="login-btn"
            fullWidth
          >
            Login
          </Button>

          {/* {userId && (
            <>
              <input
                autoFocus
                placeholder="OTP"
                value={OTP}
                type="number"
                className="OTP-field"
                onChange={(e) => setOTP(e.target.value)}
              />
              {!otpResend ? (
                <p className="resend">
                  Resend code in <span id="otp-timer"></span>
                </p>
              ) : (
                <p className="resend btn" onClick={resendOTP}>
                  Resend code
                </p>
              )}
              <Button
                variant="contained"
                onClick={handleRegister}
                className="login-btn verify"
                fullWidth
              >
                Verify
              </Button>
            </>
          )} */}
        </div>
      </Modal>
      <Modal open={userId ? true : false} onClose={() => setUserId(null)}>
        <div className="modal verify">
          <i
            className="fas fa-arrow-left"
            onClick={() => {
              setUserId(null);
              setModal(true);
              startTimer();
              setOtpResend(false);
              setOTP("");
            }}
          ></i>
          <h3>Verify OTP</h3>
          <input
            autoFocus
            placeholder="OTP"
            value={OTP}
            type="number"
            className="OTP-field"
            onChange={(e) => setOTP(e.target.value)}
          />
          {!otpResend ? (
            <p className="resend">
              Resend code in <span id="otp-timer"></span>
            </p>
          ) : (
            <p className="resend btn" onClick={resendOTP}>
              Resend code
            </p>
          )}
          <Button
            variant="contained"
            onClick={handleRegister}
            className="login-btn verify"
            fullWidth
          >
            Verify
          </Button>
        </div>
      </Modal>

      <Modal open={openState} onClose={() => setOpenState(false)}>
        <div className="modal more-details">
          <span className="skip" onClick={() => setOpenState(false)}>
            Skip
          </span>
          <h3>More Details</h3>
          <div className="gender">
            <label className={gender === "male" ? "box checked" : "box"}>
              <p>Male</p>
              <input
                type="radio"
                name="gender"
                onChange={(e) => setGender("male")}
              />
            </label>
            <label className={gender === "female" ? "box checked" : "box"}>
              <p>Female</p>
              <input
                type="radio"
                name="gender"
                onChange={() => setGender("female")}
              />
            </label>
            <label className={gender === "others" ? "box checked" : "box"}>
              <p>Others</p>
              <input
                type="radio"
                name="gender"
                onChange={() => setGender("others")}
              />
            </label>
          </div>

          <input
            autoFocus
            placeholder="Age"
            value={age}
            type="number"
            className="age"
            onChange={(e) => setAge(e.target.value)}
          />

          <Select
            options={stateList}
            value={stateList.filter((state) => state.value === enteredState)}
            onChange={(value) => {
              setEnteredState(value.value);
            }}
            placeholder="Select your region"
            styles={customStyles}
            className="select"
          />

          <Button
            variant="contained"
            onClick={updateSate}
            className="login-btn"
            fullWidth
          >
            Submit
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginTestModal2;
