type FormHeaderProps = { title: string; subTitle?: string | JSX.Element };

const FormHeader = ({ title, subTitle }: FormHeaderProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-[10px]">
      <h1 className="title-lg uppercase text-gray-500">{title}</h1>
      <span className="body-lg max-w-[480px] text-center text-neutral-500">
        {subTitle}
      </span>
    </div>
  );
};

export default FormHeader;
