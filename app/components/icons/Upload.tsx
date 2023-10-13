import React from "react";

const Upload = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      version="1.1"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Upload</title>
      <g id="info" />
      <g id="icons">
        <path
          d="M20,6h-6.8c-0.8,0-1.4-0.4-1.8-1.1l-0.9-1.8C10.2,2.4,9.5,2,8.8,2H4C1.8,2,0,3.8,0,6v12c0,2.2,1.8,4,4,4h5   c0.6,0,1-0.4,1-1v-4H8.8c-0.9,0-1.3-1.1-0.7-1.7l3.2-3.2c0.4-0.4,1-0.4,1.4,0l3.2,3.2c0.6,0.6,0.2,1.7-0.7,1.7H14v4   c0,0.6,0.4,1,1,1h5c2.2,0,4-1.8,4-4v-8C24,7.8,22.2,6,20,6z"
          id="paste"
        />
      </g>
    </svg>
  );
};

export default Upload;
