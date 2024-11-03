// frontend/src/components/SymbolCard/SymbolCard.tsx
import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { useState, memo } from 'react';
import Price from '@/components/Price';
import { selectedCard } from '@/store/dashboardOptionsSlice';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, marketCap } = useAppSelector((state) => state.stocks.entities[id]);

  const [priceChange, setPriceChange] = useState<{
    increase25: boolean;
    change: 'UP' | 'DOWN' | null;
  }>({
    increase25: false,
    change: null
  });

  const handleOnClick = () => {
    onClick(id);
  };
  const isSelected = useAppSelector(selectedCard) === id;

  return (
    <div
      onClick={handleOnClick}
      className={`symbol-card ${
        priceChange.change === 'UP'
          ? 'symbolCard__up'
          : priceChange.change === 'DOWN'
          ? 'symbolCard__down'
          : ''
      } ${priceChange.increase25 ? 'symbolCard__shake' : ''} ${
        isSelected ? 'symbolCard__selected' : ''
      }`}
    >
      <div>
        {id} - {trend}
      </div>
      <div>Price:</div>
      <Price price={price} onPriceChange={setPriceChange} />
      <ListItem Icon={<CompanyIcon />} label={companyName} />
      <div>Market Cap: {marketCap}</div>
    </div>
  );
};

export default memo(SymbolCard);
