import { useNavigate } from "react-router-dom";
import React from "react";

function Admin() {
  const navigate = useNavigate();
  const allCourses = [
    { id: 1, name: "Course 1", description: "Course 1 description" },
    { id: 2, name: "Course 2", description: "Course 2 description" },
    { id: 3, name: "Course 3", description: "Course 3 description" },
  ];

  const handleUpdateCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate("/admin/update-course");
  };

  const handleAddCourse = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleUploadVideo = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-5">
      <h1 className="text-6xl">Welcome back Admin</h1>
      <div className="flex flex-row gap-4 my-10">
        <button
          className="py-3 px-2 bg-blue-500 rounded-md"
          onClick={(e) => handleAddCourse(e)}
        >
          Add a course
        </button>
        <button
          className="py-3 px-2 bg-blue-500 rounded-md"
          onClick={(e) => handleUploadVideo(e)}
        >
          Upload a video
        </button>
      </div>

      <div className="my-10">
        <h2 className="text-4xl my-4 text-center">
          Here are all the available courses
        </h2>
        <div className="flex gap-4 flex-wrap justify-center items-center">
          {allCourses.map((course) => (
            <div
              key={course.id}
              className="flex flex-col gap-2 p-4 bg-blue-900 rounded-md min-w-[300px] h-[200px] justify-center items-center"
            >
              <h3 className="text-2xl">{course.name}</h3>
              <p>{course.description}</p>
              <button
                className="py-2 px-2 bg-red-500 rounded-md"
                onClick={(e) => handleUpdateCourse(e)}
              >
                Update course details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;
