"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TodoItem from "@/app/components/TodoItem";
import { addTrashNotes, updateTrashLayout } from "@/app/redux/slice/noteslice";
import { DeleteOutlined } from "@ant-design/icons";

const TrashGridLayout = () => {
  const isDraggable = useSelector((store) => store.notes.isDraggable);
  const dispatch = useDispatch();
  const trashList = useSelector((store) => store.notes.notesTrashList);
  const layout = useSelector((store) => store.notes.notesTrashPosition);
  const [isEdited, setIsEdited] = useState(false);
  const userId = typeof window !== "undefined" && localStorage?.getItem("userId");
 

  useEffect(() => {
    const newLayout = trashList.map((item, index) => ({
      i: item.id.toString(),
      x: index % 5,
      y: Math.floor(index / 5),
      w: 1,
      h: 1,
    }));
    dispatch(updateTrashLayout(newLayout));
  }, [trashList, dispatch]);

  // set trash position  layout 
  const handleLayoutChange = async (newLayout) => {
    dispatch(updateTrashLayout(newLayout));
  };

  return (
    <div className="board-wrapper">
      {trashList && trashList.length > 0 ? (
        <div className="board-box">
          <>
            <GridLayout
              className="layout"
              layout={layout}
              cols={5}
              rowHeight={200}
              width={1200}
              onLayoutChange={handleLayoutChange}
              isDraggable={isDraggable}
            >
              {trashList.map((item) => (
                <div
                  key={item.id}
                  data-grid={
                    layout.find((l) => l.i === item.id.toString()) || {
                      i: item.id.toString(),
                      x: 0,
                      y: 0,
                      w: 1,
                      h: 1,
                    }
                  }
                >
                  <TodoItem item={item} isDraggable={true} />
                </div>
              ))}
            </GridLayout>
          </>
        </div>
      ) : (
        <div className="no-trash-box">
          <div className="no-trash">
            <DeleteOutlined />
            No notes in Trash
          </div>
        </div>
      )}
    </div>
  );
};

export default TrashGridLayout;
