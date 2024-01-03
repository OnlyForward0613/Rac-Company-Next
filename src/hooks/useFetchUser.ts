import axios from "axios";
import { type UserType } from "~/contexts/AuthContext";

const useFetchUser = async (token: string) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/users/profile",
    method: "GET",
    headers: headersList,
  };

  const response = await axios.request(reqOptions);
  return response.data as UserType;
};

export default useFetchUser;
