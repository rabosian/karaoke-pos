import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomDetail = () => {
  const { roomId } = useParams();



//   useEffect(() => {
//     getRoomDetail();
//   }, []);

  return <div>{roomId}</div>;
};

export default RoomDetail;
