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

    const deleteItem = (id) => {
        const deleteItems = items.filter((elem, ind) => {
            return ind !== id;
        });
        setItems(deleteItems)
    }

    const removeAll = () => {
        setItems([]);
    }

    return (
        <div className='main-div'>
            <div className="child-div">
                <figure>
                    <figcaption>
                        Add Your List Here📃
                    </figcaption>
                </figure>

                {/* Add Items */}
                <div className="addItems">
                    <input type="text" placeholder='✍️ Add Items...' value={inputData}
                        onChange={(e) => setInputData(e.target.value)} />

                    <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i>
                </div>

                {/* Show Items */}
                <div className="showItems">
                    {
                        items.map((elem, ind) => {
                            return (
                                <div className="eachItem" key={ind}>
                                    <h3>{elem}</h3>
                                    <i className="far fa-trash-alt add-btn" title='Delete Item'
                                        onClick={() => deleteItem(ind)}></i>
                                </div>
                            )
                        })
                    }

                </div>

                {/* CLear All Button */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
    )
}

export default Todo