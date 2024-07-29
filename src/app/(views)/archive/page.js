"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GridLayout from "react-grid-layout";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {
  addArchiveNotes,
  updateArchiveLayout,
} from "@/app/redux/slice/noteslice";
import TodoItem from "@/app/components/TodoItem";
import { ArchiveSvg } from "../../../../public/svgs/svgs";

const ArchiveGridLayout = () => {
  const isDraggable = useSelector((store) => store.notes.isDraggable);
  const dispatch = useDispatch();
  const archiveList = useSelector((store) => store.notes.archiveNotesList);
  const layout = useSelector((store) => store.notes.archiveLayout);
  const [isEdited, setIsEdited] = useState(false);
  const userId =
    typeof window !== "undefined" && localStorage?.getItem("userId");
 

  useEffect(() => {
    const newLayout = archiveList.map((item, index) => ({
      i: item.id.toString(),
      x: index % 5,
      y: Math.floor(index / 5),
      w: 1,
      h: 1,
    }));
    dispatch(updateArchiveLayout(newLayout));
  }, [archiveList, dispatch]);

  // archive note layout 
  const handleLayoutChange = async (newLayout) => {
    
    dispatch(updateArchiveLayout(newLayout));
  };

  return (
    <div className="board-wrapper">
      {archiveList && archiveList.length > 0 ? (
        <>
          <div className="board-box">
            <GridLayout
              className="layout"
              layout={layout}
              cols={5}
              rowHeight={200}
              width={1200}
              onLayoutChange={handleLayoutChange}
              isDraggable={isDraggable}
            >
              {archiveList.map((item) => (
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
                  <TodoItem item={item} isDraggable={isDraggable} />
                </div>
              ))}
            </GridLayout>
          </div>
        </>
      ) : (
        <>
          <div className="no-archive-box">
            <div className="no-archive">
              <ArchiveSvg />
              No notes in archive
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ArchiveGridLayout;
