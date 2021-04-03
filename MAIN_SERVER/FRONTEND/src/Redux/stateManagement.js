export const loadState = (name, InitialState) => {
    try {
        const deserializeState = window.localStorage.getItem(name);
        return deserializeState ? JSON.parse(deserializeState) : InitialState;
    } catch (err) {
        console.error(err);
        return InitialState;
    }
}

export const saveState = (name, state) => {
    try {
        const serializeState = JSON.stringify(state);
        localStorage.setItem(name, serializeState);
    } catch (err) {
        console.error(err);
    }
}