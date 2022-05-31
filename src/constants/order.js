// Status of order
const WAITING_FOR_APPROVED = 'WAITING_FOR_APPROVED';
const APPROVED = 'APPROVED';
// const PROCESSING = 'PROCESSING';
const COMPLETED = 'COMPLETED';
const CANCELLED_FROM_AGENCY = 'CANCELLED_FROM_AGENCY';
const CANCELLED_FROM_SUPPLIER = 'CANCELLED_FROM_SUPPLIER';
const CREATED_BY_SUPPLIER = 'CREATED_BY_SUPPLIER';
const DELIVERED = 'DELIVERED';
const IMPORTED_GOODS = 'IMPORTED_GOODS';

const ORDER_STATUS = [
    { value: CREATED_BY_SUPPLIER, label: 'Tạo từ nhà cung cấp' },
    { value: WAITING_FOR_APPROVED, label: 'Chờ xác nhận' },
    //{ value: PROCESSING, label: 'Đang xử lý' },
    { value: IMPORTED_GOODS, label: 'Đã nhập kho' },
    { value: APPROVED, label: 'Đã xác nhận' },
    { value: DELIVERED, label: 'Đã giao' },
    { value: 'DELIVERY_FAILED', label: 'Giao không thành công' },
    { value: COMPLETED, label: 'Đại lý đã nhận được hàng' },
    { value: CANCELLED_FROM_AGENCY, label: 'Đã hủy từ đại lý' },
    { value: CANCELLED_FROM_SUPPLIER, label: 'Đã hủy từ nhà cung cấp' },
];

// Type of order
const PURCHASE_ORDER = 'PURCHASE_ORDER';
const RETURN_ORDER = 'RETURN_ORDER';
const ERROR_ORDER = 'ERROR_ORDER';

const ORDER_TYPE = [
    { value: PURCHASE_ORDER, label: 'Đơn hàng mua' },
    { value: RETURN_ORDER, label: 'Đơn hàng trả' },
    //{ value: ERROR_ORDER, label: 'Đơn hàng lỗi' },
];

// Status of delivery
const NOT_INSTALLED = 'NOT_INSTALLED';
const GOT_GOODS = 'GOT_GOODS';
const WAITING_GET_GOODS = 'WAITING_GET_GOODS';
//const DELIVERED = 'DELIVERED';
const UNSUCCESSFUL_DELIVERY = 'UNSUCCESSFUL_DELIVERY';
const SHIPPING = 'SHIPPING';

const DELIVERY_STATUS = [
    { value: NOT_INSTALLED, label: 'Chưa cài đặt' },
    { value: WAITING_GET_GOODS, label: 'Chờ xuất kho' },
    { value: GOT_GOODS, label: 'Đã xuất kho' },
    { value: SHIPPING, label: 'Đang vận chuyển' },
    { value: DELIVERED, label: 'Đã giao hàng' },
    { value: UNSUCCESSFUL_DELIVERY, label: 'Giao hàng không thành công' },
];

// Status of payment
const WAITING_FOR_PAYMENT = 'WAITING_FOR_PAYMENT';
const ALREADY_PAYMENT = 'ALREADY_PAYMENT';
const DEBT_PAYMENT = 'DEBT_PAYMENT';
const ALREADY_PAYMENT_1_PART = 'ALREADY_PAYMENT_1_PART';
const ALREADY_PAYMENT_ALL = 'ALREADY_PAYMENT_ALL';

const COD_PAYMENT_STATUS = [
    { value: WAITING_FOR_PAYMENT, label: 'Chờ thanh toán' },
    { value: DEBT_PAYMENT, label: 'Thanh toán sau (nợ)' },
    { value: ALREADY_PAYMENT, label: 'Đã thanh toán' },
    { value: 'MOVE_DEBT', label: 'Chuyển vào khoản nợ' },
];
// { value: ALREADY_PAYMENT_1_PART, label: 'Đã thanh toán một phần' },
// { value: ALREADY_PAYMENT_ALL, label: 'Đã thanh toán toàn bộ' },
const COD_PAYMENT = 'COD_PAYMENT';
//const DEBT_PAYMENT = 'DEBT_PAYMENT';
const PAYMENT_TYPE = [
    {
        value: COD_PAYMENT,
        label: 'Thanh toán COD',
    },
    { value: DEBT_PAYMENT, label: 'Thanh toán sau (nợ)' },
];

// type payment
const ONLINE_PAYMENT = 'ONLINE_PAYMENT';
const TYPE_PAYMENT_DEBT = [
    { value: ONLINE_PAYMENT, label: 'Thanh toán online' },
    { value: COD_PAYMENT, label: 'Thanh toán COD' },
    { value: 'TRANSFER', label: 'Chuyển khoản' },
    { value: 'ORDER_PAYMENT', label: 'COD - Đơn hàng' },
];
const STATUS_PAYMENT_DEBT = [
    { value: ALREADY_PAYMENT_1_PART, label: 'Thanh toán 1 phần' },
    { value: ALREADY_PAYMENT_ALL, label: 'Thanh toán toàn bộ' },
];
// payment from supplier or agency
const PAYMENT_FROM_SUPPLIER = 'PAYMENT_FROM_SUPPLIER';
const PAYMENT_FROM_AGENCY = 'PAYMENT_FROM_AGENCY';

const WHO_PAYMENT = [
    { type: PAYMENT_FROM_SUPPLIER, description: 'Thanh toán từ nhà cung cấp' },
    { type: PAYMENT_FROM_AGENCY, description: 'Thanh toán từ đại lý' },
];
export {
    // -- status of order
    CREATED_BY_SUPPLIER,
    ORDER_STATUS,
    APPROVED,
    CANCELLED_FROM_AGENCY,
    CANCELLED_FROM_SUPPLIER,
    COMPLETED,
    SHIPPING,
    WAITING_FOR_APPROVED,
    // -- type of order
    PURCHASE_ORDER,
    RETURN_ORDER,
    ERROR_ORDER,
    ORDER_TYPE,
    //type of payment
    PAYMENT_TYPE,
    TYPE_PAYMENT_DEBT,
    STATUS_PAYMENT_DEBT,
    // status of payment
    COD_PAYMENT_STATUS,
    WAITING_FOR_PAYMENT,
    // status of delivery
    DELIVERY_STATUS,
    NOT_INSTALLED,
    //GETTING_GOODS,
};
