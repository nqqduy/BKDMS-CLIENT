const BUSINESS = 'BUSINESS';
const STOP_BUSINESS = 'STOP_BUSINESS';
// const GIFT = 'GIFT';
// const STOP_GIFT = 'STOP_GIFT';
const TYPE_PRODUCT = [
    {
        value: BUSINESS,
        label: 'Kinh Doanh',
    },
    {
        value: STOP_BUSINESS,
        label: 'Ngừng Kinh Doanh',
    },
    // {
    //     value: 'Hàng Tặng',
    //     label: 'Hàng Tặng',
    // },
    // {
    //     value: 'Ngừng Hàng Tặng',
    //     label: 'Ngừng Hàng Tặng',
    // },
];

const REVENUE = 'REVENUE';
const CURRENT_DEBT = 'CURRENT_DEBT';
const CURRENT_POINT = 'CURRENT_POINT';
const MIN_DAY_JOIN = 'MIN_DAY_JOIN';
const CONDITION_REGISTER = [
    {
        value: REVENUE,
        label: 'Doanh Thu',
    },
    {
        value: CURRENT_DEBT,
        label: 'Công Nợ Hiện Tại',
    },
    // {
    //     value: CURRENT_POINT,
    //     label: 'Điểm Hiện Tại',
    // },
    {
        value: MIN_DAY_JOIN,
        label: 'Số Ngày Gia Nhập Tối Thiểu',
    },
];

const TYPE_VALUE = [
    {
        value: 'VNĐ',
        label: 'VNĐ',
    },
    {
        value: '%',
        label: '%',
    },
];

const QUANTITY = 'QUANTITY';

const GET_DISCOUNT = [
    {
        value: QUANTITY,
        label: 'Số Lượng',
    },
    {
        value: REVENUE,
        label: 'Doanh Thu',
    },
];

const ALL_PRODUCT = 'ALL_PRODUCT';
const EACH_PRODUCT = 'EACH_PRODUCT';
const DISCOUNT_RANGE = [
    {
        value: ALL_PRODUCT,
        label: 'Toàn Bộ Sản Phẩm',
    },
    {
        value: EACH_PRODUCT,
        label: 'Từng Loại Sản Phẩm',
    },
];

// employee
const SHIPPER = 'SHIPPER';
const ADMIN = 'ADMIN';
const LIST_ROLE = [
    {
        value: ADMIN,
        label: 'Quản Trị Viên',
    },
    {
        value: SHIPPER,
        label: 'Nhân Viên Giao Hàng',
    },
];

export {
    REVENUE,
    ALL_PRODUCT,
    EACH_PRODUCT,
    CURRENT_DEBT,
    CURRENT_POINT,
    MIN_DAY_JOIN,
    CONDITION_REGISTER,
    GET_DISCOUNT,
    // ---
    QUANTITY,
    TYPE_PRODUCT,
    TYPE_VALUE,
    DISCOUNT_RANGE,
    // key
    BUSINESS,
    STOP_BUSINESS,
    // GIFT,
    // STOP_GIFT,
    // employee
    SHIPPER,
    ADMIN,
    LIST_ROLE,
};
