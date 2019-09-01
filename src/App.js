import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { Layout } from 'antd';
// import ComponentsBox from './components/ComponentsBox'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const { Header, Sider, Content } = Layout;

function getStyle(provided, snapshot) {
  console.log(provided)
  console.log(snapshot)
  if (snapshot.isDraggingOver) {
    return {
      backgroundColor: '#ccc'
    }
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      list: [0]
    }
    this.onDragEnd = this.onDragEnd.bind(this)
  }
  render() {
    return (
      <Layout className="layout">
        <Header className="header">拖拽测试</Header>
        <Layout className="main">
          <DragDropContext
            onDragStart={this.onDragStart}
            onDragUpdate={this.onDragUpdate}
            onDragEnd={this.onDragEnd}
          >
            <Sider className="left-slider">
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    <Draggable draggableId="drag-1" index={0}>
                      {(provided, snapshot) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <h4 style={{ color: '#fff' }}>My draggable</h4>
                        </div>
                      )}
                    </Draggable>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </Sider>
            <Content >
              <Droppable droppableId="drop-1">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps} className="drop-content" style={getStyle(provided, snapshot)}>
                    {
                      this.state.list.map(item => <div key={item}>{item}</div>)
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="drop-2">
                {(provided, snapshot) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} {...provided.dragHandleProps} className="drop-content" style={getStyle(provided, snapshot)}>
                    {
                      this.state.list.map(item => <div key={item}>{item}</div>)
                    }
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Content>
          </DragDropContext>
        </Layout>
      </Layout>
    )
  }
  onDragStart(e) {
    //console.log(e)
  }
  onDragUpdate(e) {
    //console.log(e)
  }
  onDragEnd(e) {
    console.log(e)
    this.setState({ index: this.state.index + 1 })
    this.setState(state => { return { list: state.list.concat([state.index]) } })
  }
  componentDidUpdate() {
  }
}

export default App;
