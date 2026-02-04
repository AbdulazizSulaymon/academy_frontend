import { Button, Spin } from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { FaChevronLeft } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

import { Box } from '@components/box';
import { Link } from '@components/link';

const BottomSheet = ({ isOpen, onClose, children }: any) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Sheet */}
          <motion.div
            className="relative w-full max-w-md bg-white rounded-t-2xl p-4 z-50"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', bounce: 0.2 }}
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const ProductDetailComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState('');
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('Green');
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Green', 'Black', 'White'];

  useEffect(() => {
    if (id) {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setSelectedPhoto(data.images?.[0] || '');
          setLoading(false);
        })
        .catch((error) => {
          console.error('Xatolik:', error);
          setLoading(false);
        });
    }
  }, [id]);

  const handleQuantityChange = (type: 'inc' | 'dec') => {
    setQuantity((prev) => (type === 'inc' ? prev + 1 : prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center mt-10 text-red-600 font-semibold">Mahsulot topilmadi</div>;
  }

  return (
    <Box>
      <div className="max-w-3xl mx-auto p-4">
        <Link href="/admin/new-design">
          <Button className="bg-gray-200 text-black font-bold py-2 px-4 rounded-full w-12 h-12 mb-4">
            <FaChevronLeft size={20} />
          </Button>
        </Link>

        <div className="bg-white shadow-md p-4 rounded-lg max-w-sm mx-auto sm:block hidden">
          {/* Gallery */}
          <div className="flex space-x-2 overflow-x-auto mb-4">
            {product.images?.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Product ${index}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                  selectedPhoto === img ? 'border-black' : 'border-transparent'
                }`}
                onClick={() => setSelectedPhoto(img)}
              />
            ))}
          </div>

          {/* Main image */}
          <img src={selectedPhoto} alt={product.title} className="w-full h-56 object-cover rounded-md mb-4" />

          {/* Title, desc, price */}
          <h2 className="text-lg font-semibold">{product.title}</h2>
          <p className="text-gray-600 text-sm">{product.description}</p>
          <div className="mt-2 text-base font-bold text-purple-600">${product.price}</div>

          {/* Size */}
          <div className="mt-4">
            <label className="text-sm text-gray-600 mb-1 block">Size</label>
            <button
              onClick={() => setIsSizeOpen(true)}
              className="w-full border-none bg-gray-100 py-2 px-3 rounded-lg text-left"
            >
              {selectedSize}
            </button>
          </div>

          {/* Color */}
          <div className="mt-4">
            <label className="text-sm text-gray-600 mb-1 block">Color</label>
            <button
              onClick={() => setIsColorOpen(true)}
              className="w-full bg-gray-100 py-2 px-3 rounded-lg text-left flex items-center justify-between border-none"
            >
              <span>{selectedColor}</span>
              <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedColor.toLowerCase() }} />
            </button>
          </div>

          {/* Quantity */}
          <div className="mt-4">
            <span className="text-sm text-gray-600 mb-1 block">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange('dec')}
                className="w-8 h-8 rounded-full border-none   bg-purple-100 text-purple-700 flex items-center justify-center"
              >
                <AiOutlineMinus size={16} className={'font-bold'} />
              </button>
              <span className="w-6 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('inc')}
                className="w-8 h-8 rounded-full border-none  bg-purple-100 text-purple-700 flex items-center justify-center"
              >
                <AiOutlinePlus size={16} className={'font-bold'} />
              </button>
            </div>
          </div>
        </div>

        {/* Size Bottom Sheet */}
        <BottomSheet isOpen={isSizeOpen} onClose={() => setIsSizeOpen(false)}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Size</h3>
            <IoClose size={24} onClick={() => setIsSizeOpen(false)} className="cursor-pointer" />
          </div>
          {sizes.map((size) => (
            <button
              key={size}
              className={`w-full text-left px-4 py-2 rounded-full mb-2 ${
                selectedSize === size ? 'bg-purple-500 text-white border-none' : 'bg-gray-100 border-none'
              }`}
              onClick={() => {
                setSelectedSize(size);
                setIsSizeOpen(false);
              }}
            >
              {size}
            </button>
          ))}
        </BottomSheet>

        {/* Color Bottom Sheet */}
        <BottomSheet isOpen={isColorOpen} onClose={() => setIsColorOpen(false)}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Color</h3>
            <IoClose size={24} onClick={() => setIsColorOpen(false)} className="cursor-pointer" />
          </div>
          {colors.map((color) => (
            <button
              key={color}
              className={`w-full flex items-center justify-between px-4 py-2 rounded-full mb-2 ${
                selectedColor === color ? 'bg-purple-500 text-white border-none' : 'bg-gray-100 border-none'
              }`}
              onClick={() => {
                setSelectedColor(color);
                setIsColorOpen(false);
              }}
            >
              <span>{color}</span>
              <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.toLowerCase() }} />
            </button>
          ))}
        </BottomSheet>
      </div>
    </Box>
  );
};
