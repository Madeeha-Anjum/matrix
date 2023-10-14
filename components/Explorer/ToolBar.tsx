import { ExplorerContext } from "@/store/ExplorerContext";
import React, { useContext } from "react";
import Icon from "../icons/icons";
import Rename from "./Rename";

const ToolBar: React.FC = () => {
  const {
    deleteActiveInode,
    addFolder,
    addToCutQue,
    pasteToParentFolderOfActiveInode,
  } = useContext(ExplorerContext);

  return (
    <aside className="relative mb-2 flex justify-end space-x-4 rounded-md bg-gray-800 p-2">
      <Icon.AddFolder
        className="h-6 w-6 cursor-pointer"
        onClick={() => addFolder("New Folder")}
      />
      <Rename />
      <Icon.Cut className="h-6 w-6 cursor-pointer" onClick={addToCutQue} />
      <Icon.Paste
        className="h-6 w-6 cursor-pointer"
        onClick={pasteToParentFolderOfActiveInode}
      />
      <Icon.Trash
        className="h-6 w-5 cursor-pointer"
        onClick={deleteActiveInode}
      />
    </aside>
  );
};

export default ToolBar;
