import React from "react";

function App(){
    const title = "My App"
    const body = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae, neque!"
    const comments = [
        {id: 1, title: "comment 1"},
        {id: 2, title: "comment 2"},
        {id: 3, title: "comment 3"}
    ]

    const loading = false
    if(loading) return <h1>Loading...</h1>

    const showComments = false
    const commentBlock = (<div className="comments">
    <h2>Comments({comments.length})</h2>
    <ul>
        {comments.map((comment)=>(
            <li key={comment.id}>{comment.title}</li>
        ))}
    </ul>
</div>)

    return(
        <div className="container">
            <h1>{title}</h1>
            <p>{body}</p>

            {showComments ? commentBlock : "No comment"}
            {showComments && commentBlock}
            
        </div>
    )
}
export default App;