export const treeData = {
  rootId: '1',
  items: {
    '1': {
      id: '1',
      children: ['1-1', '1-2', '1-3'],
      hasChildren: true,
      container: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'root',
      },
    },
    '1-3': {
      id: '1-3',
      children: [],
      hasChildren: false,
      container: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Main 2',
      },
    },
    '1-1': {
      id: '1-1',
      children: ['1-1-1', '1-1-2'],
      hasChildren: true,
      container: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'First parent',
      },
    },
    '1-2': {
      id: '1-2',
      children: ['1-2-1', '1-2-2'],
      hasChildren: true,
      container: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'Second parent',
      },
    },
    '1-1-1': {
      id: '1-1-1',
      children: [],
      hasChildren: false,
      container: true,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child one',
      },
    },
    '1-1-2': {
      id: '1-1-2',
      children: [],
      hasChildren: false,
      container: true,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child two',
      },
    },
    '1-2-1': {
      id: '1-2-1',
      children: [],
      hasChildren: false,
      container: true,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child three',
      },
    },
    '1-2-2': {
      id: '1-2-2',
      children: ['1-1-2-2', '1-1-2-1'],
      hasChildren: true,
      container: true,
      isExpanded: true,
      isChildrenLoading: false,
      data: {
        title: 'Child four',
      },
    },
    '1-1-2-1': {
      id: '1-1-2-1',
      children: [],
      hasChildren: false,
      container: false,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child six',
      },
    },
    '1-1-2-2': {
      id: '1-1-2-2',
      children: [],
      hasChildren: false,
      container: true,
      isExpanded: false,
      isChildrenLoading: false,
      data: {
        title: 'Child five',
      },
    },
  },
}
