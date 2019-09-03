import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import { Layout } from 'antd';
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";

const { Header, Sider, Content } = Layout;


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Layout className="layout">
        <Header className="header">react测试</Header>
        <Layout className="main">
          <Sider className="left-slider">
          </Sider>
          <Content >
            <div className="todo-app">
              <h1>Todo List</h1>
              <AddTodo />
              <TodoList />
              <VisibilityFilters />
            </div>
          </Content>
        </Layout>
      </Layout>
    )
  }
  componentDidUpdate() {
  }
}

export default App;
