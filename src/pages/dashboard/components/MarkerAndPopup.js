import { useState } from 'react';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiStore } from 'react-icons/bi';
import { FaCircle, FaRegAddressCard } from 'react-icons/fa';
import { Marker, Popup } from 'react-map-gl';

const MarkerAndPopup = ({ agency }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <>
            {showPopup && (
                <Popup
                    // key={Math.random().toString(36).slice(-5) + Math.floor(Date.now() / 1000)}
                    longitude={agency.longitude}
                    latitude={agency.latitude}
                    closeButton={true}
                    closeOnClick={false}
                    onClose={() => setShowPopup(false)}
                    anchor="top-left"
                >
                    <div className="icon-map">
                        <span>
                            <BiStore className="icon-marker" />{' '}
                        </span>

                        {agency.name}
                    </div>
                    <div className="icon-map">
                        <span>
                            <AiOutlinePhone className="icon-marker" />
                        </span>
                        {agency.phone}
                    </div>
                    <div className="icon-map">
                        <span>
                            <FaRegAddressCard className="icon-marker" />{' '}
                        </span>
                        {agency.address}
                    </div>
                </Popup>
            )}
            <Marker
                // key={Math.random().toString(36).slice(-5) + Math.floor(Date.now() / 1000) + index}
                longitude={agency.longitude}
                latitude={agency.latitude}
                anchor="bottom"
                offsetLeft={-20}
                offsetTop={-10}
            >
                <span onClick={() => setShowPopup(!showPopup)}>
                    <FaCircle size={18} color="red" />
                </span>
            </Marker>
        </>
    );
};

export default MarkerAndPopup;
