import useSearchParams from "@/hooks/useSearchParams";
import React from "react";

const SeekerProfileNavigation: React.FC = () => {
  const { updateSearchParams } = useSearchParams();

  const SeekerNavList = new Array(
    {
      id: "1",
      title: "Personal Information",
      params: "profile",
    },
    {
      id: "2",
      title: "Job Alerts",
      params: "alerts",
    },
    {
      id: "3",
      title: "Saved Jobs",
      params: "saved",
    },
    {
      id: "4",
      title: "My Applications",
      params: "applications",
    }
  );

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-base-black">Profile</h1>
      </div>
      <div className="flex items-center gap-3 overflow-auto">
        {SeekerNavList.map((item) => (
          <button
            className="transition cursor-pointer hover:text-[--blue-base-color] whitespace-nowrap"
            key={item.id}
            onClick={() =>
              item.id === "1"
                ? (window.location.href = "/profile")
                : updateSearchParams("typings", item.params)
            }
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export { SeekerProfileNavigation };
