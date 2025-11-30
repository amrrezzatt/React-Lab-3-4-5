import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  const fetchProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/products/${id}`);
    setProduct(res.data);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!product) return <h3>Loading...</h3>;

  return (
    <div className="row">
      <div className="col-md-6">
        <img src={product.thumbnail} className="img-fluid" alt={product.title} />
      </div>

      <div className="col-md-6">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <h4>${product.price}</h4>

        <button
          className="btn btn--primary mt-3"
          onClick={() => dispatch(addToCart(product))}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
