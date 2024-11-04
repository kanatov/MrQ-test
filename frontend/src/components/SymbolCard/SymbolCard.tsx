import './symbolCard.css';
import TrendDown from '@/assets/down.png';
import TrendUp from '@/assets/up.png';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as IndustryIcon } from '@/assets/industry.svg';
import { ReactComponent as CapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import ListItem from '@/components/ListItem';
import { useState, memo } from 'react';
import Price from '@/components/Price';
import { selectedCard } from '@/store/dashboardOptionsSlice';
import shortNumber from 'short-number';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, companyName, marketCap, industry } = useAppSelector(
    (state) => state.stocks.entities[id]
  );

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
  const formatPrice = (price: number): number | null => {
    if (!price) return null;
    if (price >= 10) return Math.round(price);
    return parseFloat(price.toFixed(1));
  };
  return (
    <article
      onClick={handleOnClick}
      className={`symbolCard ${
        priceChange.change === 'UP'
          ? 'symbolCard__up'
          : priceChange.change === 'DOWN'
          ? 'symbolCard__down'
          : ''
      } ${isSelected ? 'symbolCard__selected' : ''} ${
        priceChange.increase25 ? 'symbolCard__shake' : ''
      }`}
    >
      <h3 className="symbolCard__header">{id}</h3>
      <section className="symbolCard__content">
        <div className="symbolCard__priceGroup">
          Price:
          <Price price={formatPrice(price)} onPriceChange={setPriceChange} />
        </div>
        <ListItem Icon={<CompanyIcon />} label={companyName} spacing="space-between" />
        <ListItem Icon={<IndustryIcon />} label={industry} spacing="space-between" />
        <ListItem Icon={<CapIcon />} label={`$${shortNumber(marketCap)}`} spacing="space-between" />
      </section>
      {trend === 'UP' ? (
        <img className="symbolCard__trendIcon" src={TrendUp} alt="Positive trend" />
      ) : trend === 'DOWN' ? (
        <img className="symbolCard__trendIcon" src={TrendDown} alt="Negative trend" />
      ) : null}
    </article>
  );
};

export default memo(SymbolCard);
