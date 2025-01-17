import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  discount: number;
  thumbnailUrl: string;
  status: string;
  rating: number;
  progress: number;
  videos: Video[];
}

export interface Video {
  id: number;
  name: string;
  duration?: number;
  bookmark?: string;
  watchStatus?: string;
  courseId: number;
  signedUrl: string;
}

function CourseOverview() {
  const { courseId } = useParams();

  const [courseData, setCourseData] = React.useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `http://ec2-15-207-111-167.ap-south-1.compute.amazonaws.com:8081/courses/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourseData(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [courseId]);


  return (
    <div className="mt-40 mx-5">
      <h1 className=" text-2xl md:text-5xl text-center mb-10">{courseData?.name}</h1>
      <div className="flex flex-col md:flex-row justify-start items-center flex-wrap">
        {courseData?.videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))}
      </div>
    </div>
  );
}



interface VideoCardProps {
  name: string;
  id: number;
  courseId: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ id, name, courseId }) => {
  const videoId= id;
  const navigate = useNavigate();

  const handleWatchVideo = (e: React.MouseEvent<HTMLButtonElement>, videoId: number) => {
    e.preventDefault();
    console.log("video with id", videoId);
    navigate(`/courses/${courseId}/${videoId}`);
  };

  return (
    <div className="w-full md:w-1/3 h-[200px] bg-blue-950 rounded-md p-2 my-5 mx-0 md:mx-5 flex flex-col items-center justify-evenly border-[1px] border-gray-600 hover:border-[2px]">
      <span></span><h2 className="text-xl">{name}</h2>
      <button className="bg-green-600 rounded-md px-4 py-2 hover:bg-green-800" onClick={(e)=>handleWatchVideo(e, videoId)}>Watch</button>
    </div>
  );
};

export default CourseOverview;
