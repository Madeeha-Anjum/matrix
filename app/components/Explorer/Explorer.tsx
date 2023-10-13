import React, { useContext } from "react";
import ExplorerInode from "./ExplorerInode";
import { ExplorerContext } from "@/app/store/ExplorerContext";
import RootInode from "./RootInode";
import ToolBar from "./ToolBar";
import Upload from "./Upload";
import Icon from "../icons/icons";

const Explorer: React.FC = () => {
  const { inode } = useContext(ExplorerContext);

  return (
    <section className="m-2 flex w-1/5  min-w-fit flex-col bg-gray-900">
      <ToolBar />
      <div className="flex-grow">
        <main className="p-2">
          <RootInode rootInode={inode} />
          <ExplorerInode files={inode.items} />
        </main>
      </div>
      <div className="mt-auto cursor-pointer p-2 opacity-40">
        <Upload>
          <p className="m-2 text-center text-sm">Browse for a file to upload</p>
          <div className="flex justify-center">
            <Icon.Upload className="h-6 w-6" />
          </div>
        </Upload>
      </div>
    </section>
  );
};

export default Explorer;
