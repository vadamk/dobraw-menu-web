import React from 'react'
import { Tag, TagLabel, TagLeftIcon } from '@chakra-ui/tag'
import { Wrap } from '@chakra-ui/layout'
import { CheckIcon } from '@chakra-ui/icons'

const AppTag = ({ tag, isSelected, onSelect }) => (
  <Tag key={tag.id} size="lg" colorScheme={isSelected ? "green" : "gray"} onClick={onSelect}>
    {isSelected && <TagLeftIcon boxSize="12px" as={CheckIcon} />}
    <TagLabel>{tag.name}</TagLabel>
  </Tag>
)

const ALL_TAG = {
  id: "all",
  name: "Все"
}

const Filter = ({ tags, selectedTagIds = [], onSelect, onClear }) => {
  const isSelected = (tag) => {
    return selectedTagIds.includes(tag.id)
  }
  
  return (
    <Wrap pb={6} spacing={3}>
      <AppTag tag={ALL_TAG} isSelected={!selectedTagIds.length} onSelect={onClear} />
      {tags.map(tag => (
        <AppTag key={tag.id} tag={tag} isSelected={isSelected(tag)} onSelect={onSelect(tag)} />
      ))}
    </Wrap>
  )
}

export default Filter
