import axios from "axios";
import { type LoginInputs } from "~/components/Forms/Login/LoginForm";
import { type UserType } from "~/contexts/AuthContext";

const useLoginUser = async (inputs: LoginInputs) => {
  const headersList = {
    Accept: "*/*",
    "Content-Type": "application/json",
  };

  const reqOptions = {
    url: "https://rac-backend.onrender.com/api/users/auth",
    method: "POST",
    headers: headersList,
    data: inputs,
  };

  const response = await axios.request(reqOptions);
  return response.data as UserType;
};

export default useLoginUser;
