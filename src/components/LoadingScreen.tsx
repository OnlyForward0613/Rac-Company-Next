import Logo from "~/components/Logo";

const LoadingScreen = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand">
      <div className="container flex flex-col items-center justify-center px-14 py-16">
        <Logo />
        <svg className="circular-loader relative h-[100px] w-[100px]">
          <circle
            className="path stroke-primary-200"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            strokeWidth="5"
            strokeMiterlimit="10"
          ></circle>
        </svg>
      </div>
    </main>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg className="circular-loader relative h-[50px] w-[50px]">
        <circle
          className="path stroke-primary-600"
          cx="25"
          cy="25"
          r="10"
          fill="none"
          strokeWidth="3"
          strokeMiterlimit="5"
        ></circle>
      </svg>
    </div>
  );
};

export default LoadingScreen;
