export const  CreateComment =async(text,parentId )=>{
    return {
        id:Math.random().toString(36).substring(2,9),
        content:text,
        postId: parentId,
        createdAt:new Date().toISOString(),
        reviewerPicture: 'https://randomuser.me/api/portraits/men/1.jpg',
        username:"Faith",
    }
}