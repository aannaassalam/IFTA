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
        alert(res.data.description);
        $("#popup1").css({ visibility: "hidden", opacity: "0" });
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
  };

  return (
    <div>
      <div class="box">
        <button onClick={openModal} class="modal__btn">
          {userIdentification ? "Logout" : "Login"}
        </button>
      </div>

      <div id="popup1" class="overlay">
        <div className="modal__conatiner">
          <button class="close" href="#" onClick={closeModal}>
            &times;
          </button>
          <h1>Login with Phone Number</h1>
          <div>
            <input
              autoFocus
              placeholder="Phone Number"
              value={inputValue}
              type="number"
              onChange={(e) => setInputValue(e.target.value)}
            />
            {userId && (
              <input
                autoFocus
                placeholder="OTP"
                value={OTP}
                type="number"
                onChange={(e) => setOTP(e.target.value)}
              />
            )}
            <button onClick={userId ? handleRegister : handleOTP}>
              {userId ? "VERIFY OTP" : "GET OTP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTestModal;
