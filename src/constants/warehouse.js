const ACTIVE = 'ACTIVE';
const INACTIVE = 'INACTIVE';

const LIST_STATUS = [
    { value: ACTIVE, label: 'Hoạt Động' },
    { value: INACTIVE, label: 'Ngừng Hoạt Động' },
];

const PURPOSE_BUSINESS = 'PURPOSE_BUSINESS';
const PURPOSE_OTHER = 'PURPOSE_OTHER';
const TYPE_WAREHOUSE = [
    {
        value: PURPOSE_BUSINESS,
        label: 'Chứa Sản Phẩm Để Bán',
    },
    {
        value: PURPOSE_OTHER,
        label: 'Chứa Sản Phẩm Để Mục Đích Khác',
    },
];

// type goods receipt
const RETURN_GOODS_FROM_AGENCY = 'RETURN_GOODS_FROM_AGENCY';
const IMPORT_GOODS_FOR_SALE = 'IMPORT_GOODS_FOR_SALE';
const GOODS_COORDINATION = 'GOODS_COORDINATION';
const DELIVERY_PROBLEM = 'DELIVERY_PROBLEM'; //delivery problem -> cho hiện vận đơn
const TYPE_RECEIPT = [
    // TYPE_GOODS_RECEIPT
    // {
    //     value: RETURN_GOODS_FROM_AGENCY,
    //     label: 'Trả Hàng Từ Đại lý',
    // },
    {
        value: IMPORT_GOODS_FOR_SALE,
        label: 'Nhập hàng để bán',
    },
    {
        value: DELIVERY_PROBLEM,
        label: 'Nhập hàng do sự cố giao hàng',
    },
    {
        value: 'WAREHOUSE_ADJUSTMENT',
        label: 'Điều chỉnh kho',
    },
    {
        value: RETURN_GOODS_FROM_AGENCY,
        label: 'Trả Hàng Từ Đại lý',
    },
];
const RENDER_TYPE_GOODS_RECEIPT = [
    {
        value: RETURN_GOODS_FROM_AGENCY,
        label: 'Trả Hàng Từ Đại lý',
    },
    {
        value: IMPORT_GOODS_FOR_SALE,
        label: 'Nhập hàng để bán',
    },
    // {
    //     value: GOODS_COORDINATION,
    //     label: 'Điều phối hàng hóa',
    // },
    {
        value: 'WAREHOUSE_ADJUSTMENT',
        label: 'Điều chỉnh kho',
    },
    {
        value: DELIVERY_PROBLEM,
        label: 'Nhập hàng do sự cố giao hàng',
    },
];

const WAITING_IMPORT_GOODS = 'WAITING_IMPORT_GOODS';
const IMPORTED_GOODS = 'IMPORTED_GOODS';
const RENDER_STATUS_GOODS_RECEIPT = [
    {
        value: WAITING_IMPORT_GOODS,
        label: 'Chờ nhập kho',
    },
    {
        value: IMPORTED_GOODS,
        label: 'Đã nhập kho',
    },
];
// xuất kho
const EXPORT_WITH_ORDER = 'EXPORT_WITH_ORDER';
const EXPORT_ANOTHER_PURPOSE = 'ANOTHER_PURPOSE';
const EXPORT_FOR_AGENCY = 'EXPORT_FOR_AGENCY';
const TYPE_GOODS_ISSUE = [
    {
        value: EXPORT_WITH_ORDER,
        label: 'Xuất Hàng Theo Đơn',
    },
    {
        value: EXPORT_ANOTHER_PURPOSE,
        label: 'Xuất Hàng Với Mục Đích Khác',
    },
    { value: 'WAREHOUSE_ADJUSTMENT', label: 'Điều chỉnh kho' },
    // {
    //     value: EXPORT_FOR_AGENCY,
    //     label: 'Xuất Hàng Cho Đại Lý',
    // },
];
const RENDER_TYPE_GOODS_ISSUE = [
    {
        value: EXPORT_WITH_ORDER,
        label: 'Xuất Hàng Theo Đơn',
    },
    {
        value: EXPORT_ANOTHER_PURPOSE,
        label: 'Xuất Hàng Với Mục Đích Khác',
    },
    // {
    //     value: GOODS_COORDINATION,
    //     label: 'Điều phối hàng hóa',
    // },
    {
        value: 'WAREHOUSE_ADJUSTMENT',
        label: 'Điều chỉnh kho',
    },
    // {
    //     value: EXPORT_FOR_AGENCY,
    //     label: 'Xuất Hàng Cho Đại Lý',
    // },
];

const WAITING_GET_GOODS = 'WAITING_GET_GOODS';
const GOT_GOODS = 'GOT_GOODS';
const RENDER_STATUS_GOODS_ISSUE = [
    {
        value: WAITING_GET_GOODS,
        label: 'Chờ xuất kho',
    },
    {
        value: GOT_GOODS,
        label: 'Đã xuất kho',
    },
];

const RENDER_STATUS_GOODS_CHECK = [
    {
        value: 'WAITING_CHECK_GOODS',
        label: 'Chờ kiểm kho',
    },
    {
        value: 'CHECK_GOODS',
        label: 'Đã kiểm kho',
    },
];
const NOT_SHIPPED_YET = 'NOT_SHIPPED_YET';
const SHIPPING = 'SHIPPING';
const SHIPPED = 'SHIPPED';
const SHIPPING_PROBLEM = 'SHIPPING_PROBLEM';
const STATUS_WAY_BILL = [
    {
        value: NOT_SHIPPED_YET,
        label: 'Chờ lấy hàng',
    },
    {
        value: GOT_GOODS,
        label: 'Đã lấy hàng',
    },
    {
        value: SHIPPING,
        label: 'Đang vận chuyển',
    },
    {
        value: SHIPPED,
        label: 'Đã vận chuyển',
    },
    {
        value: SHIPPING_PROBLEM,
        label: 'Sự cố vận chuyển',
    },
];

export {
    ACTIVE,
    INACTIVE,
    LIST_STATUS,
    // type goods receipt
    RETURN_GOODS_FROM_AGENCY,
    IMPORT_GOODS_FOR_SALE,
    TYPE_RECEIPT,
    // xuất kho
    EXPORT_WITH_ORDER,
    EXPORT_ANOTHER_PURPOSE,
    TYPE_GOODS_ISSUE,
    RENDER_STATUS_GOODS_ISSUE,
    // type của kho
    GOT_GOODS,
    TYPE_WAREHOUSE,
    RENDER_TYPE_GOODS_RECEIPT,
    RENDER_STATUS_GOODS_RECEIPT,
    WAITING_IMPORT_GOODS,
    RENDER_TYPE_GOODS_ISSUE,
    // status way bill
    STATUS_WAY_BILL,
    RENDER_STATUS_GOODS_CHECK,
};
