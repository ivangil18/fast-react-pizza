import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartTotalCount, getCartTotalPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalPizzas = useSelector(getCartTotalCount);
  const bill = useSelector(getCartTotalPrice);


  if (!totalPizzas) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-4 ">
        <span>{totalPizzas} pizzas</span>
        <span>{formatCurrency(bill)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
