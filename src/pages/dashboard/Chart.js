import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getOrderWithChart } from '../../app/order/orderSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, FormRowNotFormik, Loading } from '../../components';

const Chart = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({
        series: [
            {
                name: 'Doanh Thu',
                type: 'column',
                data: [
                    // { x: '2014', y: 200000 },
                    // { x: '2014', y: 100000 },
                    // { x: '2014', y: 500000 },
                    // { x: '2014', y: 200000 },
                    // { x: '2014', y: 200000 },
                    // { x: '2014', y: 200000 },
                ],
            },
            // {
            //     name: 'Lợi Nhuận gộp',
            //     type: 'line',
            //     data: [
            //         { x: '2014', y: 50000 },
            //         { x: '2014', y: 60000 },
            //         { x: '2014', y: 70000 },
            //     ],
            // },
        ],
        options: {
            chart: {
                type: 'line',
                height: 350,
                type: 'line',
                fontFamily: 'Cabin, Arial, sans-serif',
            },
            stroke: {
                width: [0, 2],
            },
            title: {
                text: '',
            },
            dataLabels: {
                enabled: true,
                enabledOnSeries: [1],
            },

            xaxis: {
                labels: {
                    datetimeFormatter: {
                        year: 'yyyy',
                        month: "MMM 'yy",
                        day: 'dd MMM',
                    },
                },
            },
            yaxis: {
                labels: {
                    formatter: function (value) {
                        if (isFinite(+value)) return (+value).toLocaleString('en-US') + ' VNĐ';
                        else return '0 VNĐ';
                    },
                },
                opposite: true,
                maxWidth: 50,
                minWidth: 10,
            },
        },
    });
    const isLoading = useSelector((state) => state.order.isLoading);
    const dispatch = useDispatch();
    const [date, setDate] = useState({
        toDate:
            new Date().getFullYear() +
            '-' +
            (new Date().getMonth() + 1).toString().padStart(2, 0) +
            '-' +
            new Date().getDate().toString().padStart(2, 0),
        fromDate:
            new Date(new Date().setDate(new Date().getDate() - 5)).getFullYear() +
            '-' +
            (new Date(new Date().setDate(new Date().getDate() - 5)).getMonth() + 1).toString().padStart(2, 0) +
            '-' +
            new Date(new Date().setDate(new Date().getDate() - 5)).getDate().toString().padStart(2, 0),
    });
    useEffect(() => {
        const fetchChart = async () => {
            try {
                const action = await dispatch(getOrderWithChart({ fromDate: date.fromDate, toDate: date.toDate }));
                const result = unwrapResult(action);
                let data = result.listOrder.map((item) => {
                    let time =
                        new Date(`${item.deliveredTime}`).getDate().toString().padStart(2, 0) +
                        '/' +
                        (new Date(`${item.deliveredTime}`).getMonth() + 1).toString().padStart(2, 0) +
                        '/' +
                        new Date(`${item.deliveredTime}`).getFullYear();

                    return [time, item.totalPayment];
                });

                // console.log(object);
                let dataFinal = [];
                let check = Object.create(null);
                for (let i = 0; i < data.length; i++) {
                    let sum = +data[i][1];
                    if (data[i][0] in check) continue;
                    for (let j = i + 1; j < data.length; j++) {
                        if (data[i][0] === data[j][0]) {
                            sum += +data[j][1];
                        }
                    }
                    check[data[i][0]] = true;
                    dataFinal.push({
                        x: data[i][0],
                        y: sum,
                    });
                }
                let totalPayment = 0;
                for (let item of dataFinal) {
                    totalPayment += +item.y;
                }
                setTotal(totalPayment);
                setData((prev) => ({ ...prev, series: [{ name: 'Doanh Thu', type: 'column', data: dataFinal }] }));
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };
        fetchChart();
    }, [dispatch]);

    const handleSearchChart = async () => {
        try {
            const action = await dispatch(getOrderWithChart({ fromDate: date.fromDate, toDate: date.toDate }));
            const result = unwrapResult(action);
            let data = result.listOrder.map((item) => {
                let time =
                    new Date(`${item.deliveredTime}`).getDate().toString().padStart(2, 0) +
                    '/' +
                    (new Date(`${item.deliveredTime}`).getMonth() + 1).toString().padStart(2, 0) +
                    '/' +
                    new Date(`${item.deliveredTime}`).getFullYear();

                return [time, item.totalPayment];
            });
            // console.log(data);
            // console.log(object);
            let dataFinal = [];
            let check = Object.create(null);
            for (let i = 0; i < data.length; i++) {
                let sum = +data[i][1];
                if (data[i][0] in check) continue;
                for (let j = i + 1; j < data.length; j++) {
                    if (data[i][0] === data[j][0]) {
                        sum += +data[j][1];
                    }
                }
                check[data[i][0]] = true;
                dataFinal.push({
                    x: data[i][0],
                    y: sum,
                });
            }

            //let filterSameDate = data.map((item) => ({ x: item[0], setTotalsetTotaly: +item[1] }));
            let totalPayment = 0;
            for (let item of dataFinal) {
                totalPayment += +item.y;
            }
            setTotal(totalPayment);
            setData((prev) => ({ ...prev, series: [{ name: 'Doanh Thu', type: 'column', data: dataFinal }] }));
            //  [
            //     { x: '2014', y: 200000 },
            //     { x: '2014', y: 100000 },
            //     { x: '2014', y: 500000 },
            //     { x: '2014', y: 200000 },
            //     { x: '2014', y: 200000 },
            //     { x: '2014', y: 200000 },
            // ],
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    return (
        <Wrapper>
            <h5>Thống Kê Doanh Thu</h5>
            <hr />
            <div className="search-chart">
                <FormRowNotFormik
                    type="date"
                    labelText="Từ"
                    valueState={date.fromDate}
                    handleChange={(e) => setDate((prev) => ({ ...prev, fromDate: e.target.value }))}
                />
                <FormRowNotFormik
                    type="date"
                    labelText="Đến"
                    valueState={date.toDate}
                    handleChange={(e) => setDate((prev) => ({ ...prev, toDate: e.target.value }))}
                />
                <Button text="Lọc" classname="btn-custom" handleFunction={handleSearchChart} />
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <>
                    <ReactApexChart options={data.options} series={data.series} type="line" height={350} />
                    <p className="title-table">Tổng Doanh Thu: {total.toLocaleString('en-US')} VNĐ</p>
                </>
            )}
        </Wrapper>
    );
};

export default Chart;
