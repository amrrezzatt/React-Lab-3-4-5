import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../redux/cartSlice';

export default function Cart() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <h2 className="text-center mt-5">Empty cart</h2>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      <p>Total items: {cartItems.reduce((total, item) => total + item.quantity, 0)}</p>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="card mb-3 p-3 d-flex flex-row align-items-center"
        >
          <img
            src={item.thumbnail}
            alt={item.title}
            style={{ width: "120px", height: "120px", objectFit: "cover" }}
          />

          <div className="ms-3 flex-grow-1">
            <h5>{item.title}</h5>
            <p>${item.price}</p>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => dispatch(decrementQuantity(item.id))}
              >
                -
              </button>
              
              <span className="fw-bold">{item.quantity}</span>
              
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                +
              </button>

              <button
                className="btn btn-danger btn-sm ms-3"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
