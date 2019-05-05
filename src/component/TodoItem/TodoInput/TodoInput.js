import React, { Component } from 'react';
import './TodoInput.css';

export default class TodoInput extends Component {
  handelChange = (e) => {
    console.log(e.target.value);
    this.setState({
      value:e.target.value
    })
  };
  render(){
    return <input className="TodoInput" type="text" defaultValue={this.props.value} placeholder={this.props.placeholder} onChange={this.props.update}/>
  }
}
