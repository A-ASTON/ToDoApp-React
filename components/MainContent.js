import React from "react";

class InputBox extends React.Component {
    render() {
        return(
            <form  autocomplete="off" onSubmit={this.props.handleInput}>
                <input type="text" placeholder="what needs to be done?" id="input"/>
            </form>
        );
    }
}

class List extends React.Component {
    
    render() {
        const items = this.props.items;
        const list = [];
        items.forEach((item) => {
            list.push(
            <li key={item.content}>
                <span>
                    <input type="checkbox" value={item.content}/>
                    {item.completed? <s>{item.content}</s> : item.content}       {/*根据是否完成决定任务显示状态*/} 
                </span>
            </li>);
        });

        return(
            <ul type="none">
                {list}
                <li>{items.length} item left
                    <span className="buttonGroup">
                        <button>All</button>
                        <button>Active</button>
                        <button>Completed</button>
                    </span>
                </li>
            </ul>
        );
    }
}


class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.handleInput = this.handleInput.bind(this);  //这里很关键，不bind的话会改变this的指向，导致定义函数时无法获取this
        this.state = {
            items: [
                {
                    content: '吃饭',
                    completed: true
                }
            ]
        };
    }

    handleInput(e) {                                    //处理输入待办事项的函数
        const input = document.getElementById('input');
        const new_items = this.state.items;
        new_items.push({content:input.value,completed:false});
        input.value = '';                               //获取代办事项后清空输入框
        console.log(new_items); 
        this.setState({
            items: new_items
        });
        e.preventDefault();
    }

    render() {
        const list = this.state.items;
        return(
            <div className="content">
                <InputBox handleInput={this.handleInput}/>
                <List items={list}/>
            </div>
        );
    }
}

export default MainContent;