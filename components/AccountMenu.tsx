import { signOut } from 'next-auth/react';

interface AccountMenuProps {
  visible?: boolean;
  user?: any;
}

const AccountMenu: React.FC<AccountMenuProps> = ({
  visible = false,
  user,
}) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img src="/images/avatar.jpg" alt="avatar" className="w-8 h-8 rounded-full object-cover" />
          <p className="text-white text-sm group-hover/item:underline">{user?.email}</p>
        </div>
      </div>
      <hr className="bg-gray-600 border-0 h-px my-4" />
      <div onClick={() => signOut()} className="px-3 text-center text-white text-sm hover:underline">
        Sign out
      </div>
    </div>
  )
};

export default AccountMenu;