//export const myAction = (state,payload) =>{}
export const SET_ENTRIES = (state,entries) =>{
    state.entries = [...state.entries, ...entries]
    state.isLoading = false;
}
export const ADD_ENTRY = (state,entry) =>{
    state.entries = [entry,...state.entries];
}

export const UPDATE_ENTRY = (state,entry) =>{
    const index = state.entries.findIndex((e)=>e.id === entry.id);
    state.entries[index] = entry;
}

export const DELETE_ENTRY = (state,id) =>{
    state.entries = state.entries.filter((e)=>e.id != id);
}

export const CLEAR_ENTRIES = (state) => {
	state.entries = [];
};