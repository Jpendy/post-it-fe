import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { useActiveUser } from '../../hooks/AuthContext'
import { createPost } from '../../services/apiFetches'

export default function CreatePost() {
    const activeUser = useActiveUser();
    const history = useHistory();

    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [body, setBody] = useState('')
    const [image, setImage] = useState('')
    const [video, setVideo] = useState('')

    const handleSubmit = async e => {
        e.preventDefault();

        await createPost({ title, category, body, image, video }, activeUser.token)
        history.push('/')
    }

    return (
        <div>
            create post
            <form onSubmit={handleSubmit} >
                <input placeholder='title' onChange={e => setTitle(e.target.value)} />
                <input placeholder='category' style={{ display: 'block' }} onChange={e => setCategory(e.target.value)} />
                <textarea placeholder='text body' style={{ display: 'block' }} onChange={e => setBody(e.target.value)} />
                <input placeholder='image url - optional' style={{ display: 'block' }} onChange={e => setImage(e.target.value)} />
                <input placeholder='video url - optional' style={{ display: 'block' }} onChange={e => setVideo(e.target.value)} />
                <button>Submit</button>
            </form>
        </div>
    )
}
