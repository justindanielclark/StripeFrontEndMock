import { Suspense } from "react";
import wrapPromise from "../../utils/wrapPromise";
import { Link, useLocation } from "react-router-dom";
import ENDPOINTS from "../../constants/api/endpoints";
import useSignUpContext from "../../hooks/useSignUpContext";

type TProduct = {
  productId: string;
  priceId: string;
  name: string;
  description: string;
  priceInCents: number;
  currency: string;
};

async function getProducts(): Promise<any> {
  const resp = await fetch(ENDPOINTS.getProducts, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (resp.ok) {
    const data = await resp.json();
    return data.map((product: any) => ({
      productId: product.product.id,
      priceId: product.price.id,
      currency: product.price.currency,
      description: product.product.description,
      name: product.product.name,
      priceInCents: product.price.unit_amount,
    }));
  }
  throw new Error("Failed to fetch products");
}

export default function ChooseProduct() {
  return (
    <div>
      <h1 className="text-lg font-bold border-b-4 mb-4">Choose Product</h1>
      <Suspense fallback={<LoadingIndicator />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}

const wrappedProductsPromiseRequest = wrapPromise<TProduct[]>(getProducts());

function ProductsList() {
  const request = wrappedProductsPromiseRequest.read();
  const location = useLocation();
  const { setProductId } = useSignUpContext();
  return (
    <ul className="flex flex-col gap-2 mr-2">
      {request.map((item) => (
        <li key={item.priceId}>
          <Link
            to={`${location.pathname}/create-account`}
            onClick={() => {
              setProductId(item.priceId);
            }}
          >
            <div className="hover:bg-slate-700 duration-500 p-2 border border-white border-solid rounded-lg">
              <h2 className="font-bold border-b border-white border-solid">
                {item.name}
              </h2>
              <p>{item.description}</p>
              <p>
                {Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(item.priceInCents / 100)}
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LoadingIndicator() {
  return <div>Loading...</div>;
}
