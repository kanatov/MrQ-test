import { memo, useRef, useEffect } from 'react';
interface PriceProps {
  price: number;
  onPriceChange: (priceChange: { increase25: boolean; change: 'UP' | 'DOWN' | null }) => void;
}

const Price = ({ price, onPriceChange }: PriceProps) => {
  const previousPrice = useRef<number>(price);
  useEffect(() => {
    const increase25 = price >= previousPrice.current * 1.25;
    const change =
      price > previousPrice.current ? 'UP' : price < previousPrice.current ? 'DOWN' : null;
    onPriceChange({ increase25, change });
    previousPrice.current = price;
  }, [price, onPriceChange]);
  return <div>{price}</div>;
};

export default memo(Price, (prevProps, nextProps) => prevProps.price === nextProps.price);
