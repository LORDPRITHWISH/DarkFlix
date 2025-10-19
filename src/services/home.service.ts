import { apiRequest } from "@/api/apiClient";
import type { responseData } from "@/types/video.types";

export const getVideo = (path: string = "/") => {
  const response = apiRequest<responseData>({
    method: "GET",
    url: `/action/items?folder=${path}`,
  });
  return response;
};
