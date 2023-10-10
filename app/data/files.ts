import DirectoryTypeEnum from '../models/DirectoryTypeEnum'
import ExplorerType from '../models/ExplorerType'

const data: Array<ExplorerType> = [
  {
    id: 1,
    name: 'Vault',
    type: DirectoryTypeEnum.folder,
    path: '/vault',
    items: [
      {
        id: 2,
        name: 'file1.txt',
        type: DirectoryTypeEnum.file,
      },
      {
        id: 3,
        name: 'file2.txt',
        type: DirectoryTypeEnum.file,
      },
      {
        id: 4,
        name: 'Secret',
        type: DirectoryTypeEnum.folder,
        path: '/vault/Secret',
        items: [
          {
            id: 5,
            name: 'file3.txt',
            type: DirectoryTypeEnum.file,
          },
          {
            id: 6,
            name: 'file4.txt',
            type: DirectoryTypeEnum.file,
          },
        ],
      },
    ],
  },
]

export default data
