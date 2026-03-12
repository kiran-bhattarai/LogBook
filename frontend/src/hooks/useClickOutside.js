import { useEffect } from "react"

function useClickOutside(ref, callback) {

  useEffect(() => {

    async function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        await callback()
      }
    }

    document.addEventListener("mousedown", handleClick)

    return () => document.removeEventListener("mousedown", handleClick)

  }, [ref, callback])
}

export default useClickOutside