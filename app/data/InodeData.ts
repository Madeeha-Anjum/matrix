import InodeType from '../models/InodeType'
import Inode from '../models/Inode'

const InodeData: Array<Inode> = [
  {
    id: 1,
    name: 'Vault',
    type: InodeType.folder,
    items: [
      {
        id: 2,
        name: 'file1.txt',
        type: InodeType.file,
      },
      {
        id: 3,
        name: 'file2.txt',
        type: InodeType.file,
      },
      {
        id: 4,
        name: 'Secret',
        type: InodeType.folder,
        items: [
          {
            id: 6,
            name: 'file4.txt',
            type: InodeType.file,
          },
        ],
      },
    ],
  },
]

export default InodeData
