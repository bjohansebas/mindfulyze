import React from 'react'

function useStorageListener (key, sincronize) {
  const [storageChange, setStorageChange] = React.useState(false)

  window.addEventListener('storage', (change) => {
    if (change.key === key) {
      setStorageChange(true)
    }
  })

  const toggleShow = () => {
    sincronize()
    setStorageChange(false)
  }

  return {
    storageChange,
    toggleShow
  }
}

export { useStorageListener }
