import { createApp } from "vue"
import currentStore from './store/store'
import WebsiteBuilderAppVue from "./WebsiteBuilderApp.vue";

window.currentStore = currentStore

window.c = {
    s: currentStore.state,
    g: currentStore.getters,
    d: currentStore.dispatch
}

createApp( WebsiteBuilderAppVue )
    .use( currentStore )
    .mount( '#app' )
