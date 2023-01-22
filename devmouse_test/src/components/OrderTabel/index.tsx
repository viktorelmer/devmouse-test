import React from 'react';
import { ORDER_TABLE_CONFIG, TABLE_ACTION_KEYS } from '../../exports/const';
import { IOrder } from '../../exports/types';
import { useAppSelector, useAppDispatch } from "../../store/cHooks";
import { editOrder, loadSavedOrder, removeOrder } from '../../store/slices/ordersSlice';
import Table from '../Tabel';

const OrderTable: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();

  // redux states
  const ordersData = useAppSelector((state) => state.orders.data);

  // load saved order on app start
  React.useEffect(() => {
    dispatch(loadSavedOrder());
  }, []);

  const handleTableAction = (actionKey: string, item: IOrder) => {
    switch (actionKey) {
      case TABLE_ACTION_KEYS.REMOVE:
        dispatch(removeOrder(item.id));
        break;

      default:
        break;
    }
  };

  const handleContentEditable = (
    e: React.FormEvent<HTMLTableDataCellElement>,
    item: IOrder
  ) => {
    const currentText = e.currentTarget.innerText;
    const newPrice = Number(currentText);
    const amountOfDots = currentText.match(/\./g)?.length;

    // if text length = 1 and its only dot or its empty, return inital value to avoid NaN value
    if (currentText.length === 1 && currentText === ".") {
      e.currentTarget.innerText = item.price + "";
      return;
    }

    // if amount of dots more than 1, return inital value to avoid error
    if (amountOfDots !== undefined && amountOfDots > 1) {
      e.currentTarget.innerText = item.price + "";
      return;
    }
    
    if (item.price !== newPrice) {
      dispatch(editOrder({ ...item, price: newPrice }));
    }

    // if all text was removed, set text to 0 to avoid empty input
    if (newPrice === 0 && currentText.length === 0) {
      e.currentTarget.innerText = "0"
    }
  };

  return (
    <div className="order-table">
      <div className="text-lg my-5">Calculation</div>

      <Table
        table_config={ORDER_TABLE_CONFIG}
        data={ordersData}
        handleTableAction={handleTableAction}
        countSummary={{ keyToCount: "price" }}
        handleContentEditable={handleContentEditable}
      />
    </div>
  );
}

export default OrderTable;
