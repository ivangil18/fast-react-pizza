import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';
// import { useState } from 'react';

function MenuItem({ pizza }) {
  // const [count, setCount] = useState(1);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const dispatch = useDispatch();

  // function handleAddPizza() {
  //   setCount((count) => count + 1);
  //   const item = {
  //     pizzaId: id,
  //     name,
  //     quantity: count,
  //     unitPrice,
  //     totalPrice: unitPrice * count,
  //   };
  //   dispatch(addItem(item));
  // }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-1.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex  items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}
          <Button
            type="small"
            onClick={() => dispatch(addItem(id, name, unitPrice))}
            disabled={soldOut}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
