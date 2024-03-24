// import './App.css'
// import {v4 as uuidv4} from 'uuid'
// import {Component} from 'react'

// const tagsList = [
//   {
//     optionId: 'HEALTH',
//     displayText: 'Health',
//   },
//   {
//     optionId: 'EDUCATION',
//     displayText: 'Education',
//   },
//   {
//     optionId: 'ENTERTAINMENT',
//     displayText: 'Entertainment',
//   },
//   {
//     optionId: 'SPORTS',
//     displayText: 'Sports',
//   },
//   {
//     optionId: 'TRAVEL',
//     displayText: 'Travel',
//   },
//   {
//     optionId: 'OTHERS',
//     displayText: 'Others',
//   },
// ]

// // Replace your code here
// class App extends Component {
//   state = {
//     optionValue: tagsList[0].optionId,
//     taskValue: '',
//     isActiveState: false,
//     allTaskData: [],
//     filterResult: 'initial',
//   }

//   taskInput = e => {
//     this.setState({taskValue: e.target.value})
//   }

//   submit = e => {
//     e.preventDefault()
//     const {optionValue, taskValue, allTaskData} = this.state
//     if (taskValue !== '') {
//       const newTask = {
//         id: uuidv4(),
//         tags: optionValue,
//         task: taskValue,
//       }
//       allTaskData.push(newTask)
//       this.setState(allTaskData)
//     }
//     this.setState({taskValue: ''})
//   }

//   optionTags = e => {
//     this.setState({optionValue: e.target.value})
//   }

//   tagBtn = e => {
//     console.log(e.target.value)
//   }

//   renderTags = () => {
//     const {filterResult} = this.state
//     return (
//       <div className="tags-container">
//         <h1>Tags</h1>
//         <ul className="tags-ul">
//           {tagsList.map(items => (
//             <li key={items.optionId}>
//               <button onClick={this.tagBtn} type="button">
//                 {items.displayText}
//               </button>
//             </li>
//           ))}
//         </ul>

//         <h1>Tasks</h1>
//         {/* {tagsList.length > 0 ? (
//           <ul className="tasks-ul">
//             {filterResult.map(items => (
//               <li key={items.id}>
//                 <p>{items.task}</p>
//                 <button>{items.tags}</button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div>
//             <p>No Tasks Added Yet</p>
//           </div>
//         )} */}
//       </div>
//     )
//   }

//   render() {
//     const {optionValue, taskValue, isActiveState} = this.state
//     return (
//       <div className="bg-container">
//         <div className="task-container">
//           <h1>Create a task!</h1>
//           <form onSubmit={this.submit} className="form-container">
//             <label htmlFor="task">Task</label>
//             <input
//               className="input"
//               id="task"
//               placeholder="Enter the task here"
//               value={taskValue}
//               onChange={this.taskInput}
//             />
//             <label htmlFor="tags">Tags</label>
//             <select
//               key={optionValue}
//               className="input"
//               onChange={this.optionTags}
//             >
//               {tagsList.map(items => (
//                 <option key={items.optionId} value={items.optionId}>
//                   {items.displayText}
//                 </option>
//               ))}
//             </select>
//             <button>Add Task</button>
//           </form>
//         </div>
//         {this.renderTags()}
//       </div>
//     )
//   }
// }

// export default App
import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeOptionId: tagsList[0].optionId,
    inputTask: '',
    tasksList: [],
    activeTag: 'INITIAL',
  }

  onChangeOption = event => {
    this.setState({
      activeOptionId: event.target.value,
    })
  }

  onGivenTask = event => {
    this.setState({
      inputTask: event.target.value,
    })
  }

  onSubmitTaskDetails = event => {
    event.preventDefault()
    const {inputTask, activeOptionId} = this.state

    const newTask = {
      id: uuid(),
      text: inputTask,
      tag: activeOptionId,
    }

    if (inputTask.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        inputTask: '',
        activeOptionId: '',
      }))
    }
  }

  onClickTagButton = event => {
    console.log(event.target.value)
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTasksView = () => {
    const {activeOptionId, inputTask} = this.state

    return (
      <div className="my-tasks-container">
        <h1 className="create-task-heading">Create a task!</h1>
        <form className="form-container" onSubmit={this.onSubmitTaskDetails}>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="input-box"
              onChange={this.onGivenTask}
              value={inputTask}
              placeholder="Enter the task here"
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select
              id="tag"
              className="input-box"
              value={activeOptionId}
              onChange={this.onChangeOption}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderTagsAndTasksList = () => {
    const {tasksList, activeTag} = this.state

    const filteredList =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachTag => eachTag.tag === activeTag)

    return (
      <div className="tags-and-tasks-container">
        <h1 className="tags-heading">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(eachTag => (
            <li className="tags-item" key={eachTag.optionId}>
              <button
                type="button"
                className="tag-button"
                value={eachTag.optionId}
                onClick={this.onClickTagButton}
              >
                {eachTag.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="tags-heading">Tasks</h1>
        {tasksList.length === 0 ? (
          <div className="no-tasks-container">
            <p className="no-tasks-info">No Tasks Added Yet</p>
          </div>
        ) : (
          <ul className="tasks-list">
            {filteredList.map(eachTask => (
              <li className="task-card" key={eachTask.id}>
                <p className="task-text">{eachTask.text}</p>
                <p className="task-tag">{eachTask.tag}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        {this.renderCreateTasksView()}
        {this.renderTagsAndTasksList()}
      </div>
    )
  }
}

export default App
