import InodeType from './InodeType'

interface Inode {
  id: number
  name: string
  type: InodeType.folder | InodeType.file
  items?: Array<Inode>
}

export default Inode
