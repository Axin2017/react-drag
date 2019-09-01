import React from 'react';
import './ComponentsBox.css'
import { Draggable } from 'react-beautiful-dnd';

class ComponentsBox extends React.Component {
 
  render() {
    return (
        <div className="components-box">
          <Draggable draggableId="draggable-1" index={0}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <h4>My draggable</h4>
              </div>
            )}
          </Draggable>
        </div>
    );
  }
}


export default ComponentsBox