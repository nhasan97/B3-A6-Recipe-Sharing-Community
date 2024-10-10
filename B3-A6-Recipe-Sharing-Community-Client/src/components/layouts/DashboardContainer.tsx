import { TChildren } from "@/src/types/children.type";

const DashboardContainer = ({ children }: TChildren) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-5 md:p-10 2xl:p-20 overflow-auto border border-red-600">
      {children}
    </div>
  );
};

export default DashboardContainer;
