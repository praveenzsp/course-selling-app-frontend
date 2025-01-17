import axios, { isAxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

function SignUp() {
  const [username, setUsername] = useState("");
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

  const handleSignUp = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://course-selling-app-backend-kss6.onrender.com/auth/signup",
        {
          username,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("You are successfully signed up", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        });
        navigate("/signin");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        const message = error.response?.data?.error || "Something went wrong";
        const status = error.response?.status;
        if (status === 401) {
          toast.error("Please provide valid details", toastConfig);
          return;
        }
        toast.error(message, toastConfig);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form className="flex flex-col items-center justify-center gap-6 mt-10 p-8 rounded-xl bg-gray-900 shadow-2xl w-96 border border-gray-800">
        <div className="text-2xl text-white font-bold mb-4">Sign Up</div>

        <div className="mb-4 w-full">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="sw-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200 w-full"
            id="username"
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-4 w-full">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
            id="email"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6 w-full">
          <label
            className="block text-gray-300 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition duration-200"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="button"
            onClick={(e) => handleSignUp(e)}
          >
            Sign Up
          </button>
        </div>
        <a
          onClick={() => navigate("/signin")}
          className="cursor-pointer hover:text-blue-400 text-sm text-gray-300 mt-4"
        >
          Already have an account? Login here
        </a>
      </form>
    </div>
  );
}

export default SignUp;
