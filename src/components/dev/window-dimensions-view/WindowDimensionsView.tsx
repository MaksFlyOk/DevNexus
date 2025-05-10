import useWindowDimensions from '@hooks/useWindowDimensions'

export const WindowDimensionsView = () => {
  const { width, height } = useWindowDimensions()
  return (
    <h5
      style={{
        userSelect: 'none',
        position: 'fixed',
        top: 0,
        left: 0,
        padding: '10px',
        zIndex: '1000000'
      }}
    >
      w-{width} h-{height}
    </h5>
  )
}
