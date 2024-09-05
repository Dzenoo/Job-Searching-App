import React from "react";

const RoomsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-5 md:flex-row">
      <div className="basis-[25%]">Rooms Navbar</div>
      <div className="basis-full overflow-hidden">{children}</div>
    </div>
  );
};

export default RoomsLayout;
