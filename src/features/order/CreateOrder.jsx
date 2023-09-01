import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { clearCart, getCart, getCartTotalPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);
  const cartTotalPrice = useSelector(getCartTotalPrice);
  const {
    userName,
    status: addressStatus,
    address,
    position,
    error: addressError,
  } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  // useActionData hook allows to get any data available as result of the action perfomed related to the route and the component
  const formErrors = useActionData();

  const priorityCost = withPriority ? cartTotalPrice * 0.2 : 0;
  const totalCost = cartTotalPrice + priorityCost;
  const isSubmitting = navigation.state === 'submitting';
  const addressIsLoading = addressStatus === 'loading';

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          {/* React router encourage to use the normal html "require" for input fields for basic validation. More complex valitadation can be performed before submitting the form as shown below */}
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
              defaultValue={address}
              disabled={addressIsLoading}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-200 p-2 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          <span className="absolute right-[3px] top-[3px] z-50 md:right-[5px] md:top-[5px]">
            {!position.longitude && !position.latitude && (
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={addressIsLoading}
              >
                Get Address
              </Button>
            )}
          </span>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {/* this type of input allow to add data to the Form (provided by React Router) without the needs of a form field. All data needs to be converted to text */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.longitude}, ${position.latitude}`
                : ''
            }
          />

          <Button type="primary" disabled={isSubmitting || addressIsLoading}>
            {isSubmitting
              ? 'Placing Order...'
              : `Order now from ${formatCurrency(totalCost)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
//actions are use to modify data with React Router (POST, PATCH, DELETE)
export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  //error handling/validation
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please provide a valid phone number. We might need to contact you';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok, create new order and redirect

  //createOrder() will return the order created as a response
  const newOrder = await createOrder(order);
  console.log(order);
  //this tecnique should no be overuse because it turns off some optimization actions
  store.dispatch(clearCart());

  //redirect() is an altenative to navigate that can be used in regular functions (no component functions)
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
