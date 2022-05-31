import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './sidebar/sidebarSlice';
import userReducer from './user/userSlice';
import agencyReducer from './agency/agencySlice';
import categoryReducer from './category/categorySlice';
import productReducer from './product/productSlice';
import warehouseReducer from './warehouse/warehouseSlice';
import settingReducer from './setting/settingSlice';
import levelReducer from './level/levelSlice';
import productLineReducer from './productLine/productLineSlice';
import orderReducer from './order/orderSlice';
import deliveryReducer from './delivery/deliverySlice';
import shipperReducer from './shipper/shipperSlice';
import paymentReducer from './payment/paymentSlice';

const rootReducer = {
    sidebar: sidebarReducer,
    user: userReducer,
    agency: agencyReducer,
    category: categoryReducer,
    product: productReducer,
    warehouse: warehouseReducer,
    setting: settingReducer,
    level: levelReducer,
    productLine: productLineReducer,
    order: orderReducer,
    delivery: deliveryReducer,
    shipper: shipperReducer,
    payment: paymentReducer,
};

const store = configureStore({
    reducer: rootReducer,
});

export default store;
