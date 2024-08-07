export const MenuItemsContainer: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return <div className="flex flex-col items-center gap-5">{children}</div>;
};
