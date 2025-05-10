import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'

function getWindowDimensions() {
  const rootElement = document.querySelector('#root')

  const { width, height } = {
    width: isMobile
      ? window.innerWidth
      : rootElement
      ? rootElement.clientWidth
      : window.innerWidth,
    height: isMobile
      ? window.innerHeight
      : rootElement
      ? rootElement.clientHeight
      : window.innerHeight
  }
  const orientation = width / height > 1 ? 'landscape' : 'portrait'

  // console.log({ width, height, orientation })

  return {
    width,
    height,
    orientation
  }
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  )

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowDimensions
}
