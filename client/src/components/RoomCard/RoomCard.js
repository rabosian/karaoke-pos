import React, { useEffect, } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './RoomCard.module.css'

// TO DO
// 1. RoomCard render할 때마다 Order info data fetch (useEffect, setTimeout)
// - isKorean, customer_num, date, total
// 2. isActive == true인 room은 다른색으로 표시
const RoomCard = () => {

  const navigate = useNavigate();

  // useEffect(()=>{
  //   // API call 
  // }, [])



  return (
    <div className={styles.box}>
      <div className={styles.info} onClick={() => navigate('/room/1')}>
        <h4>Room 1</h4>
        <div>Korean</div>
        <div>entered at:</div>
        <div>Time Remaining:</div>
        <div>Total</div>
      </div>
    </div>
  )
}

export default RoomCard
