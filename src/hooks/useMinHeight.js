import React from 'react'

const useMinHeight = () => {
  const [minHeight, setMinHeight] = React.useState(localStorage.getItem("minHeight") || 0);

  React.useEffect(() => {
    const handleResize = () => {
      setMinHeight(val => {
        if (window.innerHeight > val) {
          localStorage.setItem("minHeight", window.innerHeight)
          return window.innerHeight
        }

        return val
      })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, []);

  return [minHeight]
}

export default useMinHeight
