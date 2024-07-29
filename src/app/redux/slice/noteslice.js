

// import { createSlice } from "@reduxjs/toolkit";

// export const notesSlice = createSlice({
//   name: "notes",
//   initialState: {
//     isDraggable: false,
//     notesList: [],
//     notesPosition: [],
//     pinList: [],
//     pinPosition: [],
//     archiveNotesList: [],
//     archiveLayout: [],
//     notesTrashList: [],
//     notesTrashPosition: [],
//     filteredNotesList: [],
//     filteredPinList: [],
//     searchNote:""
//   },

//   reducers: {
//     draggableMode: (state, action) => {
//       state.isDraggable = action.payload;
//     },
//     addNotes: (state, action) => {
//       state.notesList = action.payload;
//       state.filteredNotesList = action.payload;
//     },
//     updateNotePosition: (state, action) => {
//       state.notesPosition = action.payload;
//     },
//     addPinnedNotes: (state, action) => {
//       state.pinList = action.payload;
//       state.filteredPinList = action.payload;
//     },
//     updatePinPosition: (state, action) => {
//       state.pinPosition = action.payload;
//     },
//     addArchiveNotes: (state, action) => {
//       state.archiveNotesList = action.payload;
//     },
//     updateArchiveLayout: (state, action) => {
//       state.archiveLayout = action.payload;
//     },
//     addTrashNotes: (state, action) => {
//       state.notesTrashList = action.payload;
//     },
//     updateTrashLayout: (state, action) => {
//       state.notesTrashPosition = action.payload;
//     },
//     filterNotes: (state, action) => {
//       const query = action.payload.toLowerCase();
//       state.filteredNotesList = state?.notesList?.filter(note =>
//         note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
//       );
//       state.filteredPinList = state?.pinList?.filter(note =>
//         note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
//       );
//     },
//     clearFilter: (state) => {
//       state.filteredNotesList = state.notesList;
//       state.filteredPinList = state.pinList;
//       state.notesPosition = state.notesList.map((_, index) => index); // Reset positions
//       state.pinPosition = state.pinList.map((_, index) => index); // Reset positions
//     },
//     searchNoteValue: (state,action) => {
//       state.searchNote = action.payload
//     },
//   },
// });

// export const {
//   draggableMode,
//   updatePinPosition,
//   addNotes,
//   updateNotePosition,
//   addArchiveNotes,
//   addPinnedNotes,
//   updateArchiveLayout,
//   addTrashNotes,
//   updateTrashLayout,
//   filterNotes,
//   clearFilter,
//   searchNoteValue
// } = notesSlice.actions;

// export default notesSlice.reducer;
// ----------------------------------------------------
import { createSlice } from "@reduxjs/toolkit";

// Function to load state from localStorage
const loadState = (key, defaultState) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return defaultState;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState;
  }
};

// Function to save state to localStorage
const saveState = (key, state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    // Ignore write errors
  }
};

const initialState = {
  isDraggable: loadState("isDraggable", false),
  notesList: loadState("notesList", []),
  notesPosition: loadState("notesPosition", []),
  pinList: loadState("pinList", []),
  pinPosition: loadState("pinPosition", []),
  archiveNotesList: loadState("archiveNotesList", []),
  archiveLayout: loadState("archiveLayout", []),
  notesTrashList: loadState("notesTrashList", []),
  notesTrashPosition: loadState("notesTrashPosition", []),
  filteredNotesList: loadState("filteredNotesList", []),
  filteredPinList: loadState("filteredPinList", []),
  searchNote: loadState("searchNote", "")
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    draggableMode: (state, action) => {
      state.isDraggable = action.payload;
      saveState("isDraggable", state.isDraggable);
    },
    addNotes: (state, action) => {
      state.notesList = action.payload;
      state.filteredNotesList = action.payload;
      saveState("notesList", state.notesList);
      saveState("filteredNotesList", state.filteredNotesList);
    },
    updateNotePosition: (state, action) => {
      state.notesPosition = action.payload;
      saveState("notesPosition", state.notesPosition);
    },
    addPinnedNotes: (state, action) => {
      state.pinList = action.payload;
      state.filteredPinList = action.payload;
      saveState("pinList", state.pinList);
      saveState("filteredPinList", state.filteredPinList);
    },
    updatePinPosition: (state, action) => {
      state.pinPosition = action.payload;
      saveState("pinPosition", state.pinPosition);
    },
    addArchiveNotes: (state, action) => {
      state.archiveNotesList = action.payload;
      saveState("archiveNotesList", state.archiveNotesList);
    },
    updateArchiveLayout: (state, action) => {
      state.archiveLayout = action.payload;
      saveState("archiveLayout", state.archiveLayout);
    },
    addTrashNotes: (state, action) => {
      state.notesTrashList = action.payload;
      saveState("notesTrashList", state.notesTrashList);
    },
    updateTrashLayout: (state, action) => {
      state.notesTrashPosition = action.payload;
      saveState("notesTrashPosition", state.notesTrashPosition);
    },
    filterNotes: (state, action) => {
      const query = action.payload.toLowerCase();
      state.filteredNotesList = state?.notesList?.filter(note =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      );
      state.filteredPinList = state?.pinList?.filter(note =>
        note.title.toLowerCase().includes(query) || note.content.toLowerCase().includes(query)
      );
      saveState("filteredNotesList", state.filteredNotesList);
      saveState("filteredPinList", state.filteredPinList);
    },
    clearFilter: (state) => {
      state.filteredNotesList = state.notesList;
      state.filteredPinList = state.pinList;
      state.notesPosition = state.notesList.map((_, index) => index); // Reset positions
      state.pinPosition = state.pinList.map((_, index) => index); // Reset positions
      saveState("filteredNotesList", state.filteredNotesList);
      saveState("filteredPinList", state.filteredPinList);
      saveState("notesPosition", state.notesPosition);
      saveState("pinPosition", state.pinPosition);
    },
    searchNoteValue: (state, action) => {
      state.searchNote = action.payload;
      saveState("searchNote", state.searchNote);
    },
  },
});

export const {
  draggableMode,
  updatePinPosition,
  addNotes,
  updateNotePosition,
  addArchiveNotes,
  addPinnedNotes,
  updateArchiveLayout,
  addTrashNotes,
  updateTrashLayout,
  filterNotes,
  clearFilter,
  searchNoteValue
} = notesSlice.actions;

export default notesSlice.reducer;
