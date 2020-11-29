import React from 'react'
import './CategoryFilter.css'

export default function CategoryFilter({ posts, handleFilterChange, handleFilterSelectChange }) {

    const categories = [...new Set(posts.map(item => item.category))]


    return (
        <>
            <div className='category-buttons-area'>
                <p onClick={handleFilterChange} data-category='' className='category-button' >All</p>

                {categories.map((category, i) => (
                    <p
                        className='category-button'
                        key={i}
                        onClick={handleFilterChange}
                        data-category={category}
                    >{category}</p>
                ))
                    .slice(0, 10)
                }
                <select label='more' placeholder='categories' className='category-dropdown' onChange={handleFilterSelectChange} >

                    <option selected disabled hidden placeholder='More Categories' >More Categories</option>
                    <option value='' >All </option>
                    {categories.map((category, i) => <option key={i} value={category} >{category}</option>)}
                </select>
            </div>


            <div>

            </div>
        </>
    )
}
