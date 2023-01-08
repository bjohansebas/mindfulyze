import { useEffect, useState } from 'react'

function useLocalStorage (itemName, initialValue) {
  const [sincronizedItem, setSincronizedItem] = useState(true)
  const [item, setItem] = useState(initialValue)

  useEffect(() => {
    try {
      const localStorageItem = localStorage.getItem(itemName)
      let parsedItem

      if (!localStorageItem) {
        localStorage.setItem(itemName, JSON.stringify(initialValue))
        parsedItem = initialValue
      } else {
        parsedItem = JSON.parse(localStorageItem)
      }

      setSincronizedItem(true)
      setItem(parsedItem)
    } catch (e) {
      console.error('Error')
    }
  }, [sincronizedItem])

  const saveItem = (newItem) => {
    try {
      const stringifiedItem = JSON.stringify(newItem)
      localStorage.setItem(itemName, stringifiedItem)

      setItem(newItem)
    } catch (error) {
      console.error('Error')
    }
  }

  const sincronizeItem = () => {
    setSincronizedItem(false)
  }

  return {
    item,
    saveItem,
    sincronizeItem
  }
}

export { useLocalStorage }
