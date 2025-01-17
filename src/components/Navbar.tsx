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
    <div className="w-full h-20  fixed top-0 z-10 flex flex-row justify-between items-center px-10 border-b-[1px] border-gray-500 bg-blue-950">
      <div>
        <p className="text-2xl">Rompalli Harish</p>
      </div>

      <div className="flex flex-row justify-between items-center w-1/4">
        <a>About</a>
        <a onClick={() => navigate("/")} className="cursor-pointer">
          Courses
        </a>
        <button
          onClick={(e) => handleLogout(e)}
          className="bg-red-900 py-1 px-1 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;
