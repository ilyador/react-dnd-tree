import React, { useState } from "react"
import styled from "styled-components"
import Tree, { mutateTree, moveItemOnTree } from "@atlaskit/tree"
import {
  find as _find,
  forEach as _each,
  flattenDeep as _flattenDeep,
  isEmpty as _isEmpty
} from "lodash-es"


// This is the base value for all the spacing
// and the indentation of the nested items
const spacing = 8


const PreTextIcon = styled.span`
  display: inline-block;
  margin-right: ${spacing}px;
  font-size: 26px;
  width: 16px;
  color: #464646;
  justify-content: center;
  cursor: pointer;
`

const DraggableItem = styled.div`
  display: flex;
  align-items: center;
  margin: ${spacing}px 0;
`

const Item = styled.div`
  padding: ${spacing * 2}px;
  width: 100%;
  border-radius: 2px;
  cursor: pointer;
  ${({ levelColor }) => `background-color: hsla(0, 0%, ${80 - (levelColor * 10)}%, 1);`}
  ${({ container }) => container && `background-color: #e0cbcb;`}
  ${({ dragging }) => dragging && `background-color: #a4bcca;`}
`

// The height is SUPER IMPORTANT!!!
// Without it you cannot drag items with children.
// The bottom padding is important for rearranging top-level items.
const TreeWrap = styled.div`
  height: 80vh;
  width: 400px;
  overflow: auto;
  padding: ${spacing * 2}px;
  padding-bottom: ${spacing * 8}px;
`



const getIcon = (item, onExpand, onCollapse) => {
  if (item.children && item.children.length > 0) {
    return item.isExpanded ?
      <PreTextIcon onClick={() => onCollapse(item.id)}>-</PreTextIcon> :
      <PreTextIcon onClick={() => onExpand(item.id)}>+</PreTextIcon>
  }
  return <PreTextIcon>&bull;</PreTextIcon>
}


export default function PureTree ({ depth: ALLOWED_NESTING_DEPTH, treeData }) {

  const [tree, setTree] = useState(treeData)
  const [currentDraggingItem, setCurrentDraggingItem] = useState(null)


  function getParent (itemId) {
    let parent = null
    _each(tree.items, item => {
      if (item.hasChildren && item.children.includes(itemId)) parent = item.id
    })
    return parent
  }


  // Recursively find parents
  function getNumberOfParents (parent_id, childNesting = 0) {
    let parent = getParent(parent_id)

    if (!parent) return childNesting

    childNesting++
    return getNumberOfParents(parent, childNesting)
  }

  // Recursively find children
  function getNumberOfChildren (childrenIdList, parentsNesting = 0) {
    parentsNesting++

    if (_isEmpty(childrenIdList)) return parentsNesting

    let children = childrenIdList.map(child => _find(tree.items, { id: child }))
    let allChildren = []
    if (!_isEmpty(children)) {
      allChildren = _flattenDeep(children.map(child => child.children))
    }

    return getNumberOfChildren(allChildren, parentsNesting)
  }


  // This function recursively chechs how many new parents and how many children the dragged item has.
  // If their total sum (the depth) exceeds the defined depth, the drag & drop will be canceled.
  function nestingAllowed (parentId) {
    let dragged = _find(tree.items, { id: currentDraggingItem })
    let numberOfChildren = 1 // if the item is at the end of the chain it must be counted as a child
    let numberOfParents = 0

    if (dragged.hasChildren) {
      numberOfChildren = getNumberOfChildren(dragged.children)
    }

    if (parentId !== tree.rootId) {
      numberOfParents = getNumberOfParents(parentId)
    }

    setCurrentDraggingItem(null)
    return ((numberOfChildren + numberOfParents) <= ALLOWED_NESTING_DEPTH)
  }


  function droppingAllowed (parentId) {
    let dropped = _find(tree.items, { id: parentId })

    return dropped.container
  }



  const renderItem = ({ item, onExpand, onCollapse, provided, snapshot }) => (
    <DraggableItem
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <span>{getIcon(item, onExpand, onCollapse)}</span>
      <Item
        container={!item.container}
        dragging={snapshot.isDragging}
        levelColor={getNumberOfParents(item.id)}
      >
        {item.data ? item.data.title : ""}
      </Item>
      {provided.placeholder}
    </DraggableItem>
  )


  const onExpand = itemId => {
    setTree(mutateTree(tree, itemId, { isExpanded: true }))
  }

  const onCollapse = itemId => {
    setTree(mutateTree(tree, itemId, { isExpanded: false }))
  }

  const onDragStart = itemId => {
    setCurrentDraggingItem(itemId)
  }

  const onDragEnd = (source, destination) => {
    if (!destination) return
    if (!nestingAllowed(destination.parentId)) {
      console.log('Nesting limit eccided')
      return
    }
    if (!droppingAllowed(destination.parentId)) {
      console.log('Dropping into this element is not allowed')
      return
    }

    const newTree = moveItemOnTree(tree, source, destination)
    setTree(newTree)
  }


  return (
    <TreeWrap>
      <Tree
        tree={tree}
        renderItem={renderItem}
        onExpand={onExpand}
        onCollapse={onCollapse}
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        offsetPerLevel={spacing * 2}
        isDragEnabled
        isNestingEnabled
      />
    </TreeWrap>
  )
}
