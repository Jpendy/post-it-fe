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

        if (!title || !category) {
            alert('Please complete all required fields before submitting')
            return;
        }

        await createPost({ title, category, body, image, video }, activeUser.token)
        history.push('/')
    }

    const handleClick = async () => {
        await setCreateCategory(createCategory ? false : true)
        !createCategory && categoryInput.current.focus();
    }

    const categories = [...new Set(posts.map(item => item.category))]

    return (
        <>
            <div className='create-post-form-area' >
                <h3>Create Post</h3>

                <form onSubmit={handleSubmit} className='create-post-form' >

                    <input className='create-post-form-input' placeholder='title - required' onChange={e => setTitle(e.target.value)} />

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {
                            createCategory
                                ? <input ref={categoryInput} maxLength={15} style={{ width: '200px' }} className='create-post-form-input' placeholder='category' onChange={e => setCategory(e.target.value)} />
                                : <select style={{ width: '387px' }} className='create-post-form-input' onChange={e => setCategory(e.target.value)}>
                                    <option value='none' >category - required</option>
                                    {categories.map((category, i) => <option key={i} >{category}</option>)}
                                </select>
                        }
                        <span><button style={{ height: '25px', cursor: 'pointer' }} type='button' onClick={handleClick} >{createCategory ? 'Choose Category' : 'Add Category'}</button></span>
                    </div>

                    <input className='create-post-form-input' placeholder='image url - optional' style={{ display: 'block' }} onChange={e => setImage(e.target.value)} />
                    <input className='create-post-form-input' placeholder='video url - optional' style={{ display: 'block' }} onChange={e => setVideo(e.target.value)} />
                    <textarea className='create-post-form-textarea' placeholder='text body - optional' style={{ display: 'block' }} onChange={e => setBody(e.target.value)} />
                    <button className='create-post-button' >Submit</button>
                </form>
            </div>


            {(title || category || image || video || body) &&
                <div className="create-post-preview-area" >
                    Preview:
                    {title && <h3>{title}</h3>}
                    {category && <p>{category}</p>}
                    {image && <img src={image} alt='' />}
                    {video && <iframe src={video} title='title' />}
                    {body && <p>{body}</p>}
                </div>}
        </>
    )
}
