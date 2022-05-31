import axios from 'axios';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { GrLocation } from 'react-icons/gr';
import Map, { FullscreenControl, Marker } from 'react-map-gl';
import { useSelector } from 'react-redux';

const GoogleMapAgency = ({ extraInfoOfAddress, address, setGeocoding, geocoding }) => {
    const isEditing = useSelector((state) => state.agency.isEditing);
    // const currentAgency = useSelector((state) => state.agency.currentAgency);

    const handleChangMap = (e) => {
        let value = e.target.value;
        const [lat, lng] = value.split(',');
        setGeocoding({ lat: lat.trim(), lng: lng.trim() });
    };

    useEffect(() => {
        const switchAddress = async () => {
            let newAddress =
                extraInfoOfAddress + ', ' + address.wardAg + ', ' + address.districtAg + ', ' + address.provinceAg;
            const { data } = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${newAddress}.json?access_token=${process.env.REACT_APP_MAP_BOX_API_KEY}`
            );
            setGeocoding({
                lat: data.features[0].center[1],
                lng: data.features[0].center[0],
            });
        };
        if (address.from === 'NOT_EDITING') switchAddress();
    }, [address]);
    return (
        <div>
            <input
                type="text"
                placeholder="10.853106894022666, 106.76070001093494"
                className="form-input"
                onChange={handleChangMap}
                value={geocoding && geocoding.lat + ', ' + geocoding.lng}
            />
            <br />
            <div>
                <Map
                    id="select-map-agency"
                    initialViewState={{
                        longitude: 105,
                        latitude: 17,
                        zoom: 4,
                    }}
                    style={{ width: '100%', height: 400 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAP_BOX_API_KEY}
                    onClick={(e) => setGeocoding({ lat: e.lngLat.lat, lng: e.lngLat.lng })}
                >
                    <FullscreenControl />
                    {geocoding && (
                        <Marker longitude={geocoding.lng} latitude={geocoding.lat} anchor="bottom">
                            <GrLocation size="25" color="red" />
                        </Marker>
                    )}
                </Map>
            </div>
            <br />
        </div>
    );
};

export default GoogleMapAgency;
