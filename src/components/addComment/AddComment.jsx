import React from 'react'
import './AddComment.css'

export default function AddComment({ handleCommentSubmit, setCommentTitle, setCommentBody, commentTitle, commentBody }) {
    return (
        <div className='form-box' >
            <div className='comment-form-area' >
                <form className="comment-form" onSubmit={handleCommentSubmit} >

                    <input
                        onChange={e => setCommentTitle(e.target.value)}
                        value={commentTitle}
                        placeholder='comment title'
                    />

                    <textarea
                        onChange={e => setCommentBody(e.target.value)}
                        value={commentBody}
                        placeholder='comment body'
                    />

                    <button>submit comment</button>
                </form>
            </div>
        </div>
    )
}
