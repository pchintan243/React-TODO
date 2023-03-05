import React, { useState, useEffect } from 'react'
import "./Todo.css";
import logo from "../images/todo.svg"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// To get data in local storage

const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
        return JSON.parse(localStorage.getItem('lists'));
    }
    else {
        return [];
    }
}

const Todo = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState(getLocalItems());
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [isEditItem, setisEditItem] = useState(null)

    const addItem = () => {
        if (!inputData) {
            toast.warn("Please filled the data", {
                position: "top-center",
            })
        }
        else if (inputData && !toggleSubmit) {
            // Update the data
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, name: inputData }
                    }
                    return elem;
                })
            )
            setToggleSubmit(true);
            setInputData('');
            setisEditItem(null)

            // Get alert after note edited successfully
            toast.success("Item Edited", {
                position: "top-center",
            })
        }
        else {
            const allInputData = { id: new Date().getTime().toString(), name: inputData }
            // Get all the items and after that add item on last index
            setItems([...items, allInputData])
            setInputData('')
            // Get alert after note added successfully
            toast.success("Item Added", {
                position: "top-center",
            })
        }
    }

    const deleteItem = (ind) => {
        // If id is matched with index it removes and after that new setItems will render
        const deleteItems = items.filter((elem) => {
            return ind !== elem.id;
        });
        setItems(deleteItems)
        // Get alert after note removed successfully
        toast.warn("Item Removed", {
            position: "top-center",
        })
    }

    const editItem = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        console.log(newEditItem);

        // For showing icon based on need
        setToggleSubmit(false);
        setInputData(newEditItem.name);
        // Get the id of which we want to edit
        setisEditItem(id)
    }

    const removeAll = () => {
        // Pass the empty state
        setItems([]);
        // Get alert after all notes removed successfully
        toast.error("All Items Removed", {
            position: "top-center",
        })
    }

    // To set data in local storage
    useEffect(() => {
        localStorage.setItem('lists', JSON.stringify(items))
    }, [items])

    return (
        <>
            <div className='main-div'>
                <div className="child-div">
                    <figure>
                        <img src={logo} alt="logo" />
                        <figcaption>
                            Add Your List Here📃
                        </figcaption>
                    </figure>

                    {/* Add Items */}
                    <div className="addItems">
                        <input type="text" placeholder='✍️ Add Items...' value={inputData}
                            onChange={(e) => setInputData(e.target.value)} />

                        {
                            toggleSubmit ? <i className="fa fa-plus add-btn" title='Add Item' onClick={addItem}></i> :
                                <i className="fa fa-edit add-btn" title='Update Item' onClick={addItem}></i>
                        }
                    </div>

                    {/* Show Items */}
                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3>{elem.name}</h3>
                                        <div className="todo-btn">
                                            <i className="far fa-edit add-btn" title='Edit Item'
                                                onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title='Delete Item'
                                                onClick={() => deleteItem(elem.id)}></i>
                                        </div>
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
            <ToastContainer style={{ fontSize: "1.5rem" }} />
        </>
    )
}

export default Todo