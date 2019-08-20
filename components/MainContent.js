import React from "react";

class InputBox extends React.Component {
    render() {
        return(
            <form  autoComplete="off" onSubmit={this.props.handleInput}>
                <input type="text" placeholder="what needs to be done?" id="input"/>
            </form>
        );
    }
}

class List extends React.Component {
    
    render() {
        const items = this.props.items;
        const inActiveOnly = this.props.inActiveOnly;
        const inCompletedOnly = this.props.inCompletedOnly;
        const list = [];
        items.forEach((item, index) => {
            if(inActiveOnly && item.completed) {
                return;
            } else if(inCompletedOnly && !item.completed) {
                return;
            } else {
                list.push(
                    <li key={item.content}>  
                        <input type="checkbox" id={index} checked={item.completed}onChange={this.props.handleCheck}/>
                        {item.completed? <s>{item.content}</s> : item.content}       {/*根据是否完成决定任务显示状态*/} 
                        <span className="delete">&times;</span>
                    </li>
                    );
            }
        });

        return(
            <ul type="none">
                {list}
                <li>{items.filter((item)=> !item.completed).length} item left
                    <span className="buttonGroup">
                        <button onClick={this.props.handleInAllChange}>All</button>
                        <button onClick={this.props.handleInActiveChange}>Active</button>
                        <button onClick={this.props.handleInCompletedChange}>Completed</button>
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
        this.handleCheck = this.handleCheck.bind(this);
        this.handleInActiveChange = this.handleInActiveChange.bind(this);
        this.handleInCompletedChange = this.handleInCompletedChange.bind(this);
        this.handleInAllChange = this.handleInAllChange.bind(this);
        this.state = {
            items: [
                {
                    content: '吃饭',
                    completed: false
                }
            ],
            inActiveOnly: false,
            inCompletedOnly: false
        };
    }

    handleInAllChange() {
        this.setState({
            inActiveOnly: false,
            inCompletedOnly: false
        });
    }

    handleInActiveChange() {
        this.setState({
            inActiveOnly: true,
            inCompletedOnly: false
        });
    }

    handleInCompletedChange() {
        this.setState({
            inCompletedOnly: true,
            inActiveOnly: false
        });
    }   

    handleCheck(e) {
        const index = e.target.id;
        const check = this.state.items[index].completed;
        let new_items = this.state.items;

        if(check) {
            e.target.check = false;
            new_items[index].completed = false;
            this.setState({
                items: new_items
            });
        } else {
            e.target.check = true;
            new_items[index].completed = true;
            this.setState({
                items: new_items
            });
        }

    }


    handleInput(e) {                                    //处理输入待办事项的函数
        const input = document.getElementById('input');
        const new_items = this.state.items;
        if(input.value != '') {
            new_items.push({content:input.value,completed:false});
        } 
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
                <List items={list} handleCheck={this.handleCheck} handleInAllChange={this.handleInAllChange} handleInActiveChange={this.handleInActiveChange} handleInCompletedChange={this.handleInCompletedChange} inActiveOnly={this.state.inActiveOnly} inCompletedOnly={this.state.inCompletedOnly}/>
            </div>
        );
    }
}

export default MainContent;