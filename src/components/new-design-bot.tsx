import { Avatar, Button, Input, Select } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { CiHeart } from 'react-icons/ci';
import { FaRegUserCircle } from 'react-icons/fa';
import { FaBell, FaHeart, FaHome, FaSearch, FaShoppingBag, FaUser } from 'react-icons/fa';

import { BotFooter } from '@components/bot-footer';

function NewDesignBot() {
  const categories = [
    { id: 1, name: 'Electronics', image: 'https://picsum.photos/200' },
    { id: 2, name: 'Clothes', image: 'https://picsum.photos/201' },
    { id: 3, name: 'Furniture', image: 'https://picsum.photos/202' },
    { id: 4, name: 'Shoes', image: 'https://picsum.photos/203' },
    { id: 5, name: 'Others', image: 'https://picsum.photos/204' },
    { id: 6, name: 'Books', image: 'https://picsum.photos/205' },
    { id: 7, name: 'Sports', image: 'https://picsum.photos/206' },
    { id: 8, name: 'Toys', image: 'https://picsum.photos/207' },
    { id: 9, name: 'Jewelry', image: 'https://picsum.photos/208' },
    { id: 10, name: 'Home Decor', image: 'https://picsum.photos/209' },
  ];

  const products = [
    {
      id: 1,
      title: 'Smartphone',
      price: 599,
      images: ['https://picsum.photos/205'],
      description: 'Latest smartphone with advanced features',
    },
    {
      id: 2,
      title: 'Laptop',
      price: 999,
      images: ['https://picsum.photos/206'],
      description: 'Powerful laptop for work and gaming',
    },
    {
      id: 3,
      title: 'Headphones',
      price: 99,
      images: ['https://picsum.photos/207'],
      description: 'High-quality wireless headphones',
    },
    {
      id: 4,
      title: 'Smart Watch',
      price: 199,
      images: ['https://picsum.photos/208'],
      description: 'Modern smartwatch with health tracking',
    },
    {
      id: 5,
      title: 'Camera',
      price: 499,
      images: ['https://picsum.photos/209'],
      description: 'Professional digital camera',
    },
    {
      id: 6,
      title: 'Speaker',
      price: 149,
      images: ['https://picsum.photos/210'],
      description: 'Wireless bluetooth speaker',
    },
    {
      id: 7,
      title: 'Tablet',
      price: 299,
      images: ['https://picsum.photos/211'],
      description: 'Versatile tablet for entertainment',
    },
    {
      id: 8,
      title: 'Mouse',
      price: 29,
      images: ['https://picsum.photos/212'],
      description: 'Ergonomic wireless mouse',
    },
    {
      id: 9,
      title: 'Keyboard',
      price: 59,
      images: ['https://picsum.photos/213'],
      description: 'Mechanical gaming keyboard',
    },
    {
      id: 10,
      title: 'Monitor',
      price: 299,
      images: ['https://picsum.photos/214'],
      description: 'High resolution display monitor',
    },
  ];

  const [favorites, setFavorites] = useState({});

  return (
    <div className="w-full max-w-sm mx-auto min-h-screen font-sans bg-white text-gray-800">
      <div className="flex items-center justify-between p-4">
        <Avatar size={40} icon={<FaRegUserCircle />} src="https://randomuser.me/api/portraits/men/1.jpg" />
        <div className="flex items-center gap-4">
          <span className={'bg-gray-200 p-2 w-14 flex items-center justify-center rounded-full'}>Men</span>
        </div>
        <div className="bg-purple-500 w-10 h-10 flex items-center justify-center rounded-full text-white">
          <FaShoppingBag size={20} />
        </div>
      </div>

      <div className="px-4">
        <Input
          placeholder="Search"
          prefix={<FaSearch className="text-gray-500" />}
          className="rounded-lg bg-gray-300 border-none"
        />
      </div>

      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-800">Categories</h2>
          <Link href="/admin/categories">
            <Button type="link" size="small">
              See All
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {categories.slice(0, 5).map((category) => (
            <div key={category.id} className="flex flex-col items-center min-w-max ">
              <div className="w-14 h-14 rounded-full flex items-center justify-center bg-gray-100 ">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-[50px] h-[50px] rounded-full object-contain"
                />
              </div>
              <span className="text-xs mt-1">{category.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-gray-800">Top Selling</h2>
          <Link href="/admin/product">
            <Button type="link" size="small">
              See All
            </Button>
          </Link>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {products.map((item) => (
            <div key={item.id} className="min-w-[140px] bg-gray-50 rounded-lg overflow-hidden">
              <img src={item.images[0]} alt={item.title} className="w-full object-contain" />
              <div className={'mt-5 px-2'}>
                <h3 className="text-sm leading-tight text-black font-bold">{item.title}</h3>
                <span>{item.description}</span>
                <div className={'flex items-center justify-between'}>
                  <p className="text-sm font-semibold text-gray-900 mt-2">${item.price}</p>
                  {/*<Button type="text" className="absolute top-2 right-2">*/}
                  {/*  <FaHeart size={18} color={favorites ? 'red' : 'gray'} />*/}
                  {/*</Button>*/}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 mt-6 mb-10">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-purple-600">New In</h2>
          <Button type="link" size="small">
            See All
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {products.slice(6, 10).map((item) => (
            <div key={item.id} className="min-w-[140px] bg-gray-50 rounded-lg overflow-hidden">
              <img src={item.images[0]} alt={item.title} className="w-full object-contain" />
              <div className={'mt-5 px-2'}>
                <h3 className="text-sm leading-tight text-black font-bold">{item.title}</h3>
                <span>{item.description}</span>
                <div className={'flex items-center justify-between'}>
                  <p className="text-sm font-semibold text-gray-900 mt-2">${item.price}</p>
                  {/*<Button type="text" className="text-gray-600">*/}
                  {/*  <AiOutlineHeart size={24} color={favorites ? 'red' : 'gray'} />*/}
                  {/*</Button>*/}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BotFooter />
    </div>
  );
}

export default NewDesignBot;
