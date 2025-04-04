import { ComponentProps, FC, ReactNode } from 'react'
import './styles.scss'
import cn from 'classnames'

type ButtonColor = 'light' | 'golden'

interface Props extends ComponentProps<'button'> {
  className?: string
  startIcon?: ReactNode
  endIcon?: ReactNode
  children?: ReactNode
  color?: ButtonColor
}

const Button: FC<Props> = ({
  className,
  startIcon,
  endIcon,
  children,
  color = 'golden',
  ...props
}) => {
  const classes = {
    'button_start-icon': startIcon,
    'button_end-icon': endIcon
  }

  return (
    <button className={cn('button', className, classes, color)} {...props}>
      {startIcon}
      <span>{children}</span>
      {endIcon}
    </button>
  )
}

export default Button
