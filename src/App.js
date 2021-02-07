import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


//get local storage if is not empty
const getLocalStorage = ()=> {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"))
  } else {
    return [];
  }
}

function App() {
  const [name,setName] = useState('');
  const [list,setList] = useState(getLocalStorage());
  const [isEditing,setIsEditing] = useState(false);
  const [editID,setEditID] = useState(null);
  const [alert,setAlert] = useState({show:false,msg:"",type:""});

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!name){ //if form is empty
      //disply alert
      showAlert(true,"danger","please enter value")
    }
    else if (name && isEditing) { // if button is edit
      //editing item only if is not an empty value
      setList(list.map((item)=>{
        if (item.id === editID) 
        {
          return {...item,title:name}
        }
        return item

      }))
      setName("");
      setEditID(null);
      setIsEditing(false);
      showAlert(true,"success","value changed")
    }
    else {
      //show alert
      showAlert(true,"success","item added to the list")
      const newItem = {id: new Date().getTime().toString(),title:name}; // seti new item 
      setList([...list,newItem]);
      setName('');
    }
  }

//alert functionality
  const showAlert = (show=false,type="",msg="") =>{
    setAlert({show,type,msg})
  }
// clear functionality
const clearList = () => {
  showAlert(true,"danger","empty list");
  setList([])
}

// remove item functionality
const removeItem = (id) => {
  showAlert (true,"danger","item removed");
  //if item id does not match then do return it from the filter function into new array
  setList(list.filter((item)=>item.id !== id))
}

// edit item functionality
const editItem = (id) => {
  //if id matches return that item
  const specificItem = list.find((item)=>item.id === id);
  setIsEditing(true);
  setEditID(id);
  setName(specificItem.title)

}

//local data
useEffect(()=> {
  localStorage.setItem('list',JSON.stringify(list))
},[list])


  return <section className="section-center">
    <form className="grocery-form" onSubmit={handleSubmit}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} list={list}/>}
      <h3>Grocery List</h3>
      <div className="form-control">
        <input type="text" className="grocery" placeholder="e.g. Apples" value={name}
        onChange={(e)=> setName(e.target.value)}/>
        <button type="submit" className="submit-btn">
          {isEditing ? 'edit':'submit'}
        </button>
      </div>
    </form>
    {list.length > 0 && (
    <div className="grocery-container">
      <List items={list} removeItem={removeItem} editItem={editItem}/>
      <button className="clear-btn" onClick={clearList}>clear items</button>
    </div>)}
  </section>
}

export default App
