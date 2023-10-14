import React from "react";

const Cut = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      {...props}
    >
      <title>Cut</title>
      <g data-name="cut, sccisors, interface, crop, trim, resize, film, split">
        <path d="M12,22a3.93,3.93,0,0,0-.6.06l2.51-5.65a1,1,0,1,0-1.82-.82L9,22.54,5.91,15.59a1,1,0,0,0-1.82.82L6.6,22.06A3.93,3.93,0,0,0,6,22a4,4,0,1,0,3,6.62A4,4,0,1,0,12,22ZM6,28a2,2,0,1,1,2-2A2,2,0,0,1,6,28Zm6,0a2,2,0,1,1,2-2A2,2,0,0,1,12,28Z" />
        <path d="M29,2H9A1,1,0,0,0,8,3V16a1,1,0,0,0,2,0V4H28V22H17.92a1,1,0,0,0,0,2H29a1,1,0,0,0,1-1V3A1,1,0,0,0,29,2Z" />
      </g>
    </svg>
  );
};

export default Cut;
