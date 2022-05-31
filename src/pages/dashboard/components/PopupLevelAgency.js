import { unwrapResult } from '@reduxjs/toolkit';
import { memo, useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiPlusCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { getAllLevel, getAllLevelOfAgency, registerLevel, cancelLevel, checkLevel } from '../../../app/level/levelSlice';
import Wrapper from '../../../assets/wrappers/PopupCategory';
import { Button, Loading, SelectNotFormik } from '../../../components';
const PopupLevelAgency = ({ setShowPopupLevel }) => {
    const isLoading = useSelector((state) => state.level.isLoading);
    const currentAgency = useSelector((state) => state.agency.currentAgency);
    const listLevel = useSelector((state) => state.level.listLevel?.map((item) => ({ value: item.id, label: item.name })));
    const listLevelOfAgency = useSelector((state) => state.level.listLevelOfAgency);

    const [levelId, setLevelId] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const actionResult = await Promise.all([
                    dispatch(getAllLevel()),
                    dispatch(getAllLevelOfAgency({ agencyId: currentAgency.id })),
                ]);
                unwrapResult(actionResult[0]);
                unwrapResult(actionResult[1]);
            } catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'warning',
                    title: error.message,
                    showConfirmButton: true,
                });
            }
        };

        fetchData();
    }, [dispatch, currentAgency.id]);

    const handleRegister = async () => {
        try {
            if (!levelId) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Vui lòng chọn hạn mức',
                    showConfirmButton: true,
                });
                return;
            }
            const actionResult = await dispatch(registerLevel({ levelId: levelId, agencyId: currentAgency.id }));

            // unwrapResult(actionResult);
            // const action = dispatch(getAllLevelOfAgency({ agencyId: currentAgency.id }));
            unwrapResult(actionResult);
            const result = await dispatch(getAllLevelOfAgency({ agencyId: currentAgency.id }));
            // dispatch(getAgency({ agencyId: currentAgency.id })),

            unwrapResult(result);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };
    const cancelLevel1 = async (data) => {
        try {
            const actionResult = await dispatch(cancelLevel(data));
            unwrapResult(actionResult);
            const result = await dispatch(getAllLevelOfAgency({ agencyId: currentAgency.id }));
            // dispatch(getAgency({ agencyId: currentAgency.id })),

            unwrapResult(result);
        } catch (error) {
            Swal.fire({
                icon: 'warning',
                title: error.message,
                showConfirmButton: true,
            });
        }
    };

    const handleCheckLevel = async (data) => {
        try {
            const actionResult = await dispatch(checkLevel(data));
            const error = unwrapResult(actionResult);

            if (error.listError?.length > 0) {
                let error1 = '';

                for (let item of error.listError) {
                    error1 += item + '; ';
                }
                Swal.fire({
                    icon: 'warning',
                    title: error1,
                    showConfirmButton: true,
                });
            }
            const result = await dispatch(getAllLevelOfAgency({ agencyId: currentAgency.id }));
            // dispatch(getAgency({ agencyId: currentAgency.id })),
            unwrapResult(result);
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
            <div className="form-agency">
                <h5>Lịch sử đăng ký hạn mức</h5>
                <hr />
                <div className="debt-container">
                    <p>
                        Hạn Mức Hiện Tại:{' '}
                        <span className="color-blue">
                            {listLevelOfAgency.length !== 0
                                ? listLevelOfAgency.find((item) => item.isRegistering)?.level?.name
                                : 'Chưa Đăng Ký'}
                        </span>
                    </p>
                    <div className="payment-debt">
                        <SelectNotFormik
                            type="text"
                            placeholder="Chọn hạn mức"
                            notLabel
                            options={listLevel ? listLevel : []}
                            valueState={levelId}
                            handleChange={(e) => setLevelId(e.value)}
                        />
                        <Button
                            type="button"
                            classname="btn-custom  btn-icon detail button-react-select register-level"
                            text="Đăng Ký"
                            icon={<BiPlusCircle className="front-icon" />}
                            handleFunction={handleRegister}
                            disable={isLoading}
                        />
                    </div>
                    {isLoading ? (
                        <Loading center />
                    ) : (
                        <div className="table">
                            <table>
                                <thead>
                                    <tr>
                                        <th width="5%">STT</th>
                                        <th width="20%">Tên Hạn Mức</th>
                                        <th width="15%">Ngày Đăng Ký</th>
                                        <th width="15%">Ngày Hết Hạn</th>
                                        <th width="15%">Ngày Hủy</th>
                                        <th width="15%">Trạng Thái</th>
                                        <th width="15%">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listLevelOfAgency.map((item, idx) => (
                                        <tr key={idx} className={item.isRegistering ? `bg-blue-blur` : ''}>
                                            <td>{idx + 1}</td>
                                            <td>{item?.level?.name}</td>
                                            <td>{new Date(`${item?.createTime}`).toLocaleString()}</td>
                                            <td>{new Date(`${item?.expireTime}`).toLocaleString()}</td>
                                            <td>{item?.cancelTime && new Date(`${item?.cancelTime}`).toLocaleString()}</td>
                                            <td>{item?.isQualified ? 'Đã Đạt' : 'Chưa Đạt'}</td>
                                            <td>
                                                {!item.isQualified && (
                                                    <Button
                                                        type="button"
                                                        classname="btn-custom  btn-icon detail button-react-select"
                                                        text="Kiểm tra"
                                                        // icon={<BiPlusCircle className="front-icon" />}
                                                        handleFunction={() =>
                                                            handleCheckLevel({
                                                                id: item.id,
                                                                levelId: item.levelId,
                                                                agencyId: item.agencyId,
                                                            })
                                                        }
                                                        disable={isLoading}
                                                    />
                                                )}
                                            </td>
                                            {/* <td>{}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                <div className="btn-container-agency">
                    <Button
                        type="button"
                        classname="btn-custom  btn-icon"
                        text="Hủy hạn mức hiện tại"
                        icon={<BiPlusCircle className="front-icon" />}
                        handleFunction={() => cancelLevel1({ agencyId: currentAgency.id })}
                    />
                    <Button
                        type="button"
                        classname="btn-custom  btn-icon btn-delete"
                        text="Thoát"
                        icon={<AiOutlineDelete className="front-icon" />}
                        handleFunction={() => setShowPopupLevel(false)}
                    />
                </div>
            </div>
        </Wrapper>
    );
};

export default memo(PopupLevelAgency);
