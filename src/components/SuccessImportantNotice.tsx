const SuccessImportantNotice = () => {
  return (
    <div className="flex flex-col gap-[20px] rounded-[20px] bg-error-200 px-[28px] py-[20px]">
      <span className="title-lg font-bold text-primary-900">
        IMPORTANT NOTICE:
      </span>
      <p className="title-lg text-gray-700">
        You will make payment for your shipping once it arrives our office in
        Nigeria (your selected <b>&quot;Destination&quot;</b>) before you can
        clear it.
      </p>
    </div>
  );
};
export default SuccessImportantNotice;
