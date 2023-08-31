import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ itemId, itemQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button
        type="round"
        onClick={() => dispatch(decreaseItemQuantity(itemId))}
      >
        -
      </Button>
      <span className="text-sm font-semibold">{itemQuantity}</span>
      <Button
        type="round"
        onClick={() => dispatch(increaseItemQuantity(itemId))}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
