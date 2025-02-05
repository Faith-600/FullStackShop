import React, { useContext, useState, useEffect } from 'react';
import { PostsContext,UserContext } from '../../App';
import Comment from './Comment';
import CommentForm from './CommentForm';


function Chats() {
    const { posts } = useContext(PostsContext);
     const { username } = useContext(UserContext);
    const [comments, setComments] = useState([]);

   
 // Fetch comments for each post
    // const fetchComments = async (postId) => {
    //     try {
    //         const response = await fetch(`https://full-stack-shop-backend.vercel.app/api/posts/${postId}/comments`);
    //         const data = await response.json();
    
    //         setComments((prevComments) => {
    //             const newComments = data.filter(
    //                 (newComment) =>
    //                     !prevComments.some(
    //                         (existingComment) =>
    //                             existingComment.id === newComment.id && existingComment.postId === newComment.postId
    //                     )
    //             );
    //             return [...prevComments, ...newComments];
    //         });
    //     } catch (error) {
    //         console.error('Error fetching comments:', error);
    //     }
    // };
    

    useEffect(() => {
        if (posts.length > 0) {
            posts.forEach(post => {
                console.log(post.id)
                const postId = post._id;
            if (!postId) {
                console.error('Invalid postId:', post);
                return;
            }
                // Check if comments for this post have already been fetched
                const commentsForPost = comments.filter(comment => comment.postId === postId);
                if (commentsForPost.length === 0) {
                    fetchComments(postId); // Fetch only if no comments exist
                }
            });
        }
    }, [posts]);
    



    // Add comment function
    const addComment = async (text, postId,parentId=null) => {
        if (!text || !postId) 
            console.error('Missing text or postId');
        return;
           
    
        try {
            const response = await fetch(`https://full-stack-shop-backend.vercel.app/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, username,parentId }),
            });
    
            if (!response.ok) throw new Error('Failed to save comment');
    
            const newComment = await response.json();
    
            setComments((prevComments) => [...prevComments, { ...newComment, username, postId }]);

        } catch (err) {
            console.error('Failed to create comment:', err);
        }
    };
        
    // Render posts and comments
    const renderPosts = () => {
        if (!Array.isArray(posts) || posts.length === 0) return <p>No posts available</p>;

        return posts.map((post) => (
            <li key={`post-${post._id}`} className="tweet">
                <div className="flex mb-6">
                    <img src={`https://robohash.org/${post.username}`} alt="User Avatar" className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                        <p className="font-semibold text-lg">{post.username}</p>
                        <p>{post.content}</p>
                    </div>
                </div>
                <CommentForm submitLabel="Reply" handleSubmit={(text) => addComment(text, post._id)} />
                
                {comments.filter(comment => comment.postId === post._id).map(comment => {
                    const commentAvatarUrl = `https://robohash.org/${comment.username}`;

    
     return (
        <Comment
          key={comment._id}
            comment={comment}
            replies={[]}
            addReply={(text) => addComment(content, comment._id)}
           avatarUrl = {commentAvatarUrl}
        />
    );
})}
            </li>
        ));
    };

    return (
        <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="absolute inset-0 -z-10" />
            <div className="mx-auto max-w-2xl lg:max-w-4xl">
                <figure className="mt-10">
                    <ul>{renderPosts()}</ul>
                </figure>
            </div>
        </section>
    );
}

export default Chats;

