import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../Reducer";
import $ from "jquery";
import Select from 'react-select'
import { stateList } from '../Map/Map'
import { Modal } from '@material-ui/core'
import { useHistory } from "react-router-dom";

const LoginTestModal = () => {
  const [{ userIdentification , userName }, dispatch] = useStateValue();
  const [enteredState, setEnteredState] = useState('');
  const [openState, setOpenState] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useState(null);
  const [description, setDescription] = useState(null);
  const [otpResend, setOtpResend] = useState(false);
  const [referalCode , setReferalCode] = useState('');
  const history = useHistory();

  const resendOTP = () => {
    axios
      .post("/user/login", {
        phone: inputValue,
      })
      .then((res) => { setUserId(res.data.payload._id); startTimer(); setOtpResend(false) })
      .catch((err) => {
        setUserId(null);
        setDescription("Invalid OTP , Try Again");
        console.log(err);
      });
  }

  const handleOTP = () => {
    if (referalCode.length > 0 && referalCode !== 'r7865ikc') {
      alert('Invalid Referral Code');
    } else {
      if (inputValue !== '' && inputValue.length === 10) {
        axios
          .post("/user/login", {
            phone: inputValue,
            state: ''
          })
          .then((res) => { setUserId(res.data.payload._id); startTimer() })
          .catch((err) => {
            setUserId(null);
            setDescription("Invalid OTP , Try Again");
            console.log(err);
          });
      } else {
        alert('Invalid Phone Number')
      }
    }
  };

  const handleRegister = () => {
    if (OTP !== '') {
      axios
        .get(`/user/${userId}/verify-otp?otp=${OTP}`)
        .then((res) => {
          setOTP("");
          setUserId(null);
          // Setting the token in local storage
          localStorage.setItem("authToken", `bearer ${res.headers["x-auth"]}`);
          localStorage.setItem("state", `${res.data.payload.state}`);
          localStorage.setItem("userName", `${res.data.payload.userName}`);
          dispatch({
            type: actionTypes.SET_USER,
            userIdentification: res.data.payload._id,
            phone: res.data.payload.phone,
            state: res.data.payload.state,
            userName: res.data.payload.userName
          });
          if (!res.data.payload.state || res.data.payload.state === '') { closeModal(); setOpenState(true) } else {
            setDescription("OTP is succesfully verified");
          };
        })
        .catch((err) => {
          setUserId(null);
          setDescription("Invalid OTP");
          console.log(err);
        });
    } else {
      alert('Invalid OTP')
    }
  };

  const updateSate = () => {
    if (userIdentification) {
      console.log('Hello');
      if (enteredState !== '') {
        const authToken = localStorage.getItem("authToken").split(" ")[1];
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };

        const bodyParameters = {
          state: enteredState,
        };

        axios
          .patch(
            "/user",
            bodyParameters,
            config
          )
          .then((res) => {
            localStorage.setItem("state", `${res.data.payload.state}`);
            dispatch({
              type: actionTypes.SET_USER_STATE,
              state: res.data.payload.state
            });
            setOpenState(false);
            setDescription('Logged In Sucessfully');
            openModal();
          })
      } else {
        alert('Fields can not be empty');
      }
    } else {
      setOpenState(false);
      setDescription("Please Login First");
    }
  }

  const openModal = () =>
    $("#popup1").css({ visibility: "visible", opacity: "1" });

  const closeModal = () => {
    $("#popup1").css({ visibility: "hidden", opacity: "0" });
    setUserId(null);
    setDescription(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    dispatch({
      type: actionTypes.SET_USER,
      userIdentification: null,
      phone: null,
    });
    window.location.reload()
    setDescription("You have logged out successfully");
    openModal();
  };

  const startTimer = () => {
    let timer = 60;
    let interval = setInterval(() => {
      if (document.getElementById('otp-timer')) {
        document.getElementById('otp-timer').innerHTML = timer--;
      }
      if (timer <= 0) {
        setOtpResend(true);
        clearInterval(interval);
      }
    }, 1000)
    console.log(timer)
  }

  const goToHome = ()=>{
    history.push("/")
  }

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      <div className="box">
          <div className="box" style={{display:'flex',justifyContent:'space-between'}}>
            <button className="modal__btn" onClick={()=>goToHome()}>Home</button>
            <button
          onClick={userIdentification ? handleLogout : openModal}
          className="modal__btn"
        >
          {userIdentification ? "Logout" : "Login"}
        </button>
          </div>
      </div>

      <div id="popup1" className="overlay">
        {!description ? (
          <div className="modal__conatiner">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <div style={{ color: "#fff", margin: 10 }}>Login with Phone Number</div>
            <div>
              <input
                autoFocus
                placeholder="Enter your 10-digit number"
                value={inputValue}
                type="number"
                className="input-field"
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              <input
                autoFocus
                placeholder="Referral code (if any)"
                value={referalCode}
                type="text"
                className="input-field"
                onChange={(e) => setReferalCode(e.target.value)}
                required
              />
              {userId && (
                <input
                  autoFocus
                  placeholder="OTP"
                  value={OTP}
                  type="number"
                  className="input-field"
                  onChange={(e) => setOTP(e.target.value)}
                />
              )
              }
              {
                userId && !otpResend && <h5 style={{ marginBottom: '2px', color: "white" }}>Resend OTP in <span style={{ color: 'red' }} id="otp-timer"></span> sec.</h5>
              }
              {
                otpResend ? <button onClick={resendOTP}>
                  Resend otp
               </button> : null
              }
              <button onClick={userId ? handleRegister : handleOTP}>
                {userId ? "VERIFY OTP" : "GET OTP"}
              </button>
            </div>
          </div>
        ) : (
          <div className="modal__conatiner modal__conatinerDesc">
            <div style={{ color: "#fff", margin: 10 }}>{description}</div>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </div>
      <Modal open={openState} onBackdropClick={() => { setOpenState(false); }}>
        <div className="movieGrid__modal3 movieGrid__modalSecond" style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          color: 'black',
          height: 'max-content',
          alignItems: "center"
        }}>
          <div style={{ color: "#fff", margin: "10px 0px", padding: "10px 0px" }}>Enter your region</div>
          <Select options={stateList} onChange={(value) => { setEnteredState(value.value) }} placeholder='Select your region' style={{ color: 'white', marginTop: '5px' }} />
          <button className="submitBtn" onClick={updateSate}>Submit</button>
        </div>
      </Modal>
    </div>
  );
};

export default LoginTestModal;
