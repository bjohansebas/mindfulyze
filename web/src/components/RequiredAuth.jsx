import localforage from 'localforage'
import { useEffect } from 'react'
import { Outlet, redirect, useNavigate } from 'react-router-dom'
import { MenuApp } from '../routes/Main/MenuNav'
import axios from '../api/axios'

function RequiredAuth () {
  const navigate = useNavigate()
  useEffect(() => {
    async function existUser () {
      const credential = await localforage.getItem('credentials_token')
      const userId = await localforage.getItem('userInfo_userId')
      if (!credential || !userId) {
        return navigate('/login', { replace: true })
      }
      try {
        await axios.get(`users/${userId}`, {
          headers: {
            Authorization: `Bearer ${credential}`
          }
        })
      } catch (err) {
        return redirect('/login', { replace: true })
      }
    }

    existUser()
  }, [])

  return (<>
    <MenuApp />
    <Outlet />
  </>
  )
}
export { RequiredAuth }
