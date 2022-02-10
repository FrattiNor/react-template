export default {
    namespace: 'app',
    state: {
        a: 1,
        b: 2
    },
    reducers: {
        setA(state, { payload }) {
            return {
                ...state,
                a: payload
            }
        },
        setB(state, { payload }) {
            return {
                ...state,
                b: payload
            }
        }
    }
}
