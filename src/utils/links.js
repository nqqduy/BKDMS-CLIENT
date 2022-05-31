import { AiOutlineExport, AiOutlineImport } from 'react-icons/ai';
import {
    BiBarcode,
    BiChevronDown,
    BiChevronUp,
    BiCog, // khuyen mai
    BiGridAlt, // cài đặt
    BiStore, // trang chủ
    BiTrendingUp,
} from 'react-icons/bi'; // nhà kho
import { BsHouseDoor, BsTruck } from 'react-icons/bs'; // nhà kho
import { FaWarehouse } from 'react-icons/fa';
import { FiMapPin, FiUsers } from 'react-icons/fi';
import { GoPackage } from 'react-icons/go'; // sản phẩm
import { GrClipboard } from 'react-icons/gr';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { ImStatsDots } from 'react-icons/im';
import { IoCartOutline, IoLogoUsd } from 'react-icons/io5'; // đại lý, đơn hàng
import { MdOutlineCategory, MdOutlineInventory } from 'react-icons/md';
import { RiProductHuntLine } from 'react-icons/ri';

const adminLinks = [
    {
        text: 'Trang Chủ',
        path: '/',
        icon: <BiGridAlt />,
    },
    {
        text: 'Đại lý',
        path: '#',
        icon: <BiStore />,
        iconClosed: <BiChevronDown className="icon-down" />,
        iconOpened: <BiChevronUp className="icon-down" />,
        subNav: [
            {
                text: 'Bản đồ đại lý',
                path: 'agency-map',
                icon: <FiMapPin />,
            },
            {
                text: 'Quản lý đại lý',
                path: 'agency',
                icon: <BiStore />,
            },
            {
                text: 'Hạn mức đại lý',
                path: 'agency-level',
                icon: <BiTrendingUp />,
            },
        ],
    },

    {
        text: 'Bán hàng',
        path: 'product',
        icon: <GoPackage />,
        iconClosed: <BiChevronDown className="icon-down" />,
        iconOpened: <BiChevronUp className="icon-down" />,
        subNav: [
            {
                text: 'Danh mục',
                path: 'category',
                icon: <MdOutlineCategory />,
            },
            {
                text: 'Dòng sản phẩm',
                path: 'productLine',
                icon: <RiProductHuntLine />,
            },
            {
                text: 'Sản phẩm',
                path: 'product',
                icon: <BiBarcode />,
            },
        ],
    },
    {
        text: 'Đơn hàng',
        path: '#',
        icon: <IoCartOutline />,
        iconClosed: <BiChevronDown className="icon-down" />,
        iconOpened: <BiChevronUp className="icon-down" />,
        subNav: [
            {
                text: 'Quản lý đơn hàng',
                path: 'order',
                icon: <MdOutlineCategory />,
            },
            {
                text: 'Giao hàng',
                path: 'delivery-order',
                icon: <BsTruck />,
            },
        ],
    },
    {
        text: 'Nhà kho',
        path: '#',
        icon: <BsHouseDoor />,
        iconClosed: <BiChevronDown className="icon-down" />,
        iconOpened: <BiChevronUp className="icon-down" />,
        subNav: [
            {
                text: 'Quản lý kho',
                path: 'warehouse',
                icon: <FaWarehouse />,
            },
            {
                text: 'Nhập kho',
                path: 'goods-receipt',
                icon: <AiOutlineImport />,
            },
            {
                text: 'Xuất kho',
                path: 'goods-issue',
                icon: <AiOutlineExport />,
            },
            {
                text: 'Chuyển kho',
                path: 'goods-transfer',
                icon: <HiOutlineSwitchHorizontal />,
            },
            {
                text: 'Kiểm kho',
                path: 'warehouse-check',
                icon: <MdOutlineInventory />,
            },
        ],
    },
    {
        text: 'Nhân Viên',
        path: 'employee',
        icon: <FiUsers />,
    },
    {
        text: 'Báo cáo',
        path: '#',
        icon: <ImStatsDots />,
        iconClosed: <BiChevronDown className="icon-down" />,
        iconOpened: <BiChevronUp className="icon-down" />,
        subNav: [
            {
                text: 'Báo cáo kho',
                path: 'report-warehouse',
                icon: <FaWarehouse />,
            },
            {
                text: 'Báo cáo bán hàng',
                path: 'report-revenue',
                icon: <BiBarcode />,
            },
            {
                text: 'Báo cáo Công Nợ',
                path: 'report-debt',
                icon: <IoLogoUsd />,
            },
        ],
    },
    {
        text: 'Cài đặt',
        path: 'setting',
        icon: <BiCog />,
    },
];

const shipperLinks = [
    {
        text: 'Trang Chủ',
        path: '/',
        icon: <BiGridAlt />,
    },
    {
        text: 'Nhân Viên Giao',
        path: '#',
        icon: <BsTruck />,
        iconClosed: <BiChevronDown className="icon-down" />,
        iconOpened: <BiChevronUp className="icon-down" />,
        subNav: [
            {
                text: 'Đơn chờ xác nhận',
                path: 'agency-map',
                icon: <GrClipboard />,
            },
            {
                text: 'Đơn hàng đã giao',
                path: 'agency',
                icon: <BiStore />,
            },
        ],
    },
];

export { adminLinks, shipperLinks };
