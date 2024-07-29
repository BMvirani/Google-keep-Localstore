"use client";
import React, { useState, useEffect } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TodoItem from "../components/TodoItem";
import { Switch } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotes,
  addPinnedNotes,
  draggableMode,
  updateNotePosition,
  updatePinPosition,
  clearFilter,
  filterNotes,
} from "../redux/slice/noteslice";
import AddNote from "./AddNote";

const TodoList = () => {
  const isDraggable = useSelector((store) => store.notes.isDraggable);
  const notesList = useSelector((store) => store.notes.notesList);
  const pinList = useSelector((store) => store.notes.pinList);
  const notesPosition = useSelector((store) => store.notes.notesPosition);
  const pinPosition = useSelector((store) => store.notes.pinPosition);
  const filteredNotes = useSelector((store) => store.notes.filteredNotesList);
  const filteredPinList = useSelector((store) => store.notes.filteredPinList);
  const searchNote = useSelector((store) => store.notes.searchNote);

  const userId =
    typeof window !== "undefined" && localStorage?.getItem("userId");
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  const handleNotesLayoutChange = async (layout) => {
    dispatch(updateNotePosition(layout));
  };

  const handlePinLayoutChange = async (layout) => {
    dispatch(updatePinPosition(layout));
  };

  const calculateNewPositions = (items, cols) => {
    return items.map((item, index) => ({
      i: item?.id?.toString(),
      x: index % cols,
      y: Math.floor(index / cols),
      w: 1,
      h: 1,
    }));
  };

  const handleAddNote = (note) => {
    const newNotesList = [...notesList, note];
    const newNotesPosition = calculateNewPositions(newNotesList, 4);
    dispatch(addNotes(newNotesList));
    dispatch(updateNotePosition(newNotesPosition));
  };

  useEffect(() => {
    if (isEdited) {
      const updatedNotesPosition = calculateNewPositions(notesList, 5);
      dispatch(updateNotePosition(updatedNotesPosition));
      const updatedPinPosition = calculateNewPositions(pinList, 4);
      dispatch(updatePinPosition(updatedPinPosition));
    }
  }, [notesList, pinList, dispatch]);

  useEffect(() => {
    if (searchNote) {
      setIsEdited(true);
    }
  }, [searchNote]);

  useEffect(() => {
    if (!searchNote && isEdited) {
      const updatedFilteredNotesPosition = calculateNewPositions(
        filteredNotes,
        5
      );
      dispatch(updateNotePosition(updatedFilteredNotesPosition));

      const updatedFilteredPinPosition = calculateNewPositions(
        filteredPinList,
        4
      );
      dispatch(updatePinPosition(updatedFilteredPinPosition));
    }
  }, [searchNote]);

  const handleClearFilter = () => {
    dispatch(clearFilter());
  };

  return (
    <>
      <AddNote onAddNote={(val) => handleAddNote(val)} />
      <div className="board-box">
        {pinList.length > 0 && (
          <>
            <h3 className="note-list-type-title">PINNED</h3>
            <GridLayout
              className="layout"
              layout={pinPosition}
              cols={4}
              rowHeight={200}
              width={1000}
              isDraggable={isDraggable}
              onLayoutChange={handlePinLayoutChange}
            >
              {filteredPinList?.map((item) => (
                <div
                  key={item.id}
                  data-grid={pinPosition.find(
                    (l) => l.i === item.id.toString()
                  )}
                >
                  <TodoItem item={item} isDraggable={isDraggable} />
                </div>
              ))}
            </GridLayout>
          </>
        )}
        {pinList.length > 0 && <h3 className="note-list-type-title">OTHERS</h3>}
        <GridLayout
          className="layout"
          layout={notesPosition}
          cols={4}
          rowHeight={200}
          width={1000}
          isDraggable={isDraggable}
          onLayoutChange={handleNotesLayoutChange}
        >
        
          {filteredNotes?.map((item) => (
            <div
              key={item.id}
              data-grid={notesPosition?.find((l) => l.i === item?.id?.toString())}
            >
              <TodoItem item={item} isDraggable={isDraggable} />
            </div>
          ))}
        </GridLayout>
      </div>
    </>
  );
};

export default TodoList;
