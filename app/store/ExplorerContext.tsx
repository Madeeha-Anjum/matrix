'use client'
import { createContext, useState } from 'react'
import InodeData from '@/app/data/InodeData'
import Inode from '@/app/models/Inode'
import InodeType from '../models/InodeType'
import { randomBytes } from 'crypto'

type InterfaceExplorerContext = {
  inode: Inode
  activeFileId: number
  setActiveFileId: (id: number) => void
  deleteInode: () => void
  activePath: string | undefined
  addFolder: (name: string) => void
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
  const getActiveInode = (root: Inode): Inode => {
    const parent = getParentFolder(activeFileId, root)
    if (parent.id == activeFileId) return parent

    if (parent.type === InodeType.folder) {
      const hasActiveFile = parent?.items?.find(
        (item) => item.id == activeFileId
      )
      if (hasActiveFile) {
        return hasActiveFile
      }
    }
    return parent
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

  const addFolder = (name: string) => {
    const newFolder: Inode = {
      id: randomBytes(4).readUInt32BE(0),
      name,
      type: InodeType.folder,
      items: [],
    }
    const currentInode = getActiveInode(inode)

    if (currentInode === null) return
    // if the current inode is a folder, add the new folder to the items
    if (currentInode.type === InodeType.folder) {
      let count = 1
      while (
        currentInode.items?.find((item) => item?.name === newFolder.name)
      ) {
        newFolder.name = `${name} (${count})`
        count += 1
      }
      currentInode.items?.push(newFolder)
    } else {
      // if the current inode is a file, add the new folder to the parent folder
      const parent = getParentFolder(activeFileId, inode)
      if (parent === null) return
      if (parent.type === InodeType.folder) {
        let count = 1
        while (parent.items?.find((item) => item.name === newFolder.name)) {
          newFolder.name = `${name} (${count})`
          count += 1
        }
        parent.items?.push(newFolder)
      }
    }

    setInode((prev) => ({ ...prev, ...inode }))
    setActiveFileId(newFolder.id)
  }
  // TODO: think about loading the initial data from local storage if there is a vault name in local storage

  //  TODO: delete, upload, cut, paste  file,
  //  -> note: if its vut it stays cut unless its pasted

  return (
    <ExplorerContext.Provider
      value={{
        inode,
        activeFileId,
        activePath: findActivePath(activeFileId, inode, '')?.slice(1),
        setActiveFileId,
        deleteInode,
        addFolder,
      }}
    >
      {children}
    </ExplorerContext.Provider>
  )
}

export { ExplorerContext, ExplorerProvider }
