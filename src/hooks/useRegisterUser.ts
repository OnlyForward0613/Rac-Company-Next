import axios from "axios";
import { type RegisterType, type UserType } from "~/contexts/AuthContext";

const useRegisterUser = async (inputs: RegisterType) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/users/",
    method: "POST",
    headers: headersList,
    data: inputs,
  };

  const response = await axios.request(reqOptions);
  return response.data as UserType;
};

export default useRegisterUser;
