import React from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { FieldArray } from 'formik'

import LinkListItem from './LinksListItem'
import ActionButton from '../ui/ActionButton'

const LinksList = ({ links }) => {
  const DraggableLinks = ({ insert, remove, push }) => {
    const onDragEnd = result => {
      if (!result.destination) {
        return
      }

      remove(result.source.index)
      insert(result.destination.index, links[result.source.index])
    }

    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {(links || []).map((link, index) => (
                <LinkListItem
                  key={link.id}
                  link={link}
                  index={index}
                  remove={remove}
                />
              ))}
              {provided.placeholder}
              <ActionButton
                type="button"
                onClick={() => push({ name: '', url: '' })}
                label="+ Add A Link"
                variant="text"
                color="secondary"
              />
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }

  return (
    <FieldArray name="links">
      {({ insert, remove, push }) => (
        <DraggableLinks insert={insert} remove={remove} push={push} />
      )}
    </FieldArray>
  )
}

export default LinksList
