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
        "http://ec2-15-207-111-167.ap-south-1.compute.amazonaws.com:8081/auth/signin",
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
    <form className="flex flex-col items-center justify-center gap-4 mt-5  p-4 rounded-md">
      <div>SignIn</div>

      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          type="password"
          placeholder="********"
          value={password}
          required
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={(e) => handleSignin(e)}
        >
          Sign In
        </button>
      </div>
      <a onClick={()=>navigate("/signup")} className="cursor-pointer hover:text-blue-600 text-sm">Create an account</a>
    </form>
  );
}

export default SignIn;
