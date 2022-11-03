import React from 'react'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const auth = useSelector((state) => state.auth)

  return (
    <div>
      <h1>Karaoke</h1>
      <h2>{auth.username}</h2>
    </div>
  )
}

export default HomePage