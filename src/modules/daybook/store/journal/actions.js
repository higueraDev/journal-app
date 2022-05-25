import journalApi from '@/api/journalApi'

//export const myAction = async({commit}) =>{}

export const loadEntries = async({commit}) =>{
    const {data} = await journalApi.get('/entries.json')
    const entries = [];
    if(data){
        for(let id of Object.keys(data)){
            entries.push({
                id,
                ...data[id]
            })
        }
    }
    commit('SET_ENTRIES',entries)
}

export const createEntry = async({commit}, entry) =>{
    const {data} = await journalApi.post(`/entries.json`, entry);

    const {name:id} = data,
        newEntry = {id, ...entry};

    commit('ADD_ENTRY',newEntry)

    return id
}


export const updateEntry = async({commit}, entry) =>{
    /* Request */
    const {id,...body} = entry;
    const {data} = await journalApi.put(`/entries/${id}.json`, body);
    
    /* Response */
    const entryUpdated ={
        id,
        ...data
    }
    commit('UPDATE_ENTRY',entryUpdated)
}

export const deleteEntry = async({commit}, id) =>{
    /* Request */
    await journalApi.delete(`/entries/${id}.json`);
    
    commit('DELETE_ENTRY',id)
}
