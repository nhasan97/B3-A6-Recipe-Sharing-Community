import { TChildren } from "@/src/types/children.type";

const Container = ({ children }: TChildren) => {
  return (
    <div className="max-w-screen-2xl mx-auto px-5 md:px-8 lg:px-10">
      {children}
    </div>
  );
};

export default Container;
