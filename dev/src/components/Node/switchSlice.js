import { createSlice } from "@reduxjs/toolkit";

export const switchSlice = createSlice({
  name: "switch",
  initialState: {
    value: {
      selectId: 0,
      nodeName: '',
      eventName: "" | "Add" | "Edit" | "Del",
      parentNodeId: "",
      showModal: false,
    },
  },
  reducers: {
    setNodeId: (state, actions) => {
      state.value.selectId = actions.payload.id;
      state.value.parentNodeId  = actions.payload.parentNodeId;
      state.value.nodeName = actions.payload.nodeName;
    },
    setModal: (state, actions) => {
      state.value.eventName = actions.payload.eventName;
      state.value.showModal = actions.payload.showModal;
    },
  },
});

export const { setNodeId, setModal } = switchSlice.actions;
export const selectSwitch = (state) => state.switch.value;

export default switchSlice.reducer;
