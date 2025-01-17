import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";


function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const toastConfig = {
    position: "top-right" as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
  };

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://course-selling-app-backend-kss6.onrender.com/auth/signin",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("User signed in successfully", response.data);
        const token = response.data.token;
        const user = response.data.user;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        toast.success(response.data.message, toastConfig);
        navigate("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.error || "Something went wrong";
        toast.error(message, toastConfig);
      }
    }
  };

  return (
    <div className=" flex justify-center items-center">
      <form className="flex flex-col items-center justify-center gap-6 mt-10 p-8 rounded-xl bg-gray-900 shadow-2xl w-96 border border-gray-800">
        <h1 className="text-3xl font-bold text-white mb-6">Sign In</h1>

        <div className="w-full">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="w-full">
          <label
            className="block text-gray-300 text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-900 transition duration-200 transform hover:scale-[1.02]"
          type="button"
          onClick={(e) => handleSignin(e)}
        >
          Sign In
        </button>

        <p className="text-gray-400 text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-500 hover:text-blue-400 cursor-pointer font-medium transition duration-200"
          >
            Create one
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignIn;
