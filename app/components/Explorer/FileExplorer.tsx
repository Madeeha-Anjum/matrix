import DirectoryTypeEnum from '@/app/models/DirectoryTypeEnum'
import React from 'react'
import Icon from '@/app/components/icons/icons'
import ExplorerType from '@/app/models/ExplorerType'

type DirectoryProps = {
  files: ExplorerType[]
}

const File: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <div className='flex justify-start space-x-2'>
      <Icon.File className='w-5 h-5'></Icon.File>
      <div>{fileName}</div>
    </div>
  )
}

const Folder: React.FC<{ fileName: string }> = ({ fileName }) => {
  return (
    <div className='flex justify-start space-x-2'>
      <Icon.Folder></Icon.Folder>
      <div>{fileName}</div>
    </div>
  )
}

const FileExplorer: React.FC<DirectoryProps> = ({ files }) => {
  return (
    <>
      <div className='flex flex-col space-y-1'>
        {files.map((file) => {
          if (file.type === DirectoryTypeEnum.folder) {
            return (
              <div key={file.id} className='ml-2'>
                <Folder fileName={file.name}></Folder>
                {file.items && <FileExplorer files={file.items}></FileExplorer>}
              </div>
            )
          } else {
            return (
              <div key={file.id} className='ml-2'>
                <File fileName={file.name}></File>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}

export default FileExplorer
