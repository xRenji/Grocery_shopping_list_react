
import React from 'react'
import { FaEdit, FaTrash, FaCartPlus,FaCartArrowDown} from 'react-icons/fa'
const List = ({items,removeItem,editItem,handleToggle,isActive}) => {
  
  
  return (
  <div className="grocery-list">
    {items.map((item)=>{
      const {id,title,cart} = item;
      return ( <article key={id} className={cart?"grocery-item-active":"grocery-item"}>
        <p className="title">{title}</p>
        <div className="btn-container">
          <button type="button" className="add-btn" onClick={()=> handleToggle(id)} >
            {cart ? <FaCartArrowDown/>:<FaCartPlus/>}
          </button>
          <button type="button" className="edit-btn" onClick={()=>editItem(id)}>
            <FaEdit/>
          </button>
          <button type="button" className="delete-btn"
          onClick={() =>removeItem(id)}>
            <FaTrash/>
          </button>
        </div>
      </article> )
    })}
  </div>
  )
}

export default List
