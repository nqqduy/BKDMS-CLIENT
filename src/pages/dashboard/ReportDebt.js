import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { reportDebt } from '../../app/order/orderSlice';
import Wrapper from '../../assets/wrappers/DashboardManager';
import { Button, FormRowNotFormik } from '../../components';
import PopupReDebt from './components/PopupReDebt';

const ReportDebt = () => {
    const reportData = useSelector((state) => state.order.reportDebt);
    const dispatch = useDispatch();
    const [showPopup, setShowPopup] = useState({
        data: null,
        show: false,
        type: '',
        name: null,
    });
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
        agencyName: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const action = await dispatch(
                    reportDebt({
                        ...date,
                    })
                );
                unwrapResult(action);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchData();
    }, [dispatch]);
    // console.log(reportData);

    const handleReportDebt = async () => {
        try {
            const action = await dispatch(
                reportDebt({
                    ...date,
                })
            );
            unwrapResult(action);
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
            <h5>B??o c??o c??ng n???</h5>
            <hr />
            <div className="search-chart">
                <FormRowNotFormik
                    type="date"
                    labelText="T???"
                    valueState={date.fromDate}
                    handleChange={(e) => setDate((prev) => ({ ...prev, fromDate: e.target.value }))}
                />
                <FormRowNotFormik
                    type="date"
                    labelText="?????n"
                    valueState={date.toDate}
                    handleChange={(e) => setDate((prev) => ({ ...prev, toDate: e.target.value }))}
                />
                <FormRowNotFormik
                    type="text"
                    labelText="T??n ?????i L??"
                    valueState={date.agencyName}
                    handleChange={(e) => setDate((prev) => ({ ...prev, agencyName: e.target.value }))}
                />
                <Button text="L???c" classname="btn-custom" handleFunction={handleReportDebt} />
            </div>
            <div className="btn-container">
                <Button
                    classname="btn-custom btn-icon"
                    text="Gi???i th??ch thu???t ng???"
                    icon={<AiOutlineQuestionCircle className="front-icon" />}
                    handleFunction={() => {
                        Swal.fire({
                            title: 'B???ng gi???i th??ch thu???t ng???',
                            // icon: 'info',
                            html:
                                '<b>C??ng n??? t??ng</b>: L?? gi?? tr??? t??ng th??m c???a s??? ti???n ?????i l?? ph???i tr???, ???????c ph??t sinh trong kho???ng <b>Th???i gian</b>' +
                                '<br />' +
                                '<br />' +
                                '<b>C??ng n??? gi???m</b>: L?? gi?? tr??? gi???m ??i c???a s??? ti???n ?????i l?? ph???i tr???, ???????c  ph??t sinh trong kho???ng <b>Th???i gian</b>',

                            cancelButtonAriaLabel: 'Thumbs down',
                        });
                    }}
                />
                {/* <Button classname="btn-custom btn-icon" text="T???i Excel" icon={<BiDownload className="front-icon" />} /> */}
            </div>
            {reportData && (
                <div className="table table-product">
                    <table>
                        <thead>
                            <tr>
                                <th width="10%">STT</th>
                                <th width="30%">T??n</th>
                                <th width="30%">C??ng N??? T??ng</th>
                                <th width="30%">C??ng N??? Gi???m</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportData?.listAgency?.map((item, idx) => {
                                // handle c??ng n??? t??ng
                                const listDebtIncrease = reportData?.objectListDebtIncrease[item.id];
                                let totalDebtOfOrder = 0;
                                for (let i of listDebtIncrease) {
                                    totalDebtOfOrder += +i.totalPayment;
                                }

                                // handle C??ng n??? gi???m
                                const listDebtDecrease = reportData?.objectListDebtDecrease[item.id];
                                let totalDecrease = 0;
                                for (let i of listDebtDecrease) {
                                    totalDecrease += +i.amount;
                                }
                                // for (let i of listDebtIncrease.listOrderReturn) {
                                //     totalDebtOfOrder -= +i.totalPayment;
                                // }
                                // let renderOrder = listDebtIncrease.listOrderPurchase.concat(
                                //     listDebtIncrease.listOrderReturn
                                // );
                                return (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{item?.name}</td>

                                        <td
                                            className={totalDebtOfOrder !== 0 ? 'title-report' : ''}
                                            onClick={() => {
                                                if (totalDebtOfOrder !== 0)
                                                    setShowPopup({
                                                        data: listDebtIncrease,
                                                        show: true,
                                                        type: 'DEBT_INCREASE',
                                                        name: item.name,
                                                        total: totalDebtOfOrder,
                                                    });
                                            }}
                                        >
                                            {totalDebtOfOrder.toLocaleString('en-US')}
                                        </td>
                                        <td
                                            className={+totalDecrease !== 0 ? 'title-report' : ''}
                                            onClick={() => {
                                                if (totalDecrease !== 0)
                                                    setShowPopup({
                                                        data: listDebtDecrease,
                                                        show: true,
                                                        type: 'DEBT_DECREASE',
                                                        name: item.name,
                                                        total: totalDecrease,
                                                    });
                                            }}
                                        >
                                            {totalDecrease.toLocaleString('en-US')}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {showPopup.show && <PopupReDebt showPopup={showPopup} setShowPopup={setShowPopup} />}
        </Wrapper>
    );
};

export default ReportDebt;
