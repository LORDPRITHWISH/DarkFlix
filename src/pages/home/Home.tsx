import Breadcrumbs from "@/components/Breadcrumbs";
import { getVideo } from "@/services/home.service";
import type { items } from "@/types/video.types";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
// import moment from "moment";

export default function HomePage() {
  const [searchParams] = useSearchParams();

  const folder = searchParams.get("folder");

  // console.log(getVideo());
  const [items, setItems] = useState<items[]>([]);
  useEffect(() => {
    getVideo(folder || "/")
      .then((res) => {
        // console.log("Videos fetched:", res?.data);
        if (res?.success) {
          setItems(res?.data);
        } else {
          console.error("Error fetching videos:", res?.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching videos:", err);
      });
  }, [folder]);

  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-black text-white flex">
      {/* Main Content */}
      <div className="flex-1 ml-14">
        {/* Video Grid */}
        <main className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {/* {folder ? `Contents of ${folder}` : "All Videos"} */}
            <Breadcrumbs
              path={folder || "/"}
              basePath="/?folder="
            />
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <div
                key={item.relativePath}
                className="flex flex-col cursor-pointer hover:scale-[1.02] transition-transform"
                onClick={() =>
                  navigate(
                    item.type === "file"
                      ? `/video?watch=${btoa(item.relativePath)}`
                      : `?folder=${item.relativePath}`
                  )
                }>
                <div className="w-full aspect-video bg-transparent rounded-sm overflow-hidden relative">
                  <img
                    src={
                      item.type === "file"
                        ? item.thumbnail || "/thumb.jpg"
                        : "/folder.png"
                    }
                    alt="thumbnail"
                    className=" mx-auto h-full"
                  />
                  {/* <div className=" absolute right-1.5 bottom-1.5 bg-slate-950/60  text-white text-sm  px-1.5 py-0.5 rounded">
                        {(item.duration) ? formatDuration(item.duration) : "time"}
                      </div> */}
                </div>
                <div className="mt-2 flex  gap-2  ">
                  <div className="mt-2 ">
                    {/* <p className="font-semibold text-sm leading-tight break-words whitespace-pre-wrap">
                      {item.name ?? "Untitled Video"}
                    </p> */}
                    <p className="font-semibold  leading-tight line-clamp-2 break-all">
                      {item.name ?? "Untitled Video"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
