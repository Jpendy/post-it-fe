import React, { useReducer, useState } from 'react';
import { AppContext } from '../hooks/appContext';
import useComments from '../hooks/useComments';
import usePosts from '../hooks/usePosts';
// import reducer, { initialState } from '../reducers/appReducer';

export default function AppProvider({ children }) {
    // const [state, dispatch] = useReducer(reducer, initialState)

    const [postCommand, setPostCommand] = useState('ALL_POSTS')

    const { posts, voteHistory, handleVoteClick } = usePosts(postCommand)



    return (
        <AppContext.Provider value={{}} >
            {children}
        </AppContext.Provider>
    )
}