import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: number;
  courseId: number;
  name: string;
  description: string;
  price: number;
  progress: number;
  status: string;
  discount: number;
  thumbnailUrl: string;
  purchasedCourseIds: number[];
}

const Card: React.FC<CardProps> = ({
  courseId,
  name,
  price,
  progress,
  status,
  discount,
  thumbnailUrl,
  purchasedCourseIds,
}) => {
  const navigate = useNavigate();
  const priceAfterDiscount = price - (price * discount) / 100;

  const handleViewCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/courses/${courseId}`, { replace: false });
  };

  const handleBuyCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/buy-course");
  };

  return (
    <div className="w-full md:w-1/3 p-10">
      <div className="bg-blue-950 shadow-md rounded-lg overflow-hidden hover:bg-indigo-900 cursor-pointer min-h-[300px]">
        <img
          className="w-full h-48 object-cover"
          src={thumbnailUrl}
          alt={`${name} thumbnail`}
        />
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          {!purchasedCourseIds.includes(courseId) && (
            <p>
              Price : <span className="line-through mr-2">₹{price}</span>
              <span>₹{priceAfterDiscount}</span>
              <span className="text-blue-500 font-semibold ml-2">
                {discount}% off
              </span>
            </p>
          )}
          {purchasedCourseIds.includes(courseId) && (
            <p>
              Status: {status == "NOTSTARTED" ? "Not started" : "In progress"}
            </p>
          )}
          <p className=" mb-2">Progress: {progress}%</p>
          {purchasedCourseIds.includes(courseId) ? (
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-1"
              onClick={(e) => {
                handleViewCourse(e);
              }}
            >
              View course
            </button>
          ) : (
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-1"
              onClick={(e) => {
                handleBuyCourse(e);
              }}
            >
              Buy course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function Home() {
  const [allCourses, setAllCourses] = React.useState<CardProps[]>([]);
  const [error, setError] = React.useState<boolean | null>(false);
  const [purchasedCourses, setPurchasedCourses] = React.useState<CardProps[]>(
    []
  );
  console.log(JSON.parse(localStorage.getItem("user") || "{}").userId);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get("http://ec2-15-207-111-167.ap-south-1.compute.amazonaws.com:8081/courses", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAllCourses(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    }
    fetchCourses();
  }, []);

  useEffect(() => {
    async function fetchPurchasedCourses() {
      try {
        const userId = JSON.parse(localStorage.getItem("user") || "{}").userId;
        const response = await axios.get(
          `http://ec2-15-207-111-167.ap-south-1.compute.amazonaws.com:8081/courses/purchased?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setPurchasedCourses(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchPurchasedCourses();
  }, []);

  const purchasedCourseIds = purchasedCourses.map((course) => course.courseId);
  const allCourseIds = allCourses.map((course) => course.id);

  return (
    <>
      {error ? (
        <div>
          <h1>Something went wrong!</h1>
        </div>
      ) : (
        <div className="mt-40" id="courses">
          <h1 className="text-4xl text-center my-10">
            Hi {JSON.parse(localStorage.getItem("user") || "{}").username},
            welcome to Rompalli Harish's cohort
          </h1>
          <div className="flex flex-col items-center justify-start md:flex-row flex-wrap">
            {allCourses.map((course, ind) => (
              <Card
                key={course.courseId}
                {...course}
                purchasedCourseIds={purchasedCourseIds}
                courseId={allCourseIds[ind]}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
