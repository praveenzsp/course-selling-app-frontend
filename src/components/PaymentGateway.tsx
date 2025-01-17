import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Bounce, toast } from "react-toastify";


function PaymentGateway() {
  const { courseId } = useParams();
  const navigate= useNavigate();
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

  // console.log(JSON.parse(localStorage.getItem("user") || "{}").userId, courseId);
  const handleBuyCourse = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `https://course-selling-app-backend-kss6.onrender.com/courses/buyCourse`,
        {
          userId: JSON.parse(localStorage.getItem("user") || "{}").userId,
          courseId: parseInt(courseId as string)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // console.log("response is", response);

      if(response.status==200){
        toast.success(response.data.message, toastConfig);
        navigate(`/courses/${courseId}`, {replace: true});
      }
      else{
        toast.error(response.data.message, toastConfig);
      }
    } catch (err) {
      console.log(err);
      toast.error("Purchase failed", toastConfig);
    }
  };
  return (
    <div className="text-center flex-col justify-center items-center mt-[30%] text-xl">
      <h1></h1>
      <p>This is just a dummy buy button</p>
      <button
        className="px-4 py-2 bg-blue-600 rounded-lg mt-4"
        onClick={handleBuyCourse}
      >
        Buy course
      </button>
    </div>
  );
}

export default PaymentGateway;
