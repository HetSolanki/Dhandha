import { useCookies } from 'react-cookie'
import React from 'react'

const Home = () => {
  const [cookies, setCookie] = useCookies(['username'])
  return (
    <div>Welcome {cookies.username}</div>
  )
}

export default Home