import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom';
import { useActiveUser } from '../../hooks/AuthContext'
import usePosts from '../../hooks/usePosts';
import { createPost } from '../../services/apiFetches'
import './CreatePost.css'

export default function CreatePost() {
    const activeUser = useActiveUser();
    const history = useHistory();

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')
    const [createCategory, setCreateCategory] = useState(false)

    const categoryInput = useRef()

    const { posts } = usePosts('ALL_POSTS');

    console.log(category)
    const handleSubmit = async e => {
        e.preventDefault();

        await createPost({ title, category, body, image, video }, activeUser.token)
        history.push('/')
    }

    const handleClick = async () => {
        await setCreateCategory(createCategory ? false : true)
        !createCategory && categoryInput.current.focus();
    }

    return (
        <div className='create-post-form-area' >
            <h3>Create Post</h3>

            <form onSubmit={handleSubmit} className='create-post-form' >

                <input className='create-post-form-input' placeholder='title' onChange={e => setTitle(e.target.value)} />

                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {
                        createCategory
                            ? <input ref={categoryInput} style={{ width: '200px' }} className='create-post-form-input' placeholder='category' onChange={e => setCategory(e.target.value)} />
                            : <select style={{ width: '387px' }} className='create-post-form-input' onChange={e => setCategory(e.target.value)}>
                                <option value='none' >choose category</option>
                                {posts.map((item, i) => <option key={i} >{item.category}</option>)}
                            </select>
                    }
                    <span><button style={{ height: '25px', cursor: 'pointer' }} type='button' onClick={handleClick} >{createCategory ? 'Choose Category' : 'Add Category'}</button></span>
                </div>

                <input className='create-post-form-input' placeholder='image url - optional' style={{ display: 'block' }} onChange={e => setImage(e.target.value)} />
                <input className='create-post-form-input' placeholder='video url - optional' style={{ display: 'block' }} onChange={e => setVideo(e.target.value)} />
                <textarea className='create-post-form-textarea' placeholder='text body' style={{ display: 'block' }} onChange={e => setBody(e.target.value)} />
                <button className='create-post-button' >Submit</button>
            </form>
        </div>
    )
}
