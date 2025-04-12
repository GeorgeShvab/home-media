import { FC, ReactNode, useEffect, useRef } from 'react'

interface Props {
  children: ReactNode
  onOutsideClick: () => void
}

const DetectOutsideClick: FC<Props> = ({ children, onOutsideClick }) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current?.contains(e.target as HTMLElement)) {
        return
      }

      onOutsideClick()
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [onOutsideClick])

  return <div ref={containerRef}>{children}</div>
}

export default DetectOutsideClick
