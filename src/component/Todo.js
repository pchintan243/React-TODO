import React, { useState } from 'react'
import "./Todo.css"

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([])

    const addItem = () => {
        if (!inputData) { }
        else {
            setItems([...items, inputData])
            setInputData('')
        }
    }
    return (
        <div className='main-div'>
            <div className="child-div">
                <figure>
                    <figcaption>
                        Add Your List Here📃
                    </figcaption>
                </figure>
                <div className="addItems">
                    <input type="text" placeholder='✍️ Add Items...' value={inputData}
                        onChange={(e) => setInputData(e.target.value)} />

                    <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i>
                </div>
                <div className="showItems">
                    <div className="eachItem">
                        <h3>a</h3>
                        <i className="far fa-trash-alt add-btn" title='Delete Item'></i>
                    </div>
                </div>
                {/* CLear All Button */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All"><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
    )
}

export default Todo