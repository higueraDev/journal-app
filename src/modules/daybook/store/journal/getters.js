//export const myAction = (state) => {}
export const getEntriesByTerm =
	(state) =>
	(term = "") =>
		term.length === 0
			? state.entries
			: state.entries.filter((entry) =>
					entry.text.toLowerCase().includes(term.toLowerCase())
			);
export const getEntryById = (state) => (id = '') => {
	const entry = state.entries.find((entry) => entry.id === id);
	if(!entry)return

	return {...entry}
};
