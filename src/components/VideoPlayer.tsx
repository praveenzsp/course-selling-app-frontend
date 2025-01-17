import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Video } from "./CourseOverview";

function VideoPlayer() {
  const { videoId, courseId } = useParams();
  const [videoData, setVideoData] = useState<Video | null>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios.post(
        `https://course-selling-app-backend-kss6.onrender.com/content/${courseId}/${videoId}`,
        {
          userId: JSON.parse(localStorage.getItem("user") || "{}").userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setVideoData(response.data);
    };
    fetchVideo();
  }, [courseId, videoId]);

const handleKeyPresses = useCallback((event: KeyboardEvent) => {
	event.preventDefault();
	if (event.key === "ArrowRight") {
		const videoElement = document.querySelector("video");
		if (videoElement) {
			videoElement.currentTime += 5;
		}
	} else if (event.key === "ArrowLeft") {
		const videoElement = document.querySelector("video");
		if (videoElement) {
			videoElement.currentTime -= 5;
		}
	}
}, []);

  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.addEventListener("keydown", handleKeyPresses);
    }
    return () => {
      videoElement?.removeEventListener("keydown", handleKeyPresses);
    };
  }, [handleKeyPresses]);

  const getActualVideoUrl =  () => {
    const segments = videoData?.signedUrl.split("/");
    if (segments) {
      segments[2] = "d3qxp337p595mk.cloudfront.net";
      // console.log(segments);
    }
    // console.log(videoData);
    // console.log(segments?.join("/"));
    return segments?.join("/");
  };

  


  return (
    <div className="mt-40 md:mx-40 mx-5">
      <div className="flex flex-col md:flex-row justify-start items-center flex-wrap">
        <video
          controls
          src={getActualVideoUrl()}
          className="w-[100vw] h-full rounded-xl text-red-500"
          controlsList="nodownload"
          preload="auto"
        ></video>
      </div>
      <h1 className=" text-2xl md:text-5xl text-left my-8">
        {videoData?.name}
      </h1>
    </div>
  );
}

export default VideoPlayer;
