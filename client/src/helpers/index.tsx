import { Button } from "@/components/ui/button";

export const renderIconText = <
  T extends { data: string | number; icon: React.JSX.Element; id: string }
>({
  icon,
  data,
  id,
}: T) => {
  return (
    <div key={id} className="flex items-center gap-3">
      <div>{icon}</div>
      <div>
        <p className="text-initial-gray">{data}</p>
      </div>
    </div>
  );
};

export const renderSkills = <
  T extends {
    [key: string]: string[];
  }
>(
  categorizedSkills: T
) => {
  return (
    <div className="py-3 flex gap-6 flex-wrap">
      {Object.entries(categorizedSkills).map(
        ([category, skills]) =>
          skills.length > 0 && (
            <div key={category} className="flex flex-col gap-3">
              <div>
                <h1 className="font-bold">{category}</h1>
              </div>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Button variant="outline" key={index}>
                    {skill}
                  </Button>
                ))}
              </div>
            </div>
          )
      )}
    </div>
  );
};
