       import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, CardText, CardImg, CardImgOverlay, CardSubtitle, CardHeader, CardFooter } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      name: '',
      email: '',
      phone: '',
      address: '',
      isExpanded: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      address: this.state.address
    };
    this.setState({
      users: [...this.state.users, user],
      name: '',
      email: '',
      phone: '',
      address: ''
    });
  }

  handleDelete(index) {
    const users = this.state.users;
    users.splice(index, 1);
    this.setState({ users });
  }

  handleExpand(index) {
    const users = this.state.users;
    users[index].isExpanded = !users[index].isExpanded;
    this.setState({ users });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" render={() => (
              <div>
                <h1>Create User</h1>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                  </label>
                  <label>
                    Email:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
                  </label>
                  <label>
                    Phone:
                    <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
                  </label>
                  <label>
                    Address:
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange} />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
                <Link to="/users">Users</Link>
              </div>
            )} />
            <Route path="/users" render={() => (
              <div>
                <h1>Users</h1>
                {this.state.users.map((user, index) =>
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{user.name}</CardTitle>
                      <CardSubtitle>{user.email}</CardSubtitle>
                    </CardHeader>
                    {user.isExpanded &&
                      <CardBody>
                        <CardText>{user.phone}</CardText>
                        <CardText>{user.address}</CardText>
                      </CardBody>
                    }
                    <CardFooter>
                      <Button onClick={() => this.handleExpand(index)}>{user.isExpanded ? 'Collapse' : 'Expand'}</Button>
                      <Button onClick={() => this.handleDelete(index)}>Delete</Button>
                    </CardFooter>
                  </Card>
                )}
                <Link to="/">Create User</Link>
              </div>
            )} />
          </div>
        </Router>
      </div>
    );
  }

