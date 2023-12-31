import React from "react";

const Trash = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      {...props}
    >
      <title>Delete</title>
      <path d="M42,3H28a2,2,0,0,0-2-2H22a2,2,0,0,0-2,2H6A2,2,0,0,0,6,7H42a2,2,0,0,0,0-4Z" />
      <path d="M39,9a2,2,0,0,0-2,2V43H11V11a2,2,0,0,0-4,0V45a2,2,0,0,0,2,2H39a2,2,0,0,0,2-2V11A2,2,0,0,0,39,9Z" />
      <path d="M21,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z" />
      <path d="M31,37V19a2,2,0,0,0-4,0V37a2,2,0,0,0,4,0Z" />
    </svg>
  );
};

export default Trash;
