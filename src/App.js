import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Loading } from './components';

// import { Error, Login, ProtectedRoute, Register, ForgotPassword, ResetPassword } from './pages';

// import {
//     FixedLayout,
//     Home,
//     Warehouse,
//     Orders,
//     Setting,
//     Promotion,
//     AllAgencies,
//     MapAgencies,
//     AddAgency,
//     AllCategory,
//     AllProduct,
//     AddProduct,
//     GoodsIssue,
//     GoodsReceipt,
//     WarehouseCheck,
//     GoodsTransfer,
//     AddGoodsReceipt,
//     AddGoodsIssue,
//     AllLevel,
//     AddLevel,
//     AllProductLine,
//     AddOrder,
//     ConfigDelivery,
//     ExportAndWayBill,
//     AddWarehouseCheck,
//     AddGoodsTransfer,
//     Delivery,
// } from './pages/dashboard';
const FixedLayout = React.lazy(() => import('./pages/dashboard/FixedLayout'));
const Home = React.lazy(() => import('./pages/dashboard/Home'));
const Warehouse = React.lazy(() => import('./pages/dashboard/Warehouse'));
const Orders = React.lazy(() => import('./pages/dashboard/Orders'));
const AllAgencies = React.lazy(() => import('./pages/dashboard/AllAgencies'));
const MapAgencies = React.lazy(() => import('./pages/dashboard/MapAgencies'));
const AddAgency = React.lazy(() => import('./pages/dashboard/AddAgency'));
const AllCategory = React.lazy(() => import('./pages/dashboard/AllCategory'));
const AllProduct = React.lazy(() => import('./pages/dashboard/AllProduct'));
const AddProduct = React.lazy(() => import('./pages/dashboard/AddProduct'));
const GoodsIssue = React.lazy(() => import('./pages/dashboard/GoodsIssue'));
const GoodsReceipt = React.lazy(() => import('./pages/dashboard/GoodsReceipt'));
const WarehouseCheck = React.lazy(() => import('./pages/dashboard/WarehouseCheck'));
const GoodsTransfer = React.lazy(() => import('./pages/dashboard/GoodsTransfer'));
const AddGoodsReceipt = React.lazy(() => import('./pages/dashboard/AddGoodsReceipt'));
const AddGoodsIssue = React.lazy(() => import('./pages/dashboard/AddGoodsIssue'));
const AllLevel = React.lazy(() => import('./pages/dashboard/AllLevel'));
const AddLevel = React.lazy(() => import('./pages/dashboard/AddLevel'));
const AllProductLine = React.lazy(() => import('./pages/dashboard/AllProductLine'));
const AddOrder = React.lazy(() => import('./pages/dashboard/AddOrder'));
const ExportAndWayBill = React.lazy(() => import('./pages/dashboard/ExportAndWayBill'));
const AddWarehouseCheck = React.lazy(() => import('./pages/dashboard/AddWarehouseCheck'));
const AddGoodsTransfer = React.lazy(() => import('./pages/dashboard/AddGoodsTransfer'));
const Delivery = React.lazy(() => import('./pages/dashboard/Delivery'));
const ConfigDelivery = React.lazy(() => import('./pages/dashboard/ConfigDelivery'));
const ContainProduct = React.lazy(() => import('./pages/dashboard/ContainProduct'));
const Chart = React.lazy(() => import('./pages/dashboard/Chart'));
const AllEmployee = React.lazy(() => import('./pages/dashboard/AllEmployee'));
const AddEmployee = React.lazy(() => import('./pages/dashboard/AddEmployee'));
const MyAccount = React.lazy(() => import('./pages/dashboard/MyAccount'));
const HomeReportWarehouse = React.lazy(() => import('./pages/dashboard/HomeReportWarehouse'));
const OverviewWarehouse = React.lazy(() => import('./pages/dashboard/OverviewWarehouse'));
const DetailWarehouse = React.lazy(() => import('./pages/dashboard/DetailWarehouse'));
const ReportDebt = React.lazy(() => import('./pages/dashboard/ReportDebt'));
const Setting = React.lazy(() => import('./pages/dashboard/Setting'));

const Login = React.lazy(() => import('./pages/Login'));
const Error = React.lazy(() => import('./pages/Error'));
const ProtectedRoute = React.lazy(() => import('./pages/ProtectedRoute'));
const Register = React.lazy(() => import('./pages/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));

function App() {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <FixedLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        index
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Home />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="agency"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AllAgencies />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="agency/add-agency"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddAgency />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="agency-map"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <MapAgencies />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="agency-level"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AllLevel />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="agency-level/add-level"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddLevel />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="order"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Orders />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="order/add-order"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddOrder />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="order/delivery/:orderCode"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <ExportAndWayBill />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="warehouse"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Warehouse />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="warehouse/:warehouseId"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <ContainProduct />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="goods-receipt"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <GoodsReceipt />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="goods-receipt/add-goods-receipt"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddGoodsReceipt />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="goods-issue"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <GoodsIssue />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="goods-issue/add-goods-issue"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddGoodsIssue />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="goods-transfer"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <GoodsTransfer />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="goods-transfer/add-goods-transfer"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddGoodsTransfer />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="warehouse-check"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <WarehouseCheck />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="warehouse-check/add-warehouse-check"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddWarehouseCheck />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="category"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AllCategory />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="productLine"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AllProductLine />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="product"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AllProduct />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="product/add-product"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddProduct />
                            </React.Suspense>
                        }
                    ></Route>
                    {/* <Route
                        path="promotion"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Promotion />
                            </React.Suspense>
                        }
                    ></Route> */}
                    <Route
                        path="delivery-order"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Delivery />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="delivery-order/config-delivery"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <ConfigDelivery />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="employee"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AllEmployee />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="employee/add-employee"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <AddEmployee />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="my-account"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <MyAccount />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="/report-revenue"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Chart />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="/report-warehouse"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <HomeReportWarehouse />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="/report-warehouse/overview"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <OverviewWarehouse />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="/report-warehouse/detail"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <DetailWarehouse />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="/report-debt"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <ReportDebt />
                            </React.Suspense>
                        }
                    ></Route>
                    <Route
                        path="/setting"
                        element={
                            <React.Suspense fallback={<Loading center />}>
                                <Setting />
                            </React.Suspense>
                        }
                    ></Route>
                </Route>
                <Route
                    path="/login"
                    element={
                        <React.Suspense fallback={<Loading center />}>
                            <Login />
                        </React.Suspense>
                    }
                ></Route>
                <Route
                    path="/register"
                    element={
                        <React.Suspense fallback={<Loading center />}>
                            <Register />
                        </React.Suspense>
                    }
                ></Route>

                <Route
                    path="/forgotPassword"
                    element={
                        <React.Suspense fallback={<Loading center />}>
                            <ForgotPassword />
                        </React.Suspense>
                    }
                ></Route>
                <Route
                    path="/resetPassword"
                    element={
                        <React.Suspense fallback={<Loading center />}>
                            <ResetPassword />
                        </React.Suspense>
                    }
                ></Route>

                <Route
                    path="*"
                    element={
                        <React.Suspense fallback={<Loading center />}>
                            <Error />
                        </React.Suspense>
                    }
                ></Route>
            </Routes>
        </Router>
    );
}

export default App;
