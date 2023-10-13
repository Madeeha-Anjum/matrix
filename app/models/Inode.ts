import InodeType from './InodeType'

interface Inode {
  id: string
  name: string
  type: InodeType.folder | InodeType.file
  items?: Array<Inode>
  data?: string
}

export default Inode
