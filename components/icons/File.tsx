import React from "react";

const File = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      version="1.1"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>File</title>
      <g transform="translate(0 -1028.4)">
        <path
          d="m5 1030.4c-1.1046 0-2 0.9-2 2v8 4 6c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-6-4-4l-6-6h-10z"
          fill="#95a5a6"
        />
        <path
          d="m5 1029.4c-1.1046 0-2 0.9-2 2v8 4 6c0 1.1 0.8954 2 2 2h14c1.105 0 2-0.9 2-2v-6-4-4l-6-6h-10z"
          fill="#bdc3c7"
        />
        <path d="m21 1035.4-6-6v4c0 1.1 0.895 2 2 2h4z" fill="#95a5a6" />
      </g>
    </svg>
  );
};

export default File;
