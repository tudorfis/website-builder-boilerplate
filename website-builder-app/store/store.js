import { createStore } from 'vuex'
import mainStore from './main/main.store'

export default createStore({
    modules: {
        'main': mainStore
    },
})
