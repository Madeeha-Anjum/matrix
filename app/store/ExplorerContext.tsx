'use client'
import { createContext, useState } from 'react'
import InodeData from '@/app/data/InodeData'
import Inode from '@/app/models/Inode'
import InodeType from '../models/InodeType'
import { randomBytes } from 'crypto'

type InterfaceExplorerContext = {
  inode: Inode
  activeFileId: number
  activeInode: Inode
  cutQueIds: number[]
  setActiveFileId: (id: number) => void
  deleteInode: () => void
  activePath: string | undefined
  addFolder: (name: string) => void
  addFile: () => void
  renameInodeFromId: (newName: string, id: number) => void
  addToCutQue: () => void
  pasteInParentFolder: () => void
}

const ExplorerContext = createContext<InterfaceExplorerContext>(
  {} as InterfaceExplorerContext
)

type InterfaceExplorerProvider = {
  children: React.ReactNode
}

const ExplorerProvider: React.FC<InterfaceExplorerProvider> = ({
  children,
}) => {
  const [inode, setInode] = useState<Inode>(
    InodeData[0] || {
      id: 1,
      name: 'root',
      type: InodeType.folder,
      items: [],
    }
  )
  const [activeFileId, setActiveFileId] = useState<number>(inode.id)
  const [cutQueIds, setCutQue] = useState<number[]>([])

  const getParentFolder = (targetId: number, root: Inode): Inode => {
    const parent = root
    if (parent.items) {
      const hasActiveFile = parent.items.find((item) => item.id == targetId)
      if (hasActiveFile) {
        return parent
      }
      for (const item of parent.items) {
        if (item.type == InodeType.folder) {
          const found = getParentFolder(targetId, item)
          if (found) {
            return found
          }
        }
      }
    }
    return parent
  }
  const getInodeFromId = (targetId: number, root: Inode): Inode => {
    if (root.id == targetId) return root

    const parent = getParentFolder(targetId, root)
    if (parent.id == targetId) return parent
    if (parent.type === InodeType.folder) {
      const hasFile = parent?.items?.find((item) => item.id == targetId)
      if (hasFile) {
        return hasFile
      }
    }
    return parent
  }

  const haveSameParent = (id1: number, id2: number, root: Inode): boolean => {
    const parent1 = getParentFolder(id1, root)
    const parent2 = getParentFolder(id2, root)
    if (parent1.id == parent2.id) return true
    return false
  }

  const makeInodeNameUnique = (newInode: Inode, locationInode: Inode) => {
    let count = 1
    let uniqueName = newInode.name

    while (locationInode.items?.find((item) => item.name === uniqueName)) {
      // TODO: Account for the file extension
      uniqueName = `${newInode.name} (${count})`
      count += 1
    }

    return uniqueName
  }

  const findActivePath = (
    id: number,
    root: Inode,
    currentPath: string
  ): string | null => {
    if (root.type == InodeType.folder) {
      currentPath += `/${root.name}`
    }
    if (root.id == id) {
      return currentPath
    }
    if (root.type === InodeType.folder && 'items' in root) {
      for (const item of root.items || []) {
        if (item.id == id) {
          return currentPath + `/${item.name}`
        }
        if (item.type == InodeType.folder) {
          return findActivePath(id, item, currentPath)
        }
      }
    }
    return currentPath
  }

  const deleteInode = () => {
    const deleteActiveInode = (root: Inode): Inode => {
      if (activeFileId == 1) return root

      if (root.type === InodeType.folder && 'items' in root) {
        root.items = root?.items?.filter((item) => {
          if (item.id == activeFileId) {
            return false
          }
          if (item.type == InodeType.folder) {
            return deleteActiveInode(item)
          }
          return true
        })
      }
      return root
    }
    const newInode = deleteActiveInode(inode)
    setInode((prev) => ({ ...prev, ...newInode }))
    setActiveFileId(1)
  }

  const createInode = (newInode: Inode) => {
    const currentInode = getInodeFromId(activeFileId, inode)
    if (currentInode === null) return

    // if the current inode is a folder, add the new folder to the items
    if (currentInode.type === InodeType.folder) {
      newInode.name = makeInodeNameUnique(newInode, currentInode)
      currentInode.items?.push(newInode)
    } else {
      // if the current inode is a file, add the new folder to the parent folder
      const parent = getParentFolder(activeFileId, inode)
      if (parent === null) return
      if (parent.type === InodeType.folder) {
        newInode.name = makeInodeNameUnique(newInode, parent)
        parent.items?.push(newInode)
      }
    }

    setInode((prev) => ({ ...prev, ...inode }))
    setActiveFileId(newInode.id)
  }

  const addFolder = (name: string) => {
    const newFolder: Inode = {
      id: randomBytes(4).readUInt32BE(0),
      name,
      type: InodeType.folder,
      items: [],
    }
    createInode(newFolder)
  }

  const addFile = () => {
    const newFile: Inode = {
      id: randomBytes(4).readUInt32BE(0),
      name: 'New File',
      type: InodeType.file,
    }
    createInode(newFile)
  }

  const addToCutQue = () => {
    //  only add to cut que if its not already in the cut que
    // if the que is empty add to the que else
    //  only add to the que if its not already in the que
    // only add to que if its a neighbor of the active file
    if (activeFileId == 1) return
    if (cutQueIds.includes(activeFileId)) return

    if (
      cutQueIds.length > 0 &&
      haveSameParent(activeFileId, cutQueIds[0], inode)
    ) {
      setCutQue((prev) => [...prev, activeFileId])
      return
    }

    setCutQue([activeFileId])
    return
  }

  const pasteToParentFolder = () => {
    if (cutQueIds.length == 0) return

    const pasteToParent = getParentFolder(activeFileId, inode)
    const pasteFromParent = getParentFolder(cutQueIds[0], inode)
    if (pasteToParent === null || pasteFromParent === null) return

    // only paste if the paste location is not in the cut que
    if (pasteFromParent.id == pasteToParent.id) {
      setCutQue([])
      return
    }

    const fromInodes = pasteFromParent.items?.filter((item) =>
      cutQueIds.includes(item.id)
    )
    // remove fromInodes from the pasteFromParent
    pasteFromParent.items = pasteFromParent.items?.filter(
      (item) => !cutQueIds.includes(item.id)
    )
    // add fFromInodes to the pasteToParent
    if (fromInodes === undefined) return
    pasteToParent.items?.push(...fromInodes)

    setInode((prev) => ({ ...prev, ...inode }))
    setCutQue([])
    // TODO: Add a toast for success/failure
  }

  const renameInodeFromId = (newName: string, id: number) => {
    if (newName == '') return
    if (id === null) return

    const activeInode = getInodeFromId(id, inode)
    if (activeInode === null) return

    activeInode.name = newName

    setInode((prev) => ({ ...prev, ...inode }))
  }

  // ======================= TODO =======================
  // TODO: Load data from local storage (if there is any)
  // TODO: Ask for name (maybe)
  // --> note: toasts for success/failure
  // TODO: add data to file model
  // TODO: add uuid to objects
  // TODO: upload UI
  //  -> node: Add a file extension
  //  -> note: toasts for success/failure of name conflict
  // TODO: File renaming
  // TODO: Save data to local storage
  // --> note: toasts for success/failure
  // TODO: QA and code review
  // TODO: Deploy to production
  // TODO: Add a README.md
  // TOD0: Ask about Redux or is Context Api good enough?

  return (
    <ExplorerContext.Provider
      value={{
        inode,
        activeFileId,
        cutQueIds,
        activePath: findActivePath(activeFileId, inode, '')?.slice(1),
        activeInode: getInodeFromId(activeFileId, inode),
        setActiveFileId,
        deleteInode,
        addFolder,
        addFile,
        renameInodeFromId,
        addToCutQue,
        pasteInParentFolder: pasteToParentFolder,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  )
}

export { ExplorerContext, ExplorerProvider }
