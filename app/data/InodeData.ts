import InodeType from "../models/InodeType";
import Inode from "../models/Inode";

const InodeData: Array<Inode> = [
  {
    id: "6203882d-a20c-4a46-a965-65e888c01756",
    name: "root",
    type: InodeType.folder,
    items: [
      {
        id: "dd2897a7-7452-4b60-840d-a586fc2ee27b",
        name: "prettier.js",
        type: InodeType.file,
        data: " module.exports = {// Prettier rules prettier: {jsxSingleQuote: true, singleQuote: true,semi: false,},plugins: ['prettier-plugin-tailwindcss'],};",
      },
      {
        id: "2450ecaa-4bef-4c1f-a6f9-02a7b53c812f",
        name: "test2.txt",
        type: InodeType.file,
        data: "test2",
      },
      {
        id: "8001df76-ea7a-42eb-ab3e-b3b4592f938d",
        name: "test",
        type: InodeType.folder,
        items: [
          {
            id: "9fad3a4e-bbc7-4fb1-be72-b5db3447ba91",
            name: "test.txt",
            type: InodeType.file,
            data: "test",
          },
        ],
      },
    ],
  },
];

export default InodeData;
