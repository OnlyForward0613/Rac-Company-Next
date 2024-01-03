type LabelIdProps = { label: string; id: string };

const LabelId = ({ label, id }: LabelIdProps) => {
  return (
    <div className="title-lg md:headline-sm flex items-center gap-[5px] text-neutral-900">
      <span>{label}:</span>
      <span className="font-bold">{id}</span>
    </div>
  );
};

export default LabelId;
