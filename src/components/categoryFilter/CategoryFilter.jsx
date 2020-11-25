import React from 'react'

export default function CategoryFilter({ posts, handleFilterChange }) {
    return (
        <div>
            <select onChange={handleFilterChange} >
                <option value='' >All Categories</option>
                {posts.map(({ category }) => <option value={category} >{category}</option>)}
            </select>
        </div>
    )
}