interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  visible = false,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="absolute flex-col top-8 left-0 w-56 h-full bg-zinc-900 bg-opacity-90">
      <div className="flex flex-col gap-4">
        <div className="text-white cursor-pointer hover:text-gray-300 transition text-cetner px-3">
          Home
        </div>
        <div className="text-white cursor-pointer hover:text-gray-300 transition text-cetner px-3">
          Movies
        </div>
        <div className="text-white cursor-pointer hover:text-gray-300 transition text-cetner px-3">
          Series
        </div>
        <div className="text-white cursor-pointer hover:text-gray-300 transition text-cetner px-3">
          My List
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;