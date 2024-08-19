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
