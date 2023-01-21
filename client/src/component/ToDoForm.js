import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

const ToDoForm = () => {
    const [todoState, setToDoState] = useState("");
    const [itemList, setItemlist] = useState([]);
    const onsubmitHandler = (e) => {
        e.preventDefault();
        if (!todoState) return;
        try {
            fetch("http://localhost:5000/db", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    todo_name: todoState,
                }),
            }).then(() => {
                alert("sucessfull insert");
                setItemlist((itemList) => [
                    ...itemList,
                    { todo_name: todoState },
                ]);
                setToDoState("");
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/db/get")
            .then((response) => response.json())
            .then((data) => setItemlist(data.data));
    }, []);

    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current.focus();
    });

    return (
        <>
            <header>
                <h1>TodoList</h1>
            </header>
            <form onSubmit={onsubmitHandler}>
                <div className="inputbox">
                    <input
                        placeholder="Enter to do"
                        type="text"
                        ref={inputRef}
                        value={todoState}
                        onChange={(e) => {
                            setToDoState(e.target.value);
                        }}
                    />
                    <button type="submit">Add Task</button>
                </div>
            </form>
            <div>
                <ol>
                    {itemList?.map((item, index) => {
                        return (
                            <div key={index} className="liststyle">
                                <li>{item.todo_name}</li>
                                <FontAwesomeIcon
                                    icon={faDeleteLeft}
                                    className="icon"
                                />
                            </div>
                        );
                    })}
                </ol>
            </div>
        </>
    );
};

export default ToDoForm;
