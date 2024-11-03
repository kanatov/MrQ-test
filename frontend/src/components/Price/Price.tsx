import { memo, useRef, useEffect } from 'react';
interface PriceProps {
  price: number;
}

const Price = ({ price }: PriceProps) => {
  const previousPrice = useRef<number>(price);
  useEffect(() => {
    previousPrice.current = price;
  }, [price]);
  return <div>{price}</div>;
};

export default memo(Price, (prevProps, nextProps) => prevProps.price === nextProps.price);
