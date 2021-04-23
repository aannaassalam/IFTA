import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../Reducer";
import $ from "jquery";
import Select from 'react-select'
import { stateList } from '../Map/Map'


const LoginTestModal = () => {
  const [{ userIdentification }, dispatch] = useStateValue();
  const [state, setState] = useState('');
  const [inputValue, setInputValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useState(null);
  const [description, setDescription] = useState(null);
  const [otpResend, setOtpResend] = useState(false);

  const resendOTP = () => {
    axios
      .post("http://13.235.90.125:8000/user/login", {
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
    if (inputValue !== '' && inputValue.length === 10 && state !== '') {
      axios
        .post("http://13.235.90.125:8000/user/login", {
          phone: inputValue,
          state:state
        })
        .then((res) => { setUserId(res.data.payload._id); startTimer() })
        .catch((err) => {
          setUserId(null);
          setDescription("Invalid OTP , Try Again");
          console.log(err);
        });
    } else {
      alert('Invalid Phone Number or Region')
    }
  };

  const handleRegister = () => {
    if (OTP !== '') {
      axios
        .get(`http://13.235.90.125:8000/user/${userId}/verify-otp?otp=${OTP}`)
        .then((res) => {
          setOTP("");
          setUserId(null);
          // Setting the token in local storage
          localStorage.setItem("authToken", `bearer ${res.headers["x-auth"]}`);
          localStorage.setItem("state", `${res.data.payload.state}`);
          dispatch({
            type: actionTypes.SET_USER,
            userIdentification: res.data.payload._id,
            phone: res.data.payload.phone,
            state: res.data.payload.state
          });
          setDescription(res.data.description);
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


  return (
    <div>
      <div className="box">
        <button
          onClick={userIdentification ? handleLogout : openModal}
          className="modal__btn"
        >
          {userIdentification ? "Logout" : "Login"}
        </button>
      </div>

      <div id="popup1" className="overlay">
        {!description ? (
          <div className="modal__conatiner">
            <button className="close" onClick={closeModal}>
              &times;
            </button>
            <h1>Login with Phone Number</h1>
            <div>
              <input
                autoFocus
                placeholder="Phone Number"
                value={inputValue}
                type="number"
                className="input-field"
                onChange={(e) => setInputValue(e.target.value)}
                required
              />
              <Select options={stateList} onChange={(value) => { setState(value.value) }} placeholder='Select your region' style={{ color: 'white', margin:'5px' }} />
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
                userId && !otpResend && <h5 style={{ marginBottom: '2px' , color:"white" }}>Resend OTP in <span style={{ color: 'red' }} id="otp-timer"></span> sec.</h5>
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
            <h1>{description}</h1>
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginTestModal;
