import React from 'react'
import styles from './index.module.scss'

class NewTodo extends React.Component {
    
    constructor(props) {
        super(props);
        this.state={ 
        value: '',
        todoList: [],
        };
    }
    
    handleChange = (event) => {
        this.setState({ value: event.target.value});
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        this.handleClick();
        }
    }
 
    handleClick = () => {
        if (!this.state.value) {
            return;
        }
        const todoList = [...this.state.todoList];
        todoList.push({ value: this.state.value, checked: false });
        this.setState({ todoList: todoList, value: '' });
    }

    handleCheked = (i) => {
        const todoList = [...this.state.todoList];
        todoList[i].checked = true;
        this.setState({ todoList: todoList });
    }

    handleDelete = (i) => {
        const todoList = [...this.state.todoList];
        todoList.splice(i, 1);
        this.setState({ todoList: todoList });
    }
    
    handleKill  = () => {
        const { remove, id } = this.props;
        remove(id);
    }
    render() {
        const { value, todoList } = this.state;
        const { title } = this.props;
        return (
            <React.Fragment>
                <div className={styles.wrapperTodoTitle}>
                    <h2 className={styles.todoTitle}>
                        {title}
                    </h2>
                    <button 
                        className={styles.deleteTodo}
                        onClick={this.handleKill}
                    >
                        &#10006;
                    </button>
                </div>
                <div className={styles.wrapperInpTodo}>
                    <input 
                        type="text"
                        value={value} 
                        placeholder="напомнить мне ..."
                        className={styles.inputTodo}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />
                    <button 
                        className={styles.addTodo}
                        onClick={this.handleClick}
                    >
                        &#9998;
                    </button>
                </div>
                {todoList.map((item, i) => {
                    return(
                    <div 
                        key={i}
                        className={styles.textWrapper}
                    >
                        <p 
                            className={styles.textTodo} 
                            style={{textDecoration: item.checked ? 'line-through' : 'none'}}
                        >
                            {item.value}
                        </p>
                        <button 
                            className={styles.chekedTodo}
                            onClick={() => this.handleCheked(i)}
                            style={{display: item.checked ? 'none' : 'block' }}
                        >
                            &#10004;
                        </button>
                        <button 
                            className={styles.deleteTodo}
                            onClick={() => this.handleDelete(i)}
                        >
                            &#10006;
                        </button>
                    </div>
                    )
                })}
            </React.Fragment>
        )
    }
}

export default NewTodo