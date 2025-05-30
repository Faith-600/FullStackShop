import React, { useContext, useState, useEffect } from 'react';
import { PostsContext, UserContext } from '../../App';
import Comment from './Comment';
import CommentForm from './CommentForm';

function Chats() {
    const { posts } = useContext(PostsContext);
    const { username } = useContext(UserContext);
    const [comments, setComments] = useState({});

    // Fetch comments for each post
    const fetchComments = async (postId) => {
        console.log(`Fetching comments for postId: ${postId}`); // Log the postId
        try {
            const response = await fetch(`https://full-stack-shop-backend.vercel.app/api/posts/${postId}/comments`);
            console.log('Response status:', response.status); // Log the response status
            if (!response.ok) throw new Error('Failed to fetch comments');
            const data = await response.json();
            console.log('Fetched comments:', data); // Log the fetched data
            setComments((prevComments) => ({ ...prevComments, [postId]: data }));
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        posts.forEach((post) => {
            fetchComments(post._id);
        });
    }, [posts]);

    // Add comment function
    const addComment = async (text, postId, parentId = null) => {
        if (!text || !postId) {
            console.error('Missing text or postId');
            return;
        }

        try {
            const response = await fetch(`https://full-stack-shop-backend.vercel.app/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: text, username, parentId }),
            });

            if (!response.ok) throw new Error('Failed to save comment');

            const newComment = await response.json();
            console.log('Comment added successfully:', newComment); // Log the new comment

            setComments((prevComments) => ({
                ...prevComments,
                [postId]: [...(prevComments[postId] || []), newComment],
            }));
        } catch (err) {
            console.error('Failed to create comment:', err);
        }
    };

    // Render posts and comments
    const renderPosts = () => {
        if (!posts || posts.length === 0) return <p>No posts available</p>;

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

                {comments[post._id]?.map((comment) => {
                    const commentAvatarUrl = `https://robohash.org/${comment.username}`;
                    return (
                        <Comment
                            key={comment._id}
                            comment={comment}
                            replies={[]}
                            addReply={(text) => addComment(text, post._id, comment._id)}
                            avatarUrl={commentAvatarUrl}
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