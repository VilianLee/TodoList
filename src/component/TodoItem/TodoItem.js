import React, { Component } from 'react';
import {
  Checkbox,
  Icon,
  Card,
  WingBlank,
  WhiteSpace
} from 'antd-mobile';

import './TodoInput/TodoInput.css';

const CheckboxItem = Checkbox.CheckboxItem;

export default class TodoInput extends Component {


  render(){
    return(
      <WingBlank size="lg">
        <WhiteSpace size="lg"/>
        <Card>
          <Card.Header
            title={
              <CheckboxItem defaultChecked={this.props.item.finished} onChange={this.toggle.bind(this)}>{this.props.item.title}</CheckboxItem>
            }

            extra={
              <span onClick={this.delete.bind(this)}><Icon type="cross"/></span>
            }
          />
          <Card.Body>
            <div>{this.props.item.content}</div>
          </Card.Body>
          <Card.Footer content={this.props.item.date} extra={
            <div>{this.props.item.position}</div>}/>
        </Card>
        <WhiteSpace size="lg"/>
      </WingBlank>
    )
  }
  toggle = (e) => {
    this.props.updateStatus(e.target.checked,this.props.item)
  };
  delete(e){
    this.props.onDelete(e, this.props.item)
  }
}
