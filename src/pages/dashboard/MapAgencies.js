import Map, { FullscreenControl, Marker, Popup } from 'react-map-gl';
import { useEffect, useState } from 'react';
import { FaCircle } from 'react-icons/fa';

import Wrapper from '../../assets/wrappers/DashboardManager';
import { Loading } from '../../components';
import addressData from '../../utils/data.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { getAgenciesInMap } from '../../app/agency/agencySlice';
import { MarkerAndPopup } from './components';
import { BiStore } from 'react-icons/bi';

let provinceData = addressData.map((province) => ({
    value: province.Name,
    label: province.Name,
}));
provinceData.unshift({ value: 'NATIONWIDE', label: 'Toàn Quốc' });
const MapAgencies = () => {
    const isLoading = useSelector((state) => state.agency.isLoading);
    const listAgencies = useSelector((state) => state.agency.listAgencies);

    // const [showPopup, setShowPopup] = useState(false);
    const [address, setAddress] = useState({
        listProvince: provinceData,
        listDistrict: [],
        province: { value: 'NATIONWIDE', label: 'Toàn Quốc' },
        district: { value: '', label: '' },
    });

    const dispatch = useDispatch();

    const handleChangeProvince = (selectOption) => {
        return setAddress({
            ...address,
            province: { value: selectOption.value, label: selectOption.label },
        });
    };

    const handleChangeDistrict = (selectOption) => {
        return setAddress({
            ...address,
            district: { value: selectOption.value, label: selectOption.label },
        });
    };

    useEffect(() => {
        if (address.province.value === 'NATIONWIDE') {
            dispatch(
                getAgenciesInMap({
                    provinceSearch: 'NATIONWIDE',
                    districtSearch: '',
                })
            )
                .then((data) => {
                    setAddress((prev) => ({
                        ...prev,
                        listDistrict: [],
                        district: {
                            value: '',
                            label: '',
                        },
                    }));
                })
                .catch((error) => console.log(error.message));
        } else {
            // dispatch(
            //     getAgenciesInMap({
            //         provinceSearch: address.province.value,
            //         districtSearch: 'TOTAL_PROVINCE',
            //     })
            // )
            // .then((data) => {
            let listDistrict = addressData
                .find((province) => province.Name === address.province.value)
                .Districts.map((district) => ({
                    value: district.Name,
                    label: district.Name,
                }));
            listDistrict.unshift({
                value: 'TOTAL_PROVINCE',
                label: 'Toàn Tỉnh',
            });
            setAddress((prev) => ({
                ...prev,
                listDistrict: listDistrict,
                district: { value: 'TOTAL_PROVINCE', label: 'Toàn Tỉnh' },
            }));
            // })
            // .catch((error) => console.log(error.message));
        }
    }, [address.province, dispatch]);

    useEffect(() => {
        if (address.district.value !== '') {
            dispatch(
                getAgenciesInMap({
                    provinceSearch: address.province.value,
                    districtSearch: address.district.value,
                })
            )
                .then((data) => {})
                .catch((error) => console.log(error.message));
        }
    }, [address.district, dispatch, address.province]);
    return (
        <Wrapper>
            <h5>Bản đồ đại lý</h5>
            <hr />
            <div className="form flex-two-row">
                <div className="form-row">
                    <label htmlFor="provinceAg" className="form-label">
                        Tỉnh/Thành Phố
                    </label>
                    <Select
                        id="provinceAg"
                        name="provinceAg"
                        value={address.province}
                        onChange={handleChangeProvince}
                        options={address.listProvince}
                        placeholder="Chọn Tỉnh/Thành Phố"
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="districtAg" className="form-label">
                        Quận/Huyện
                    </label>
                    <Select
                        id="districtAg"
                        value={address.district}
                        onChange={handleChangeDistrict}
                        options={address.listDistrict}
                        placeholder="Chọn Quận/Huyện"
                    />
                </div>
                <p className="p-common">Có {listAgencies ? listAgencies.length : '0'} Đại Lý</p>
            </div>
            {isLoading ? (
                <Loading center />
            ) : (
                <Map
                    initialViewState={{
                        longitude: 105,
                        latitude: 15,
                        zoom: 4,
                    }}
                    style={{ width: '100%', height: 400 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
                >
                    <FullscreenControl />

                    {listAgencies &&
                        listAgencies.map((agency, index) => {
                            return (
                                <div key={index}>
                                    <MarkerAndPopup agency={agency} />
                                </div>
                            );
                        })}
                </Map>
            )}
        </Wrapper>
    );
};

export default MapAgencies;
