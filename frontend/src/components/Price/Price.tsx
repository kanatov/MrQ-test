import { memo, useRef, useEffect } from 'react';
interface PriceProps {
  price: number | null;
  onPriceChange: (priceChange: { increase25: boolean; change: 'UP' | 'DOWN' | null }) => void;
}

const Price = ({ price, onPriceChange }: PriceProps) => {
  const previousPrice = useRef<number | null>(price);
  useEffect(() => {
    if (price !== null && previousPrice.current !== null) {
      const increase25 = price >= previousPrice.current * 1.25;
      const change =
        price > previousPrice.current ? 'UP' : price < previousPrice.current ? 'DOWN' : null;
      onPriceChange({ increase25, change });
    }
    previousPrice.current = price;
  }, [price, onPriceChange]);
  return <strong className="symbolCard__price">${price !== null ? price : '--'}</strong>;
};

export default memo(Price, (prevProps, nextProps) => prevProps.price === nextProps.price);
