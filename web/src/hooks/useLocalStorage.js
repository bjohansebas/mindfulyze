import { useEffect, useState } from 'react'
import localforage from 'localforage'

function useLocalStorage (key) {
  const [value, setValue] = useState(null)

  useEffect(() => {
    async function getData () {
      const data = await localforage.getItem(key)
      setValue(data)
    }

    getData()
  }, [])

  const saveData = async (data) => {
    await localforage.setItem(key, data)
    setValue(data)
  }

  return [value, saveData]
}

export { useLocalStorage }
