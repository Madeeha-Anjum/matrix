import InodeType from "@/models/InodeType";
import React, { useContext } from "react";
import Icon from "@/components/icons/icons";
import Inode from "@/models/Inode";
import classnames from "classnames";
import { ExplorerContext } from "@/store/ExplorerContext";

const activeFileCss = "bg-opacity-50 bg-white bg-opacity-10 rounded-md p-1";
const cutQueCss = "opacity-40 rounded-md p-1";

type ExplorerInodeProps = {
  files: Inode[] | undefined;
};

const File: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <div className="mb-1 flex justify-start space-x-2 p-1">
      <Icon.File className="h-5 w-5"></Icon.File>
      <div>{fileName}</div>
    </div>
  );
};

const Folder: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <div className="mb-1 flex justify-start space-x-2 p-1">
      <Icon.Folder className="text-blue-400"></Icon.Folder>
      <div>{fileName}</div>
    </div>
  );
};

const ExplorerInode: React.FC<ExplorerInodeProps> = ({ files }) => {
  const { activeFileId, setActiveFileId, cutQueIds } =
    useContext(ExplorerContext);

  const isInCutQue = (id: string): boolean => {
    if (cutQueIds.includes(id)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <div className="flex flex-col space-y-1">
        {files?.map((file) => {
          if (file.type === InodeType.folder) {
            return (
              <div
                key={file.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFileId(file.id);
                }}
                className={classnames("ml-2", {
                  [activeFileCss]: activeFileId === file.id,
                  [cutQueCss]: isInCutQue(file.id),
                })}
              >
                <Folder fileName={file.name}></Folder>
                {file.items && (
                  <ExplorerInode files={file.items}></ExplorerInode>
                )}
              </div>
            );
          } else {
            return (
              <div
                key={file.id}
                className={classnames("ml-2", {
                  [activeFileCss]: activeFileId === file.id,
                  [cutQueCss]: isInCutQue(file.id),
                })}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveFileId(file.id);
                }}
              >
                <File fileName={file.name}></File>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default ExplorerInode;
