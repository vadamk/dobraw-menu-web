import React from "react";
import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/tag";
import { Wrap } from "@chakra-ui/layout";
import { CheckIcon } from "@chakra-ui/icons";

import useTags from '../hooks/useTags'

const AppTag = ({ tag, isSelected, onSelect }) =>
  <Tag
    key={tag.id}
    size="lg"
    colorScheme={isSelected ? "green" : "gray"}
    cursor="pointer"
    onClick={onSelect}
  >
    {isSelected && <TagLeftIcon boxSize="12px" as={CheckIcon} />}
    <TagLabel>
      {tag.name}
    </TagLabel>
  </Tag>;

const ALL_TAG = {
  id: "all",
  name: "Все"
};

const Filter = ({ selectedTagIds = [], onSelect, onClear }) => {
  const tags = useTags()

  const isSelected = tag => {
    return selectedTagIds.includes(tag.id);
  };

  return (
    <Wrap py={6} spacing={3}>
      <AppTag
        tag={ALL_TAG}
        isSelected={!selectedTagIds.length}
        onSelect={onClear}
      />
      {tags.items.map(tag =>
        <AppTag
          key={tag.id}
          tag={tag}
          isSelected={isSelected(tag)}
          onSelect={onSelect(tag)}
        />
      )}
    </Wrap>
  );
};

export default Filter;
