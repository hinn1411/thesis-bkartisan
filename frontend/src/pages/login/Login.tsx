import { FC, memo, useState } from 'react';
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import apiAuth from '../../apis/apiAuth';
import facebookIcon from '../../assets/images/login/facebook.png';
import googleIcon from '../../assets/images/login/google.png';
import sideImage from '../../assets/images/login/image.png';
const Login: FC = memo(() => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await apiAuth.login(username, password);
      console.log(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 500) {
          // Trường hợp đăng nhập thất bại do sai mặt khẩu hay tài khoản
          console.log("Thông tin đăng nhập sai");
        }
        else {
          console.log("Lỗi. Không thể đăng nhập được");
        }
      }
      else {
        console.log(error);
      }
    }
  }

  const handleForgetPassword = async () => {
    console.log("Forget Password");
    try {
      const res = await axios.get("http://localhost:3001/product", {withCredentials: true})
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleFacebookLogin = () => {
    console.log("Facebook Login");
  }

  const handleGoogleLogin = () => {
    window.open(`${import.meta.env.VITE_BASE_URL}/google`, '_self')
  }


  return (
    <div className="h-screen">
      {/* <!-- Global Container --> */}
      <div className="flex items-center justify-center min-h-screen bg-amber-50">
        {/* <!-- Card Container --> */}
        <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
          {/* <!-- Left Side --> */}
          <div className="p-20">
            {/* <!-- Top Content --> */}
            <h2 className="font-mono mb-5 text-4xl font-bold">Đăng nhập</h2>
            {/* <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
            Log in to your account to upload or download pictures, videos or
            music.
          </p> */}
            <div className="my-6">
              <input
                type="text"
                className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                placeholder="Nhập tên tài khoản"
                onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className="my-6">
              <input
                type="password"
                className="w-full py-4 px-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light hover:outline hover:outline-black hover:outline-1"
                placeholder="Nhập mật khẩu"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {/* <!-- Middle Content --> */}
            <div className="flex flex-col items-center justify-between mt-6 space-y-6  md:flex-row md:space-y-0 md:space-x-6">
              <button onClick={handleLogin} className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                <span>Đăng nhập</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="13" y1="18" x2="19" y2="12" />
                  <line x1="13" y1="6" x2="19" y2="12" />
                </svg>
              </button>
              <button className="w-full md:w-auto flex justify-center items-center p-4 space-x-2 font-sans font-bold text-white rounded-md px-9 bg-orange-600 shadow-cyan-100 hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition hover:-translate-y-0.5 duration-150">
                <Link to="/register">Đăng ký</Link>
              </button>
            </div>
            <div onClick={handleForgetPassword} className="font-regular text-orange-600 hover:cursor-pointer text-center my-4">
              {/*<Link to="/enter-email" className="text-center mx-auto">
                Quên mật khẩu?
        </Link>*/}
              Quên mật khẩu?
            </div>
            {/* <!-- Border --> */}
            <div className="mt-12 border-b border-b-gray-300"></div>
            {/* <!-- Bottom Content --> */}
            <p className="py-6 text-sm font-regular text-center text-gray-400">
              Hoặc đăng nhập với
            </p>
            {/* <!-- Bottom Buttons Container --> */}
            {/* src\assets\images\login\facebook.png 
            src\pages\login\Login.tsx */}
            <div className="flex flex-col space-x-0 space-y-6 md:flex-row md:space-x-4 md:space-y-0">
              <button onClick={handleFacebookLogin} className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2">
                <img src={facebookIcon} alt="" className="w-9" />
                <span className="font-thin">Facebook</span>
              </button>
              <button onClick={handleGoogleLogin} className="flex items-center justify-center py-2 space-x-3 border border-gray-300 rounded shadow-sm hover:bg-opacity-30 hover:shadow-lg hover:-translate-y-0.5 transition duration-150 md:w-1/2">
                <img src={googleIcon} alt="" className="w-9" />
                <span className="font-thin">Google</span>
              </button>
            </div>
          </div>

          {/* <!-- Right Side --> */}
          <img
            src={sideImage}
            alt=""
            className="w-[430px] h-[670px] hidden md:block"
          />

          {/* <!-- Close Button --> */}
          <Link to="/">
            <div className="group absolute hidden -top-5 right-4 md:flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full md:bg-white md:top-4 hover:cursor-pointer hover:-translate-y-0.5 transition duration-150">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-black group-hover:text-gray-600"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
});

export default Login;
