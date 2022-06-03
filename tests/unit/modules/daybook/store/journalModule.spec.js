import { createStore } from "vuex";
import journalModule from "@/modules/daybook/store/journal";
import { journalState } from "../../../mock-data/test-journal-state";

import authApi from "@/api/authApi";
const createVuexStore = (initialState) =>
	createStore({
		modules: {
			journalModule: {
				...journalModule,
				state: { ...initialState },
			},
		},
	});

describe("Vuex - Pruebas en el Journal Module", () => {
	beforeAll(async () => {
		
		const { data } = await authApi.post(":signInWithPassword", {
			email: "test@test.com",
			password: "123456",
			returnSecureToken: true,
		});

		localStorage.setItem("idToken", data.idToken);
	});

	test("Este es el estado inicial, debe tener este state", () => {
		const store = createVuexStore(journalState);
		const { isLoading, entries } = store.state.journalModule;
		expect(isLoading).toBeFalsy();
		expect(entries).toEqual(journalState.entries);
	});

	test("Mutation: SET_ENTRIES", () => {
		const store = createVuexStore({ isLoading: true, entries: [] });
		let { isLoading, entries } = store.state.journalModule;
		expect(isLoading).toBeTruthy();
		expect(entries).toEqual([]);
		store.commit("journalModule/SET_ENTRIES", journalState.entries);
		isLoading = store.state.journalModule.isLoading;
		entries = store.state.journalModule.entries;
		expect(isLoading).toBeFalsy();
		expect(entries).toEqual(journalState.entries);
	});

	/* MUTATIONS */
	test("Mutation: UPDATE_ENTRY", () => {
		const store = createVuexStore(journalState);
		let { entries } = store.state.journalModule;
		const updatedEntry = { ...journalState.entries[0] };
		updatedEntry.text = "Hello From Tests";
		expect(entries).not.toContainEqual(updatedEntry);
		store.commit("journalModule/UPDATE_ENTRY", updatedEntry);
		entries = store.state.journalModule.entries;
		expect(entries).toContainEqual(updatedEntry);
	});
	test("Mutation: ADD_ENTRY DELETE_ENTRY", () => {
		const store = createVuexStore(journalState);
		let { entries } = store.state.journalModule;
		/* Adding entry */
		const newEntry = {
			id: "ABC_123",
			text: "Hello world",
			date: 1653456385181,
		};
		expect(entries).not.toContainEqual(newEntry);
		expect(entries).toHaveLength(7);
		store.commit("journalModule/ADD_ENTRY", newEntry);
		entries = store.state.journalModule.entries;
		expect(entries).toContainEqual(newEntry);
		expect(entries).toHaveLength(8);

		/* Deleting entry */
		const entryId = newEntry.id;
		store.commit("journalModule/DELETE_ENTRY", entryId);
		entries = store.state.journalModule.entries;
		expect(entries).toHaveLength(7);
		expect(entries).not.toContainEqual(newEntry);
	});

	/* GETTERS */
	test("Getters: getEntriesByTerm", () => {
		const store = createVuexStore(journalState);
		const entryResult = store.state.journalModule.entries[0];
		expect(
			store.getters["journalModule/getEntriesByTerm"]("")
		).toHaveLength(7);
		expect(
			store.getters["journalModule/getEntriesByTerm"]("test")
		).toContainEqual(entryResult);
	});
	test("Getters: getEntriesById", () => {
		const store = createVuexStore(journalState);
		const entryResult = store.state.journalModule.entries[0];
		expect(
			store.getters["journalModule/getEntryById"](entryResult.id)
		).toEqual(entryResult);
	});

	/* ACTIONS */
	test("Actions: loadEntries", async () => {
		const store = createVuexStore({ isLoading: true, entries: [] });
		let entries = store.state.journalModule.entries;
		expect(entries).toHaveLength(0);
		await store.dispatch("journalModule/loadEntries");
		entries = store.state.journalModule.entries;
		expect(entries).not.toHaveLength(0);
	});

	test("Actions: updateEntry", async () => {
		const store = createVuexStore(journalState);
		let { entries } = store.state.journalModule;
		const updatedEntry = { ...journalState.entries[0] };
		updatedEntry.text = "Action Update";

		expect(entries).not.toContainEqual(updatedEntry);
		await store.dispatch("journalModule/updateEntry", updatedEntry);
		entries = store.state.journalModule.entries;
		expect(entries).toHaveLength(7);
		expect(entries).toContainEqual(updatedEntry);
	});
	test("Actions: createEntry, deleteEntry", async () => {
		const store = createVuexStore(journalState);
		/* Creating */
		const newEntry = {
			text: "New Entry Test",
			date: 1653456385181,
		};

		const newId = await store.dispatch(
			"journalModule/createEntry",
			newEntry
		);
		let entries = store.state.journalModule.entries;

		expect(typeof newId).toBe("string");
		newEntry.id = newId;
		expect(entries).toContainEqual(newEntry);

		/* Deleting */
		const entryToDelete = newEntry;
		await store.dispatch("journalModule/deleteEntry", entryToDelete.id);
		entries = store.state.journalModule.entries;
		expect(entries).not.toContainEqual(entryToDelete);
	});
});
