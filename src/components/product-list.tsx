import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { FaLeftLong } from 'react-icons/fa6';

import { Link } from '@components/link';

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products') // yoki sizning API URL'ingiz
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Xatolik:', error));
  }, []);

  return (
    <div>
      <div className={'mx-auto max-w-4xl'}>
        <Link href={'/admin/new-design'}>
          <Button className="bg-gray-300 text-white font-bold py-2 px-4 rounded-full w-12 h-12 mb-4">
            <FaChevronLeft size={20} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-3 max-w-4xl mx-auto">
        {products.map((product: any) => (
          <Link href={`/admin/product/${product.id}`} key={product.id}>
            <div key={product.id} className="border rounded-lg p-4 shadow hover:shadow-md transition w-56 bg-gray-200">
              <img src={product.thumbnail} alt={product.title} className="h-40 w-full object-cover rounded" />
              <h3 className="text-sm mt-2 text-black">{product.title}</h3>
              <p className="text-black font-bold mt-1">${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
