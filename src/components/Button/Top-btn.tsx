import { FaArrowUp } from 'react-icons/fa';

const TopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 z-50 rounded-[50%] w-[60px] h-[60px] shadow-lg bg-primary text-white border-0 hover:bg-primary/80 transition-all duration-75"
    >
      <FaArrowUp size={24} />
    </button>
  );
};

export default TopButton;