import { useEffect } from 'react';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import { selectedCard, setSelectedCard } from '@/store/dashboardOptionsSlice';

const SymbolsGrid = () => {
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
  const isSelected = useAppSelector(selectedCard);
  const dispatch = useAppDispatch();
  const onSymbolClick = (symbolId: string) => {
    dispatch(setSelectedCard(isSelected === symbolId ? null : symbolId));
  };
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className={`symbolsView__cards ${isSelected ? 'symbolsView__cards-selected' : ''}`}>
      {stockSymbols.map((id, i) => (
        <SymbolCard price={prices[id]} onClick={onSymbolClick} key={i} id={id} />
      ))}
    </div>
  );
};

export default memo(SymbolsGrid);
