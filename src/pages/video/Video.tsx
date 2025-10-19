
import { useSearchParams } from "react-router";
// import { getVideo } from "@/services/video.service";
// import { GrEdit } from "react-icons/gr";

// import channelPic from "@/assets/channel.jpg";
// import userPic from "@/assets/user.jpg";

export default function WatchPage() {
  const [searchParams] = useSearchParams();

  const videoID = searchParams.get("watch");

  const videoURL = `${
    import.meta.env.VITE_API_URL
  }/api/v1/video/watch/${videoID}`;

  const location = atob(videoID || "");

  const videoName = location.split("/").pop();

  // const { videoid } = useParams();
  // const [videoDetails, setVideoDetails] = React.useState(null);

  // useEffect(() => {
  //   // Fetch video details using videoid
  //   const fetchVideoDetails = async () => {
  //     // if (!videoid) return;
  //     // const response = await getVideo(videoid || ""); // Fetch video details

  //     setVideoDetails(response?.data);
  //   };

  //   fetchVideoDetails();
  // }, [videoid]);

  // const videoID =

  // const navigate = useNavigate();

  return (
    <div className="w-screen max-h-screen text-white flex ml-10 ">
      {/* LEFT: Main content */}
      {/* <div className="flex-1 p-4 max-w-[calc(100%-100px)] "> */}
      <div className="flex flex-col flex-1 p-4 h-[calc(100vh-100px)] max-w-[calc(100%-100px)]">
        <div className="flex-grow bg-black border border-blue-950 rounded-xl overflow-hidden">
          <video
            className="w-full h-full object-contain"
            controls
            autoPlay
            src={videoURL}
          />
        </div>

        <div className="mt-2">
          <h1 className="text-2xl font-semibold">
            {videoName || "Corrupting title..."}
          </h1>
        </div>
      </div>
    </div>
  );
}
