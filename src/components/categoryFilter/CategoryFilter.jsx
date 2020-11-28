import React from 'react'

export default function CategoryFilter({ posts, handleFilterChange }) {
    return (
        <div>
            <select onChange={handleFilterChange} >
                <option value='' >All Categories</option>
                {posts.map(({ category }, i) => <option key={i} value={category} >{category}</option>)}
            </select>
        </div>
    )
}
