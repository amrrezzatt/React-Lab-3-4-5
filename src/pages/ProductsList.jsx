import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductsList() {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);
  const limit = 10;

  const fetchProducts = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_BASE_URL}/products?limit=${limit}&skip=${skip}`
    );

    setProducts(res.data.products);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchProducts();
  }, [skip]);

  const totalPages = Math.ceil(total / limit);
  const currentPage = skip / limit + 1;

  const goToPage = (page) => {
    setSkip((page - 1) * limit);
  };

  return (
    <div>
      <h2 className="mb-4">Products List</h2>

      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-4 mb-4">
            <div className="card h-100">

              <img
                src={p.thumbnail}
                className="card-img-top"
                alt={p.title}
                style={{ height: "200px", objectFit: "cover" }}
              />

              <div className="card__body">
                <h5>{p.title}</h5>
                <p className="text-muted">${p.price}</p>

                {p.stock > 0 ? (
                  <p className="status status--success">In Stock</p>
                ) : (
                  <p className="status status--error">Out of Stock</p>
                )}

                <Link className="btn btn--primary" to={`/products/${p.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>


      <nav>
        <ul className="pagination justify-content-center">

          {/* PREV */}
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => goToPage(currentPage - 1)}
            >
              Prev
            </button>
          </li>

          {/* FIRST PAGE */}
          <li className={`page-item ${currentPage === 1 ? "active" : ""}`}>
            <button className="page-link" onClick={() => goToPage(1)}>
              1
            </button>
          </li>

          {/* ... BEFORE CURRENT */}
          {currentPage > 2 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}

          {/* CURRENT PAGE */}
          {currentPage !== 1 && currentPage !== totalPages && (
            <li className="page-item active">
              <span className="page-link">{currentPage}</span>
            </li>
          )}

          {/* ... AFTER CURRENT */}
          {currentPage < totalPages - 1 && (
            <li className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          )}

          {/* LAST PAGE */}
          {totalPages > 1 && (
            <li
              className={`page-item ${currentPage === totalPages ? "active" : ""
                }`}
            >
              <button className="page-link" onClick={() => goToPage(totalPages)}>
                {totalPages}
              </button>
            </li>
          )}


          <li
            className={`page-item ${currentPage === totalPages ? "disabled" : ""
              }`}
          >
            <button
              className="page-link"
              onClick={() => goToPage(currentPage + 1)}
            >
              Next
            </button>
          </li>

        </ul>
      </nav>
    </div>
  );
}
