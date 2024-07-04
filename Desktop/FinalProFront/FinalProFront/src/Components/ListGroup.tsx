import React, { useState } from "react";
function ListGroup() {
  const [selectedItem, setSelectedItem] = useState(-1);

  const items: string[] = [
    "An item",
    "A second item",
    "A third item",
    "A fourth item",
    "And a fifth one",
  ];

  const onClickHandler = (index: number) => {
    setSelectedItem(index);
    console.log(index);
  };

  return (
    <>
      {items.length === 0 && <p>There are no items!</p>}
      <ul className="list-group">
        {items.map((item, index) => (
          <li
            className={
              index == selectedItem
                ? "list-group-item active"
                : "list-group-item"
            }
            key={index}
            onClick={() => onClickHandler(index)}
          >
            {item + " " + index}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroup;
