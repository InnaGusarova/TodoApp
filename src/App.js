import React from 'react';
import NewTodo from './NewToDo'
import styles from './index.module.scss'

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
    value: '',
    newList: [],
    inputError: false,
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }
  
  handleClick = () => {
    const { value, newList } = this.state;
    if (!value) {
      return;
    }
    if (newList.some(list => list.value === value)) {
      return this.setState({ inputError: true })
    }
    const newListClone = [...newList];
    newListClone.push({ value });
    this.setState({ value: '', newList: newListClone, inputError: false });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
    this.handleClick();
    }
  }

  removeNewTodo = (i) => {
    const newList = [...this.state.newList];
    newList.splice(i, 1);
    this.setState({ newList: newList });
  } 

  render() {
    const { newList, value } = this.state;
    return(
      <React.Fragment>
        <div className={styles.wrapperTitle}>
          <h1 className={styles.title}>Не забыть ...</h1>
          <input 
            type="text"
            value={value}
            placeholder="Имя списка"
            className={styles.inputTitle}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
          <p
            className={styles.inputError}
            style={{color: this.state.inputError ? 'rgb(206, 23, 23)' : 'rgb(182, 233, 233)'}}
          >
            Список с таким именем мы уже бережно храним для Вас на стикерах ниже. Выберите новое имя для следующего списка.</p>
          <button 
            className={styles.submitTitle}
            onClick={this.handleClick}
          > 
            Создать 
          </button>
        </div>
        <div className={styles.wrapperTodo}>
          {newList.map((item, i) => {
            return(
              <div 
              className={styles.todo}
              key={item.value}>
                <NewTodo 
                  id={i} 
                  remove={this.removeNewTodo}
                  title={item.value} 
                  newList={item.newList}
                />
              </div>
            )
           })}
        </div>
      </React.Fragment>
    )
  }
   
}
export default App