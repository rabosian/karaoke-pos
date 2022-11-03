import React from 'react'
import RoomPage from './RoomPage';
import { Link, Button } from "react-router-dom";

const HomePage = () => {

  return (
    <div>
			<h3>메인이라구</h3>
			<ul>
				<button><Link to="/room/1"><li>1번방</li></Link></button>
				<Link to="/room/2"><li>2번방</li></Link>
			</ul>
    </div>
  )
}

export default HomePage