"use client";
import { createContext, useState } from "react";
import Inode from "@/models/Inode";
import InodeType from "../models/InodeType";
import { v4 as uuidv4 } from "uuid";
import InodeData from "../data/InodeData";
import useLocalStorage from "../hooks/useLocalStorage";

type InterfaceExplorerContext = {
  rootFolder: Inode;
  activeFileId: string;
  activeInode: Inode;
  cutQueIds: string[];
  searchResults: Inode[];
  activePath: string;
  getPathFromId: (id: string) => string;
  setSearchResults: (results: Inode[]) => void;
  setActiveFileId: (id: string) => void;
  deleteActiveInode: () => void;
  searchByName: (name: string) => Inode[];
  addFolder: (name: string) => void;
  addFile: (name: string, data: string) => void;
  renameInodeFromId: (newName: string, id: string) => void;
  addToCutQue: () => void;
  pasteToParentFolderOfActiveInode: () => void;
  getInodeText: (inode: Inode) => string;
};

const ExplorerContext = createContext<InterfaceExplorerContext>(
  {} as InterfaceExplorerContext,
);

type InterfaceExplorerProvider = {
  children: React.ReactNode;
};

const ExplorerProvider: React.FC<InterfaceExplorerProvider> = ({
  children,
}) => {
  const [rootFolder, setRootFolder] = useLocalStorage<Inode>(
    "vault",
    InodeData[0],
  );
  const [searchResults, setSearchResults] = useState<Inode[]>([]);
  const rootFolderId = rootFolder.id;
  const [activeFileId, setActiveFileId] = useState<string>(rootFolderId);
  const [cutQueIds, setCutQue] = useState<string[]>([]);

  const getParentFolder = (targetId: string, root: Inode): Inode => {
    const parent = root;
    if (parent.items) {
      const hasActiveFile = parent.items.find((item) => item.id == targetId);
      if (hasActiveFile) {
        return parent;
      }
      for (const item of parent.items) {
        if (item.type == InodeType.folder) {
          const found = getParentFolder(targetId, item);
          if (found) {
            return found;
          }
        }
      }
    }
    return parent;
  };
  const getInodeFromId = (targetId: string, root: Inode): Inode => {
    if (targetId == rootFolderId) return root;

    const parent = getParentFolder(targetId, root);
    if (parent.id == targetId) return parent;
    if (parent.type === InodeType.folder) {
      const hasFile = parent?.items?.find((item) => item.id == targetId);
      if (hasFile) {
        return hasFile;
      }
    }
    return parent;
  };

  const haveSameParent = (id1: string, id2: string, root: Inode): boolean => {
    const parent1 = getParentFolder(id1, root);
    const parent2 = getParentFolder(id2, root);
    if (parent1.id == parent2.id) return true;
    return false;
  };

  const makeInodeNameUnique = (newInode: Inode, locationInode: Inode) => {
    let count = 1;
    let uniqueName = newInode.name;

    while (locationInode.items?.find((item) => item.name === uniqueName)) {
      uniqueName = `${newInode.name} (${count})`;
      count += 1;
    }

    return uniqueName;
  };

  const createPathFromId = (
    id: string,
    root: Inode,
    currentPath: string = "",
  ): string | null => {
    if (root.type == InodeType.folder) {
      currentPath += `/${root.name}`;
    }
    if (root.id == id) {
      return currentPath;
    }
    if (root.type === InodeType.folder) {
      for (const item of root.items || []) {
        if (item.id == id) {
          return currentPath + `/${item.name}`;
        }
        if (item.type == InodeType.folder) {
          return createPathFromId(id, item, currentPath);
        }
      }
    }
    return currentPath;
  };

  const getPathFromId = (id: string): string => {
    const path = createPathFromId(id, rootFolder)?.slice(1) || "";
    if (path === null) return "";
    return path;
  };

  const deleteInode = (id: string) => {
    const parent = getParentFolder(id, rootFolder);
    if (parent === null) return;
    if (parent.type === InodeType.folder) {
      parent.items = parent.items?.filter((item) => item.id != id);
    }
    setRootFolder((prev) => ({ ...prev, ...rootFolder }));
    setActiveFileId(rootFolderId);
  };

  const createInodeAtActiveInode = (newInode: Inode) => {
    const currentInode = getInodeFromId(activeFileId, rootFolder);
    if (currentInode === null) return;

    // if the current inode is a folder, add the new folder to the items
    if (currentInode.type === InodeType.folder) {
      newInode.name = makeInodeNameUnique(newInode, currentInode);
      currentInode.items?.push(newInode);
    } else {
      // if the current inode is a file, add the new folder to the parent folder
      const parent = getParentFolder(activeFileId, rootFolder);
      if (parent === null) return;
      if (parent.type === InodeType.folder) {
        newInode.name = makeInodeNameUnique(newInode, parent);
        parent.items?.push(newInode);
      }
    }

    setRootFolder((prev) => ({ ...prev, ...rootFolder }));
    setActiveFileId(newInode.id);
  };

  const addFolder = (name: string) => {
    const newFolder: Inode = {
      id: uuidv4(),
      name,
      type: InodeType.folder,
      items: [],
    };
    createInodeAtActiveInode(newFolder);
  };

  const addFile = (name: string, data: string) => {
    const newFile: Inode = {
      id: uuidv4(),
      name,
      data,
      type: InodeType.file,
    };
    createInodeAtActiveInode(newFile);
  };

  const addToCutQue = () => {
    //  only add to cut que if its not already in the cut que
    // if the que is empty add to the que else
    //  only add to the que if its not already in the que
    // only add to que if its a neighbor of the active file
    if (activeFileId == rootFolderId) return;
    if (cutQueIds.includes(activeFileId)) return;

    if (
      cutQueIds.length > 0 &&
      haveSameParent(activeFileId, cutQueIds[0], rootFolder)
    ) {
      setCutQue((prev) => [...prev, activeFileId]);
      return;
    }

    setCutQue([activeFileId]);
    return;
  };

  const pasteToParentFolderOfActiveInode = () => {
    if (cutQueIds.length == 0) return;

    const moveToParent = getParentFolder(activeFileId, rootFolder);

    const moveFromParent = getParentFolder(cutQueIds[0], rootFolder);
    if (moveToParent === null || moveFromParent === null) return;
    // only paste if the paste location is not in the cut que
    if (moveFromParent.id == moveToParent.id) {
      setCutQue([]);
      return;
    }
    const copyInodes = cutQueIds.map((id) => getInodeFromId(id, rootFolder));

    //  make the names unique
    copyInodes.forEach((inode) => {
      inode.name = makeInodeNameUnique(inode, moveToParent);
    });

    // move "copyInodes" to "moveToParent"
    moveToParent.items?.push(...copyInodes);

    // remove "copyInodes" from "moveFromParent"
    moveFromParent.items = moveFromParent.items?.filter(
      (item) => !cutQueIds.includes(item.id),
    );

    setRootFolder((prev) => ({ ...prev, ...rootFolder }));
    setCutQue([]);
    // TODO: Add a toast for success/failure
  };

  const renameInodeFromId = (newName: string, id: string) => {
    if (newName == "") return;
    if (id === null) return;

    const activeInode = getInodeFromId(id, rootFolder);
    if (activeInode === null) return;

    activeInode.name = newName;

    setRootFolder((prev) => ({ ...prev, ...rootFolder }));
  };

  const searchByName = (name: string): Inode[] => {
    const results: Inode[] = [];

    if (name == "") {
      setSearchResults([]);
      return results;
    }

    const filterInodesByName = (name: string, root: Inode): void => {
      if (root.name.toLowerCase().startsWith(name.toLowerCase())) {
        results.push(rootFolder);
      }
      if (root.type === InodeType.folder) {
        root.items?.forEach((item) => {
          if (item.name.toLowerCase().startsWith(name.toLowerCase())) {
            results.push(item);
          }
          if (item.type == InodeType.folder) {
            filterInodesByName(name, item);
          }
        });
      }
    };

    filterInodesByName(name, rootFolder);
    setSearchResults(results);
    return results;
  };

  const getInodeText = (inode: Inode) => {
    const extensions = [".txt", ".js", ".ts", ".json"];
    const hasTextExtension = extensions.some((ext) => inode.name.endsWith(ext));
    return hasTextExtension ? inode.data || "" : "This is not a text file";
  };

  // ======================= TODO =======================
  //  TODO: Add a toast for success/failure (for all actions)
  // TODO: Add a README.md
  // TOD0: Ask about Redux or is Context Api good enough?

  return (
    <ExplorerContext.Provider
      value={{
        rootFolder,
        activeFileId,
        cutQueIds,
        getPathFromId,
        activePath: getPathFromId(activeFileId),
        activeInode: getInodeFromId(activeFileId, rootFolder),
        setActiveFileId,
        searchResults,
        setSearchResults,
        deleteActiveInode: () => deleteInode(activeFileId),
        searchByName,
        addFolder,
        addFile,
        renameInodeFromId,
        addToCutQue,
        pasteToParentFolderOfActiveInode,
        getInodeText,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  );
};

export { ExplorerContext, ExplorerProvider };
