import React, {useReducer} from 'react';
import './App.css';
const initialState = [
    {
      title: 'Wendell',
      items: [
        'Buy eggs',
        'go grocery shopping',
      ],
    },{
      title: 'Karli',
      items: [
        'meditate',
        'bloviate',
      ],
    },
    {
      title: 'John',
      items: [
        'finish the one thing that you def remember',
        'make some unit tests, bruh',
      ],
    },
    {
      title: 'Jaymie',
      items: [
        'idk, my bff jill',
        'jake from state farm',
      ],
    },
  ]
  function reducer(state, action) {
    let s = [...state];
    switch(action.type){
      case 'add_item':
        s[action.index] = {title: state[action.index].title, items: [...state[action.index].items, action.item]};
        return s;
      case 'move_item':
        let fromCol = {title: state[action.from].title, items: state[action.from].items.filter((v, idx) => idx !== action.index) };
        let toCol = {title: state[action.to].title, items: [...state[action.to].items, state[action.from].items.filter((v, idx) => idx === action.index)[0]]}
        s[action.from] = fromCol;
        s[action.to] = toCol;
        return s;
      default:
        return s;
    }
  }

function App() {
  let [state, dispatch] = useReducer(reducer, initialState);

  return <div className="layout">{state.map( (c, idx) => {
    return (<Column key={idx} index={idx} dispatch={dispatch} title={c.title} items={c.items}>
    </Column>)})}</div>;
}


function Column(props){
  let items = props.items;
  function handleClick(e) {
    let text = window.prompt('add some text');
    props.dispatch({type: 'add_item', index: props.index, item: text})
  }
  return <div className="column">
    <header>{props.title}</header>
    {items.map( (i, idx) => <Item key={idx} index={idx} colIndex={props.index} dispatch={props.dispatch} col={props.title} text={i}></Item>)}
    <button onClick={handleClick}>Add item</button>
  </div>
}

function Item(props){
  function handleLeft(){
    props.dispatch({type: 'move_item', from: props.colIndex, to: props.colIndex-1, index: props.index})
  }
  function handleRight(){
    props.dispatch({type: 'move_item', from: props.colIndex, to: props.colIndex+1, index: props.index})
  }
  return (
    <div className="kanbanItem">
    {props.colIndex > 0 ?(<button onClick={handleLeft}>{'<'}</button>): ''}
    <div>{props.text}</div>
    {props.colIndex < 3 ? (<button onClick={handleRight}>{'>'}</button>): ''}
    </div>
  )
}

export default App;
