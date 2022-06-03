import authModule from "@/modules/auth/store/auth";
import journalModule from "@/modules/daybook/store/journal";
import { createStore } from "vuex";
import { journalState } from "./test-journal-state";

const createVuexStore = (authInitState, journalInitState = journalState) =>
	createStore({
		modules: {
			authModule: {
				...authModule,
				state: { ...authInitState },
			},
			journalModule: {
				...journalModule,
				state: { ...journalInitState },
			},
		},
	});

export default createVuexStore;
