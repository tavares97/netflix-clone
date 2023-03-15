interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="text-white px-3 text-center hover:underline">Home</div>
        <div className="text-white px-3 text-center hover:underline">
          Series
        </div>
        <div className="text-white px-3 text-center hover:underline">Films</div>
        <div className="text-white px-3 text-center hover:underline">
          New & Popular
        </div>
        <div className="text-white px-3 text-center hover:underline">
          My List
        </div>
        <div className="text-white px-3 text-center hover:underline">
          Browse by language
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
