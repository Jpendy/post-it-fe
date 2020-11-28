import React from 'react'

export default function PostSort({ handleSortChange }) {
    return (
        <div>
            <select onChange={handleSortChange} >
                <option value='vote_score'>Top</option>
                <option value='id' >New</option>
            </select>
        </div>
    )
}
