// frontend/src/components/SymbolCard/SymbolCard.tsx
import './symbolCard.css';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { memo } from 'react';
import Price from '@/components/Price';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName } = useAppSelector((state) => state.stocks.entities[id]);

  const handleOnClick = () => {
    onClick(id);
  };

  return (
    <div onClick={handleOnClick}>
      <div>
        {id} - {trend}
      </div>
      <div>Price:</div>
      <Price price={price} />
      <ListItem Icon={<CompanyIcon />} label={companyName} />
    </div>
  );
};

export default memo(SymbolCard);
