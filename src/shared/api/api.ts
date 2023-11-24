import axios, { AxiosError } from "axios";
import { GOOGLE_API_KEY } from "shared/constants";
import { openNotificationError } from "shared/ui";

interface Result {
  formatted_address: string;
}

interface ApiResponse {
  results: Result[];
}

export const api = Object.freeze({
  getAdress: async (lat: number, lng: number): Promise<string | void> => {
    try {
      const response = await axios.get<ApiResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );

      return response.data.results[0].formatted_address;
    } catch (error) {
      if (error instanceof AxiosError) {
        openNotificationError(error.message);
      }
    }
  },
});
