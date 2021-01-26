import React, { useState } from "react";
import "./LoginModal.css";
import { useStateValue } from "../../StateProvider";
import axios from "axios";
import { actionTypes } from "../../Reducer";
import $ from "jquery";

const LoginTestModal = () => {
  const [{ userIdentification }, dispatch] = useStateValue();

  const [inputValue, setInputValue] = useState("");
  const [OTP, setOTP] = useState("");
  const [userId, setUserId] = useState(null);
  const [description, setDescription] = useState(null);

  const handleOTP = () => {
    axios
      .post("http://13.235.90.125:8000/user/login", {
        phone: inputValue,
      })
      .then((res) => setUserId(res.data.payload._id))
      .catch((err) => {
        setUserId(null);
        alert(err);
      });
  };

  const handleRegister = () => {
    axios
      .get(`http://13.235.90.125:8000/user/${userId}/verify-otp?otp=${OTP}`)
      .then((res) => {
        setOTP("");
        setUserId(null);
        // Setting the token in local storage
        localStorage.setItem("authToken", `bearer ${res.headers["x-auth"]}`);
        dispatch({
          type: actionTypes.SET_USER,
          userIdentification: res.data.payload._id,
          phone: res.data.payload.phone,
        });
        setDescription(res.data.description);
      })
      .catch((err) => {
        setUserId(null);
        alert(err);
      });
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
    setDescription("You have logged out successfully");
    openModal();
  };

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
              )}
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
