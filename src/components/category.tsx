import { Button } from 'antd';
import React from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import { Box } from '@components/box';
import { Link } from '@components/link';

const categories = [
  { id: 1, name: 'Electronics', image: 'https://picsum.photos/200' },
  { id: 2, name: 'Clothes', image: 'https://picsum.photos/201' },
  { id: 3, name: 'Furniture', image: 'https://picsum.photos/202' },
  { id: 4, name: 'Shoes', image: 'https://picsum.photos/203' },
  { id: 5, name: 'Others', image: 'https://picsum.photos/204' },
  { id: 6, name: 'Books', image: 'https://picsum.photos/205' },
];

export const CategoryList = () => {
  return (
    <>
      <div className={'mx-auto max-w-[250px]'}>
        <Link href="/admin/new-design">
          <Button className="text-xl mb-2 text-black rounded-full bg-gray-100 p-2 w-12 h-12 flex items-center justify-center hover:bg-gray-200">
            <FaChevronLeft />
          </Button>
        </Link>
        <h2 className="text-xl font-bold">Shop by Categories</h2>
      </div>
      <div className="p-4 flex flex-col items-center">
        <div className="flex flex-col gap-3">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center justify-start bg-gray-200 rounded-xl px-4 py-3 w-[320px] shadow-sm cursor-pointer hover:bg-gray-200">
              <img src={cat.image} alt={cat.name} className="w-16 h-16 object-contain mr-4 rounded-lg" />
              <span className="text-base font-medium flex-grow text-left">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
