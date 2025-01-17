import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to logout?")) {
      return;
    }
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  return (
    <div className="w-full h-20 fixed top-0 z-10 flex flex-row justify-between items-center px-4 md:px-10 border-b-[1px] border-gray-500 bg-transparent shadow-lg rounded-b-lg bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <div>
        <p className="text-xl md:text-2xl font-bold text-white">Rompalli Harish</p>
      </div>

      <div className="flex flex-row justify-between items-center space-x-2 md:space-x-16">
        <a className="text-white hover:text-gray-300 transition duration-300">About</a>
        <a onClick={() => navigate("/")} className="cursor-pointer text-white hover:text-gray-300 transition duration-300">
          Courses
        </a>
        <button
          onClick={(e) => handleLogout(e)}
          className="bg-transparent hover:bg-red-600 text-white py-1 px-2 md:py-2 md:px-4 rounded-md transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
