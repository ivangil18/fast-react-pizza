import { formatCurrency } from '../../utils/helpers';

import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="sm: flex py-3 sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
        {quantity >= 5 && (
          <span className="ml-3 rounded-md bg-green-700 px-3 py-1 text-xs uppercase text-green-50">
            Special Order!
          </span>
        )}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="small font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity itemId={pizzaId} itemQuantity={quantity} />
        <DeleteItem itemId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
