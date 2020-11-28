import React from 'react'

export default function CategoryFilter({ posts, handleFilterChange }) {

    const categories = [...new Set(posts.map(item => item.category))]
    return (
        <div>
            <select onChange={handleFilterChange} >
                <option value='' >All Categories</option>
                {categories.map((category, i) => <option key={i} value={category} >{category}</option>)}
            </select>
        </div>
    )
}
