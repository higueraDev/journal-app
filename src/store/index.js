import { createStore } from "vuex";
import journalModule from "@/modules/daybook/store/journal";
import authModule from "@/modules/auth/store/auth";

const store = createStore({
	modules:{
        journalModule,
        authModule
    }
});

export default store;
