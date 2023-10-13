import React from 'react'

const Close = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height='16'
      fill='currentColor'
      {...props}
      viewBox='0 0 16 16'
      width='16'
      xmlns='http://www.w3.org/2000/svg'
    >
      <title>Close</title>
      <polygon
        fillRule='evenodd'
        points='8 9.414 3.707 13.707 2.293 12.293 6.586 8 2.293 3.707 3.707 2.293 8 6.586 12.293 2.293 13.707 3.707 9.414 8 13.707 12.293 12.293 13.707 8 9.414'
      />
    </svg>
  )
}

export default Close