import axios from "axios";

export const fetchCountries = async (): Promise<any> => {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return [];
  }
};
