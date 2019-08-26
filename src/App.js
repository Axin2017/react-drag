import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import ComponentsBox from './components/ComponentsBox'
import { DragDropContext } from 'react-beautiful-dnd';

const { Header, Sider, Content } = Layout;
class App extends React.Component {
  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Layout className="layout">
          <Header className="header">拖拽测试</Header>
          <Layout className="main">
            <Sider className="left-slider"><ComponentsBox /></Sider>
            <Content>Content</Content>
            {/* <Sider>Sider</Sider> */}
          </Layout>
        </Layout>

      </DragDropContext>
    )
  };
}

export default App;
