'use client'
import React from 'react'
import classnames from 'classnames'

type Props = {
  children?: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}
const Click: React.FC<Props> = ({
  children,
  className = '',
  type,
  onClick,
}) => {
  return (
    <button
      className={classnames(
        'border-b-2 border  px-2 bg-blue-800/50 text-gray-300  rounded-md  h-full active:border-b active:scale-95',
        className
      )}
      type={type || 'button'}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Click
