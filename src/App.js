import "./App.css";
import React, { useState } from "react";
import { ViewListIcon, CheckIcon, XIcon } from "@heroicons/react/solid";

const Checkbox = () => {
  const [checked, setChecked] = useState(false);

  //  funzione che modifica lo stato
  function onBoxClick() {
    if (checked) {
      setChecked(false);
    } else {
      setChecked(true);
    }
  }

  // variabile vuota, se invece è checked la disegna sotto
  let icon;
  if (checked) {
    icon = <CheckIcon type="checkbox" className="w-6 h-6 text-green-500" />;
  }

  // disegnare l'icona del checked solo se checked è true

  return (
    <button
      className="mx-4 w-6 h-6 bg-gray-200 rounded shadow-sm"
      onClick={onBoxClick}
    >
      {icon}
    </button>
  );
};

const ToDoListWhiteBox = (props) => {
  return (
    <React.Fragment>
      {/* Created a to-do list white box componente to add below */}
      <div className="mx-4 mt-4 mb-2 flex items-center bg-white h-14 rounded-2xl">
        <Checkbox className="flex items-center" />

        <div className="select-none flex-grow">{props.text}</div>

        {/* x button */}
        <button
          className="mr-4 w-6 h-6 bg-indigo-400 rounded shadow-sm"
          onClick={props.onRemoveClick}
        >
          <XIcon className="text-white font-bold" />
        </button>
      </div>
    </React.Fragment>
  );
};

const InputBox = (props) => {
  const [text, setText] = useState("");

  // in this function we handle the text input change to update the state
  const handleChange = (event) => {
    setText(event.target.value);
  };

  // in this function we handle the button click and we call the addItem function
  function handleClick() {
    if (text !== "") {
      props.addItem(text);
      setText("");
    }
  }

  return (
    <div className="flex items-center my-8">
      <div className="flex px-4 mx-4 shadow-xl bg-white w-2/3 sm:h-10 md:h-12 lg:h-14 rounded-2xl">
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className="text-black w-full outline-none"
        />
      </div>

      <button
        className="flex items-center justify-center bg-indigo-400 shadow-xl w-12 h-12 rounded-full transition duration-700 ease-in-out transform hover:scale-110"
        onClick={handleClick}
      >
        {/* rounded button that adds the new to do list box */}
        <ViewListIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};

const ToDoList = () => {
  const [items, setItems] = useState([
    "Close my Fineco bank account",
    "Go to the grocery",
    "Singing lesson",
    "Go swimming",
    "Create a React Project",
    "Cook pizza",
  ]);

  // function that adds the Item
  function addItem(item) {
    const itemsCopy = [...items];
    itemsCopy.push(item);
    setItems(itemsCopy);
  }

  // come rimuovere un index
  function removeItem(index) {
    const itemsCopy = [...items];
    itemsCopy.splice(index, 1);
    setItems(itemsCopy);
  }

  const list = items.map((item, index) => {
    return (
      <ToDoListWhiteBox
        key={index}
        text={item}
        onRemoveClick={() => {
          removeItem(index);
        }}
      />
    );
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="font-bold text-3xl text-center items-center py-4 px-2 text-gray-600">
        Listly
      </div>
      <div className="px-2 py-8 flex-grow bg-gray-200">
        <div className="mx-4 font-bold text-2xl text-gray-600">Tasks:</div>

        {/* Component that creates as many to-do list boxes as we want */}
        {list}

        {/* Set the prop addItem of the input box component with addItem function */}
        <InputBox addItem={addItem} />
      </div>
    </div>
  );
};

export default ToDoList;
