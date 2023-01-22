import React from 'react';
import MySelect from '../../components/Select';
import { IOrder } from '../../exports/types';
import { useAppSelector, useAppDispatch } from "../../store/cHooks";
import { addOrder } from '../../store/slices/ordersSlice';
import { loadProducts, loadRestaurants, selectProduct, selectRestaurant } from '../../store/slices/restaurantsSlice';
import Button from '../Button';

function OrderForm() {
  const dispatch = useAppDispatch();

  // redux states
  const restaurantsData = useAppSelector((state) => state.restaurants.data),
    products = useAppSelector((state) => state.restaurants.products),
    selectedRestaurant = useAppSelector(
      (state) => state.restaurants.selectedRestaurant
    ),
    selectedProduct = useAppSelector(
      (state) => state.restaurants.selectedProduct
    );

  // load all restaurants on app start
  React.useEffect(() => {
    dispatch(loadRestaurants());
  }, [dispatch]);

  // load products after restaurant was selected
  React.useEffect(() => {
    if (selectedRestaurant !== null) {
      dispatch(loadProducts(selectedRestaurant));
    }
  }, [dispatch, selectedRestaurant]);

  const handleSelectRestaurant = (restId: number) => {
    dispatch(selectRestaurant(restId));
  };

  const handleSelectProduct = (productId: number) => {
    dispatch(selectProduct(productId));
  };

  const formatRestDataForSelect = React.useMemo(() => {
    return restaurantsData.map((rest) => ({
      label: rest.name,
      value: rest.id,
    }));
  }, [restaurantsData]);

  const formatProdDataForSelect = React.useMemo(() => {
    return products.map((rest) => ({
      label: rest.name,
      value: rest.id,
    }));
  }, [products]);

  const addToTable = React.useCallback(() => {
    const productData = products.find((pr) => pr.id === selectedProduct);
    const restaurantData = restaurantsData.find(
      (rest) => rest.id === selectedRestaurant
    );
    if (productData && selectedProduct && restaurantData) {
      const order: IOrder = {
        id: new Date().valueOf(),
        product_id: selectedProduct,
        price: productData.price,
        name: productData.name,
        restaurant: restaurantData.name,
        restaurant_id: restaurantData.id,
      };
      dispatch(addOrder(order));
    }
  }, [selectedProduct, selectedRestaurant]);

  return (
    <div className="order-form w-[40%]">
      <div className="text-lg my-5">Create new entry</div>

      {/* RESTAURANT SELECT */}
      <MySelect
        data={formatRestDataForSelect}
        onChange={handleSelectRestaurant}
        className="mb-4"
      />

      {/* FOOD SELECT */}
      <MySelect
        data={formatProdDataForSelect}
        onChange={handleSelectProduct}
        disabled={selectedRestaurant === null}
        className="mb-4"
      />

      {/* ADD TO TABLE BUTTON */}
      <Button
        label="Add to table"
        onClick={addToTable}
        disabled={selectedProduct === null}
        className={selectedProduct === null ? "cursor-not-allowed" : ""}
      />
    </div>
  );
}

export default OrderForm;
