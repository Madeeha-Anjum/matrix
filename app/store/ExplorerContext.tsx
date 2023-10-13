'use client'
import { createContext, useState } from 'react'
import InodeData from '@/app/data/InodeData'
import Inode from '@/app/models/Inode'
import InodeType from '../models/InodeType'
import { v4 as uuidv4 } from 'uuid'

type InterfaceExplorerContext = {
  inode: Inode
  activeFileId: string
  activeInode: Inode
  cutQueIds: string[]
  setActiveFileId: (id: string) => void
  deleteInode: () => void
  activePath: string | undefined
  addFolder: (name: string) => void
  addFile: (name: string, data: string) => void
  renameInodeFromId: (newName: string, id: string) => void
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
      id: '1',
      name: 'root',
      type: InodeType.folder,
      items: [],
    }
  )
  const rootId = inode.id
  const [activeFileId, setActiveFileId] = useState<string>(rootId)
  const [cutQueIds, setCutQue] = useState<string[]>([])

  const getParentFolder = (targetId: string, root: Inode): Inode => {
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
  const getInodeFromId = (targetId: string, root: Inode): Inode => {
    if (targetId == inode.id) return root

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

  const haveSameParent = (id1: string, id2: string, root: Inode): boolean => {
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
    id: string,
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
      if (activeFileId == rootId) return root

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
    setActiveFileId(rootId)
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
      id: uuidv4(),
      name,
      type: InodeType.folder,
      items: [],
    }
    createInode(newFolder)
  }

  const addFile = (name: string, data: string) => {
    const newFile: Inode = {
      id: uuidv4(),
      name,
      data,
      type: InodeType.file,
    }
    createInode(newFile)
  }

  const addToCutQue = () => {
    //  only add to cut que if its not already in the cut que
    // if the que is empty add to the que else
    //  only add to the que if its not already in the que
    // only add to que if its a neighbor of the active file
    if (activeFileId == rootId) return
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

    const moveToParent = getParentFolder(activeFileId, inode)
    const moveFromParent = getParentFolder(cutQueIds[0], inode)
    if (moveToParent === null || moveFromParent === null) return
    // only paste if the paste location is not in the cut que
    if (moveFromParent.id == moveToParent.id) {
      setCutQue([])
      return
    }
    const copyInodes = cutQueIds.map((id) => getInodeFromId(id, inode))

    //  make the names unique
    copyInodes.forEach((inode) => {
      inode.name = makeInodeNameUnique(inode, moveToParent)
    })

    // move "copyInodes" to "moveToParent"
    moveToParent.items?.push(...copyInodes)

    // remove "copyInodes" from "moveFromParent"
    moveFromParent.items = moveFromParent.items?.filter(
      (item) => !cutQueIds.includes(item.id)
    )

    setInode((prev) => ({ ...prev, ...inode }))
    setCutQue([])
    // TODO: Add a toast for success/failure
  }

  const renameInodeFromId = (newName: string, id: string) => {
    if (newName == '') return
    if (id === null) return

    const activeInode = getInodeFromId(id, inode)
    if (activeInode === null) return

    activeInode.name = newName

    setInode((prev) => ({ ...prev, ...inode }))
  }

  // === UP NEXT ===
  // TODO: Search panel
  // --> note: search by name
  // --> Build Ui and functionality

  // ======================= TODO =======================
  // TODO: Load data from local storage (if there is any)
  // TODO: Ask for name (maybe)
  // --> note: toasts for success/failure
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
