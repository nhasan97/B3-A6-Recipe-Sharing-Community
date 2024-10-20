const NoData = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-[#757575] text-2xl sm:text-3xl lg:text-3xl font-semibold">
        {text}
      </h1>
    </div>
  );
};

export default NoData;
