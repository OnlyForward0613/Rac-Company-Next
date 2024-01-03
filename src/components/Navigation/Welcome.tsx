/* eslint-disable @next/next/no-img-element */
import { useAuthContext } from "~/contexts/AuthContext";

const Welcome = () => {
  const { user } = useAuthContext();

  return (
    <div className="mb-[28px] max-w-[253px] rounded-r-[20px] bg-neutral-100 bg-opacity-[8%]">
      <div className="flex items-center gap-[10px] px-[10px] py-[18px]">
        <img
          src={"https://placehold.co/400x400/cac4d0/1d192b?text=R&font=roboto"}
          alt="user image"
          className="h-[40px] w-[40px] rounded-full bg-gray-500"
        />
        <div className="flex flex-col gap-0 text-gray-100">
          <span className="body-md">Welcome back,</span>
          <span>{user?.firstName}</span>
          <div className="body-lg flex gap-[10px]">
            <span className="font-bold text-white">
              ID: {user?.racId?.toUpperCase()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
