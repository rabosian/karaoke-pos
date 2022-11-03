import React from 'react';
import { useParams } from 'react-router-dom';

const RoomPage = () => {
    const { roomId } = useParams();
    return (
        <>
            <h3>{roomId}번 방 이라구..</h3>
        </>
    );
}

export default RoomPage;