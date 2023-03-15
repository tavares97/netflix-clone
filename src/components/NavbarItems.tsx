interface NavbarItemsProps {
  label: string;
}

const NavbarItems: React.FC<NavbarItemsProps> = ({ label }) => {
  return (
    <div className="text-gray-200 text-sm cursor-pointer hover:text-gray-300">
      {label}
    </div>
  );
};
export default NavbarItems;
