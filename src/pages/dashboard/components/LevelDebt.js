import { memo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '../../../components';
import PopupAgency from './PopupAgency';
import PopupLevelAgency from './PopupLevelAgency';
import { getAllLevel, getAllLevelOfAgency, registerLevel } from '../../../app/level/levelSlice';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';

const LevelDebt = () => {
    const currentAgency = useSelector((state) => state.agency.currentAgency);
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupLevel, setShowPopupLevel] = useState(false);
    const listLevelOfAgency = useSelector((state) => state.level.listLevelOfAgency);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const actionResult = await dispatch(getAllLevelOfAgency({ agencyId: currentAgency.id }));
                unwrapResult(actionResult);
            } catch (error) {
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchData();
    }, [dispatch, currentAgency.id]);
    // console.log(listLevelOfAgency);
    return (
        <div className="level-debt">
            <div className="debt">
                <p>
                    Nợ hiện tại:{' '}
                    <span className="color-red">{(+currentAgency?.currentTotalDebt).toLocaleString('en-US')} VNĐ</span>
                </p>
                <p>
                    bắt đầu nợ:{' '}
                    <span className="color-red">
                        {' '}
                        {currentAgency?.debtStartTime && new Date(`${currentAgency?.debtStartTime}`).toLocaleString()}
                    </span>
                </p>
                <p>
                    hạn trả nợ:{' '}
                    <span className="color-red">
                        {' '}
                        {currentAgency?.debtStartTime &&
                            new Date(
                                new Date(`${currentAgency?.debtStartTime}`).setDate(
                                    new Date(`${currentAgency?.debtStartTime}`).getDate() + +currentAgency?.maxDebtPeriod
                                )
                            ).toLocaleString()}
                    </span>
                </p>
                <Button
                    type="button"
                    classname="btn-custom btn-icon detail"
                    text="Thanh Toán"
                    handleFunction={() => setShowPopup(!showPopup)}
                />

                {/* </div> */}
            </div>
            <div className="level">
                <p>
                    Hạn mức:
                    <span className="color-blue">
                        {' '}
                        {listLevelOfAgency.find((item) => item.isRegistering)?.level?.name
                            ? listLevelOfAgency.find((item) => item.isRegistering)?.level?.name
                            : 'Chưa Đăng Ký'}
                    </span>
                </p>
                <p>
                    Duy trì đến:
                    <span className="color-blue">
                        {' '}
                        {listLevelOfAgency.find((item) => item.isRegistering)?.expireTime
                            ? new Date(listLevelOfAgency.find((item) => item.isRegistering)?.expireTime).toLocaleString()
                            : 'Chưa Đăng Ký'}
                        {/* {currentLevel ? new Date(`${currentLevel?.expireTime}`).toLocaleString() : 'Chưa Có'} */}
                    </span>
                </p>
                <p>
                    Trạng Thái:{' '}
                    <span className="color-blue">
                        {listLevelOfAgency.find((item) => item.isRegistering) !== undefined
                            ? listLevelOfAgency.find((item) => item.isRegistering)?.isQualified
                                ? 'Đã Đạt'
                                : 'Chưa Đạt'
                            : 'Chưa Đăng Ký'}
                        {/* {currentLevel ? (currentLevel.isQualified ? 'Đã Đạt' : 'Chưa Đạt') : 'Chưa Có'} */}
                    </span>
                </p>
                <Button
                    type="button"
                    classname="btn-custom btn-icon detail"
                    text="Lịch sử"
                    handleFunction={() => setShowPopupLevel(true)}
                />
            </div>
            {showPopup && <PopupAgency setShowPopup={setShowPopup} showPopup={showPopup} />}
            {showPopupLevel && <PopupLevelAgency setShowPopupLevel={setShowPopupLevel} />}
        </div>
    );
};

export default memo(LevelDebt);
