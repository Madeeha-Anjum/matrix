import DirectoryTypeEnum from './DirectoryTypeEnum'

interface ExplorerType {
  id: number
  name: string
  type: DirectoryTypeEnum
  items?: ExplorerType[]
  path?: string
}

export default ExplorerType
