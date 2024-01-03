/* eslint-disable @next/next/no-img-element */
type CongratulationImageProps = { text: string };

const CongratulationImage = ({ text }: CongratulationImageProps) => {
  return (
    <div className="flex flex-col-reverse gap-[10px] rounded-[20px] bg-primary-600 px-[21px] py-[15px] md:flex-row md:px-[14px] md:py-[10px]">
      <img
        src="/images/drone_flying_with_package.png"
        alt="drone flying with package"
        className="md:w-1/2"
      />
      <div className="flex flex-col justify-center gap-[10px] text-white">
        <span className="title-lg md:headline-md font-bold">
          Congratulations!
        </span>
        <span className="title-lg md:headline-md">{text}</span>
      </div>
    </div>
  );
};

export default CongratulationImage;
