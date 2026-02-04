import { Avatar } from 'antd';
import { FiChevronRight } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';

import { BotFooter } from '@components/bot-footer';

export const ProfileComponent = () => {
  return (
    <div className="max-w-md mx-auto py-10 px-4 text-center">
      {/* Profile image */}
      <div className="flex justify-center">
        {/*<RxAvatar className="h-20 w-20 rounded-full" />*/}
        <Avatar style={{ backgroundColor: '#8e6cef' }} className="h-16 w-16 rounded-full text-2xl">
          R A
        </Avatar>
      </div>

      {/* User Info Card */}
      <div className="mt-4 bg-gray-100 rounded-xl p-4 text-left">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Robert Alexis</h2>
            <p className="text-sm text-gray-600">robertalexis@gmail.com</p>
            <p className="text-sm text-gray-600">121-224-7890</p>
          </div>
          <span className="text-sm text-[#8e6cef] cursor-pointer font-medium">Edit</span>
        </div>
      </div>

      {/* Settings Options */}
      <div className="mt-6 space-y-3 text-left">
        {['Address', 'Wishlist', 'Payment', 'Help', 'Support'].map((item) => (
          <div
            key={item}
            className="flex justify-between items-center bg-gray-100 py-3 px-4 rounded-xl cursor-pointer hover:bg-gray-200 transition"
          >
            <span className="text-base">{item}</span>
            <FiChevronRight className="text-gray-500 text-xl" />
          </div>
        ))}
      </div>

      {/* Sign Out */}
      <div className="mt-8 mb-20">
        <span className="text-red-500 font-semibold cursor-pointer">Sign Out</span>
      </div>
      <BotFooter />
    </div>
  );
};
