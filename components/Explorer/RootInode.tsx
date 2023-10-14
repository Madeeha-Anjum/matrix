import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Icon from "../icons/icons";
import Inode from "@/models/Inode";
import { ExplorerContext } from "@/store/ExplorerContext";

type Props = {
  rootInode: Inode;
};

const RootInode: React.FC<Props> = ({ rootInode }) => {
  const { renameInodeFromId } = useContext(ExplorerContext);
  const [isVaultFocused, setIsVaultFocused] = useState(false);
  const [newName, setInputValue] = useState("");

  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  useEffect(() => {
    if (isVaultFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isVaultFocused]);

  const handleInputBlur = () => {
    renameInodeFromId(newName, rootInode.id);
    setInputValue(rootInode.name);
  };

  return (
    <>
      <div className="m-1 flex w-full justify-between space-x-2 border-b border-l-2 p-1">
        <div className="flex w-full space-x-2">
          <Icon.Folder className="h-6 w-8 text-gray-600" />
          <input
            type="text"
            ref={inputRef}
            className="pointer-events-none w-full cursor-not-allowed bg-inherit text-white placeholder:text-white"
            autoComplete="off"
            placeholder={rootInode.name}
            value={newName}
            onBlur={() => {
              setIsVaultFocused(false);
              handleInputBlur();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setIsVaultFocused(false);
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Icon.Rename
          className="h-6 w-6 cursor-pointer"
          onClick={() => setIsVaultFocused(true)}
        />
      </div>
    </>
  );
};

export default RootInode;
