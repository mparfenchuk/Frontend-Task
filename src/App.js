import React, { Component } from 'react';
import { Link } from 'react-router'
import {
  Container,
  Menu
} from 'semantic-ui-react'
import './App.css';

class App extends Component {


  render() {

    let { children } = this.props

    return (
      <div>
        <Menu fixed='top' size='large' inverted>
          <Container>
            <Menu.Item as={Link} to='/frontend-task/' header>
              Home
            </Menu.Item>
            <Menu.Item as={Link} to='/frontend-task/charts'>Charts</Menu.Item>
            <Menu.Item as={Link} to='/frontend-task/wallet'>Wallet</Menu.Item>
          </Container>
        </Menu>
        {children}
      </div>
    );
  }
}

export default App;

