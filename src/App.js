import React, {Component} from 'react';
import 'antd-mobile/dist/antd-mobile.css';
import './App.css';
import {
  Popover,
  NavBar,
  Icon,
  Modal
} from 'antd-mobile';

import TodoInput from './component/TodoItem/TodoInput/TodoInput'
import TodoItem from './component/TodoItem/TodoItem'
import UserDialog from './component/TodoItem/UserDialog/userDialog'

import {getCurrentUser,signOut} from './leanCloud'


const Item = Popover.Item;


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: "",
      newContent: "",
      newId: 0,
      isEdit: false,
      user: getCurrentUser() || {},
      todoList: [
        {
          id: 1,
          title: "第一个待办",
          content: "晚上去打篮球",
          date: "2019-04-18 16:04",
          position: "杭州，西子国际",
          deleted: false,
          finished: false
        }
      ],
      user_control_visbility:false
    };
    this.newTitleChange = this.newTitleChange.bind(this);
    this.newContentChange = this.newContentChange.bind(this);
  }
  componentDidUpdate(){

  }
  componentWillMount() {
    //let listNum = this.state.todoList.length;
    //let newId = this.state.todoList[listNum].id + 1;
    //this.setState(newId)
    //let local_todoList =
    this.state.todoList.map((item,index) => {
      return this.setState({newId:item.id + 1});
    })
  }
  render() {
    let todos = this.state.todoList.filter((item)=> !item.deleted).map((item, index) => {
      return (
        <TodoItem item={item} key={item.id} updateStatus={this.updateCardStatus.bind(this)} onDelete={this.deleteCard.bind(this)}/>
      )
    });
    return (
      <div className="App">
        <NavBar
          mode="light"
          icon={<Icon type="left"/>}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={
            <Popover overlayClassName="fortest"
                     overlayStyle={{ color: 'currentColor' }}
                     visible={this.state.user_control_visbility}
                     overlay={this.state.user.id ? [<Item><span onClick={this.signOut.bind(this)}>登出</span></Item>] : []}
                     align={{
                       overflow: { adjustY: 0, adjustX: 0 },
                       offset: [-10, 0],
                     }}
                     onVisibleChange={this.handleVisibleChange}
                     onSelect={this.onSelect}
            >
              <div style={{
                height: '100%',
                padding: '0 15px',
                marginRight: '-15px',
                display: 'flex',
                alignItems: 'center',
              }}
              >
                <Icon type="ellipsis" />
              </div>
            </Popover>
          }
        >{this.state.user.username||'我'}的待办</NavBar>
        <div className="todoList">
          {todos}
        </div>

        <div className="newTodo" onClick={this.showModal('isEdit')}>
          <Icon type="plus"/>
        </div>


        <Modal
          visible={this.state.isEdit}
          transparent
          maskClosable={false}
          onClose={this.onClose('isEdit')}
          title="新建待办"
          footer={[
            {
              text: "取消",
              onPress: () => {
                this.onClose('isEdit')()
              }
            }, {
              text: '确认',
              onPress: () => {
                console.log(this.state.newTitle,this.state.newContent);
                this.editNewTodo(this.state.newTitle,this.state.newContent);
                this.onClose('isEdit')();
              }
            }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            <TodoInput placeholder="请输入待办标题" value={this.state.newTitle} update={this.newTitleChange}/>
            <TodoInput placeholder="请输入待办内容" value={this.state.newContent} update={this.newContentChange}/>
          </div>
        </Modal>
        {this.state.user.id ?
          null :
          <UserDialog
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}/>}
      </div>
    );
  }

  onSignUpOrSignIn(user){
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.user = user;
    this.setState(stateCopy)
  }
  signOut(){
    signOut();
    let stateCopy = JSON.parse(JSON.stringify(this.state));
    stateCopy.user = {};
    this.setState(stateCopy)
  }
  newTitleChange(event) {
    this.setState({newTitle: event.target.value});
  }
  newContentChange(event) {
    this.setState({newContent: event.target.value});
  }
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      user_control_visbility: false
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  };
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };
  editNewTodo = (title,content) => {
    let nowTime = new Date();
    let item = {
      id: this.state.newId,
      title: title,
      content: content,
      date: this.dateFormat(nowTime),
      position: "杭州",
      deleted: false,
      finished: false
    };
    this.state.todoList.push(item);
    this.setState({
      todoList : this.state.todoList,
      newTitle : "",
      newContent: "",
      deleted: false,
      newId: this.state.newId+1
    });
  };

  dateFormat = (date) => {
    let year = date.getFullYear();
    let month = date.getMonth() >= 10 ? date.getMonth().toString() : "0" + date.getMonth().toString();
    let day = date.getDay() >= 10 ? date.getDay().toString() : "0" + date.getDay().toString();
    let hour = date.getHours() >= 10 ? date.getHours().toString() : "0" + date.getHours().toString();
    let minute = date.getMinutes() >= 10 ? date.getMinutes().toString() : "0" + date.getMinutes().toString();
    let second = date.getSeconds() >= 10 ? date.getSeconds().toString() : "0" + date.getSeconds().toString();
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`
  };

  updateCardStatus = (e,todo) => {
    todo.finished = e;
    this.setState(this.state);
  };

  deleteCard(event, todo){
    todo.deleted = true;
    this.setState(this.state);
  }
}

export default App;
