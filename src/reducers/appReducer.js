
export const initialState = {
    boards: [],
    posts: [],
    voteHistory: [],
    commentVoteHistory: []
}

export default function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_POSITION':
            return { ...state, mainCharacter: { ...state.mainCharacter, x: action.payload.x, y: action.payload.y } };
        case 'UPDATE_ENEMY_POSITION':
            return { ...state, enemy: { ...state.enemy, x: action.payload.x, y: action.payload.y } };
        default:
            return state;
    }
}