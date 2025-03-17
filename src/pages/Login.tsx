import React from "react";
import ChangeThemes from "../components/ChangesThemes";
import { DiReact } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { useState } from "react";
import { useGlobalContext } from "../contexts/GlobalContext";
import { login, forgotFetch, changeFetch, Answer } from "./User/UserData";
import OTPInput from "../components/OTPInput";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to track errors
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [otp, setOtp] = useState(false);
  const [sendOtp,setSendOtp]  = useState("");
  const [userOtp,setUserOtp]  = useState("");
  const [passwordText,setPasswordText]  = useState("Forgot Password?");

  // RegEx Patterns
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^[0-9]{10}$/; // Validates a 10-digit phone number
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // Dynamically update email or password
    });
  };
  const handleForgotPassword = () => {
    // Implement your forgot password logic here, e.g., navigating to a reset page
    console.log("Forgot Password clicked");
    setForgotPassword(!forgotPassword);
    formData.password = "";
    setPasswordText(forgotPassword ? "Forgot Password?":"Sign in");
  };
  const handleOtpComplete = (otp: string) => {
    console.log("Entered OTP:", otp);
    setUserOtp(otp);

  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit()--", formData.email);
    let newErrors = { email: "", password: "" };

    if (!emailPattern.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordPattern.test(formData.password)) {
      newErrors.password =
        //"Password must be at least 8 characters, with uppercase, lowercase, number, and special character";
        "Invalid password format";
    }

    setErrors(newErrors);

    // Check if no errors before submission
    if (sendOtp !== "")
    {
      if (sendOtp === userOtp)
      {
        //setMessage("You have entered a wrong OTP")
        const passport = {
          email: formData.email,
          password: formData.password,
          token:""
        };
        const result = (await changeFetch(passport)) as Answer;
        console.log(result.message);
        if (result.status == 0) {
          setForgotPassword(false);
          setOtp(false);
          setSendOtp("");
        }else{
          setMessage(result.message);
        }
        
      }else setMessage("You have entered a wrong OTP")
    }else if (forgotPassword) {
      const result = (await forgotFetch(formData.email)) as Answer;
      //const res = JSON.stringify(result);
      //console.log("Result ",res);
      //const status = JSON.parse(res); // Parse it back to an object
      console.log("Forgot Status:",result.status);
      console.log("Server Password:",result.message);
      if (result.status === 0) {
        setForgotPassword(true);
        setOtp(true);
        setSendOtp(result.message);

      }
    } else if (!newErrors.email && !newErrors.password) {
      //navigate("/");
      const passport = {
        email: formData.email,
        password: formData.password,
        token: "",
      };

      const res = (await login(passport)) as Answer;
      console.log("Passport::", res.message);

      if (res.status === 0) {
        localStorage.setItem("token", res.message);
        navigate("/dashboard/home");
      } else {
        //newErrors.email = res.message;
        setMessage(res.message);
      }
      //navigate("/dashboard/home");
    }
  };

  const navigate = useNavigate();
  return forgotPassword ? (
    // screen
    <div className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        {/* theme */}
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>
        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div className="flex items-center gap-1 xl:gap-2">
            <Logo />
          </div>
          <div>
            {message.trim() && <p style={{ color: "red" }}>{message}</p>}
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-stretch gap-3"
          >
            <div className="w-full flex flex-col items-stretch gap-3">
            {!otp ? (
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                
                <input
                  type="text"
                  name="email"
                  className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </label>
                ):
                (
                  <>
                  <div className="mx-auto w-fit">
                  <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
                    <OTPInput length={6} onComplete={handleOtpComplete} />
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                  placeholder="New Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
              </label>
              
                  </>
                  
                )
              }
              <div className="flex items-center justify-between">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox w-4 h-4 rounded-md checkbox-primary"
                    />
                    <span className="label-text text-xs">Remember me</span>
                  </label>
                </div>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="link link-primary font-semibold text-xs no-underline"
                >
                  {passwordText}
                </a>
              </div>
              <button type="submit" className="btn btn-block btn-primary">
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    // screen
    <div className="w-full p-0 m-0">
      {/* container */}
      <div className="w-full min-h-screen flex justify-center items-center bg-base-200 relative">
        {/* theme */}
        <div className="absolute top-5 right-5 z-[99]">
          <ChangeThemes />
        </div>
        <div className="w-full h-screen xl:h-auto xl:w-[30%] 2xl:w-[25%] 3xl:w-[20%] bg-base-100 rounded-lg shadow-md flex flex-col items-center p-5 pb-7 gap-8 pt-20 xl:pt-7">
          <div className="flex items-center gap-1 xl:gap-2">
            <Logo />
          </div>
          <div>
            {message.trim() && <p style={{ color: "red" }}>{message}</p>}
          </div>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-stretch gap-3"
          >
            <div className="w-full flex flex-col items-stretch gap-3">
              <label className="input input-bordered min-w-full flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  name="email"
                  className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  className="grow input outline-none focus:outline-none border-none border-[0px] h-auto pl-1 pr-0"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password}</p>
                )}
              </label>
              <div className="flex items-center justify-between">
                <div className="form-control">
                  <label className="label cursor-pointer gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox w-4 h-4 rounded-md checkbox-primary"
                    />
                    <span className="label-text text-xs">Remember me</span>
                  </label>
                </div>
                <a
                  href="#"
                  onClick={handleForgotPassword}
                  className="link link-primary font-semibold text-xs no-underline"
                >
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="btn btn-block btn-primary">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
