import classnames from "classnames";
import React, { useContext, useEffect, useState } from "react";
import Icon from "@/app/components/icons/icons";
import { ExplorerContext } from "@/app/store/ExplorerContext";
import Button from "@/app/components/ui/Button";

type Props = {};

const Rename: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeInode, renameInodeFromId: renameInode } =
    useContext(ExplorerContext);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setNewName(activeInode.name);
  }, [activeInode]);

  // close the modal when clicking outside of it
  // prevent propagation of clicks inside the modal
  useEffect(() => {
    const close = () => setIsModalOpen(false);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const rename = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsModalOpen(false);
    renameInode(newName, activeInode.id); // rename the inode
    setNewName(""); // reset the input
  };

  return (
    <div className="relative text-black">
      <Icon.Rename
        className="h-6 w-6 cursor-pointer text-white"
        onClick={(e) => {
          e.stopPropagation();
          setIsModalOpen(!isModalOpen);
          // focus the input
        }}
      />
      <div
        className={classnames(
          "absolute left-0 m-2 mt-2 min-h-full min-w-max rounded-lg border bg-white p-1 shadow-lg",
          { hidden: !isModalOpen },
        )}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <form className="flex flex-col" onSubmit={(e) => rename(e)}>
            <div>
              <label htmlFor="new_name" className="flex">
                <h1 className="text-md text-center font-semibold">Rename</h1>
                <Icon.Close
                  className="h-6 w-6 basis-1 cursor-pointer "
                  onClick={() => setIsModalOpen(false)}
                />
              </label>
              <input
                autoFocus
                type="text"
                onChange={(e) => setNewName(e.target.value)}
                defaultValue={newName}
                autoComplete="off"
                className="w-full rounded-md border border-gray-400 active:border-blue-800"
              />
            </div>
            <Button
              className="mt-2 bg-purple-950/80 p-1 hover:bg-blue-900/80"
              type="submit"
            >
              Rename
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Rename;
