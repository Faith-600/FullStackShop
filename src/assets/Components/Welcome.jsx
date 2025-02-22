import { useState,useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { UserContext,PostsContext } from '../../App';


function Welcome() {
  const [newPost, setNewPost] = useState('');
  const [edit,setEdit] = useState(null);
  const [editContent,setEditContent] = useState('')
  const navigate = useNavigate();
 const { username } = useContext(UserContext);
 const { posts, setPosts } = useContext(PostsContext);
 const [errorMessage, setErrorMessage] = useState("");
 const [avatarUrl, setAvatarUrl] = useState('');

 

axios.defaults.withCredentials = true;





const fetchItems = async () =>{
  try{
    const response = await axios.get('https://full-stack-shop-backend.vercel.app/posts');
    console.log(response.data);
    // console.log(username)
  
  // if (!Array.isArray(response.data)) {
  //   console.error("Error: Expected an array but got:", response.data);
  //   return;
  // }

  setPosts(response.data)
  
}
  catch(error){
     console.error('Error fetching posts:', error);
  }
};


useEffect(() => {
  
    fetchItems()
  },[]);


const handleSubmit = (e) => {
  e.preventDefault();
  setErrorMessage("");

  if (!newPost.trim()) {
    console.error('Post content is empty.');
    return;
  }
  if (!username || username.toLowerCase() === 'guest') {
    setErrorMessage("You must be logged in to create a post. But you can check out other posts!");
      return;
  }
  
  axios
    .post('https://full-stack-shop-backend.vercel.app/posts', { content: newPost, username })
    .then((response) => {
      console.log(response.data);
      let {content,username,created_at,_id}  =  response.data
      setPosts((prevPosts) => [...prevPosts, {content,username,created_at,_id}]); // Add the new post
      setNewPost(''); // Clear the input
      fetchItems()
     
    })
    .catch((error) => {
      console.error('Error creating post:', error.response?.data || error.message);
    });
};

const handleEdit = (_id, content) => {
  setEdit(_id);
  setEditContent(content);
};

const handleUpdate = (_id) => {
  axios
    .put(`https://full-stack-shop-backend.vercel.app/posts/${_id}`, { content: editContent })
    .then((response) => {
      console.log("Update Response:", response.data);
      if (response.data) {
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p._id === _id ? { ...p, content:response.data.content  } : p
          )
        );
        setEdit(null);
        setEditContent('');
      } else {
        console.error('Failed to update post:', response.data.error);
      }
    })
    .catch((err) => console.error('Error updating post:', err));
};

const handleDelete = (_id) => {
  axios
    .delete(`https://full-stack-shop-backend.vercel.app/posts/${_id}`)
    .then((res) => {
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== _id));
    })
    .catch((err) => {
      console.error('Error deleting post:', err);
    });
};
// Loading The Picture
useEffect(() => {
  if (username) {
    const url = `https://robohash.org/${username}`;
    setAvatarUrl(url);
  }
}, [username]);

  return (
  
    <div className="bg-white">
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
       <div className="max-w-2xl mx-auto" style={{ marginTop: '200px' }}>
      <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">
        Your message
      </label>
      <textarea
        id="message"
        rows="4"
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="What is on your mind ?..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
     
      ></textarea>
      <button
      type='button'
        onClick={handleSubmit}
       
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Post
      </button>
      {errorMessage && (
            <p className="mt-2 text-red-500">{errorMessage}</p>
          )}
      </div>
      <div>
      <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 " />
        <div className="absolute inset-y-0 right-1/2 -z-10 " />
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <img
            alt=""
            src="https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996"
            className="mx-auto h-12"
          />
          <figure className="mt-10">
            <blockquote>
              <div>
                 <ul>
           {posts &&
            posts.filter((p)=>p.username === username)
           .map((p) => (
            <li key={p._id} className='tweets'>
              {p._id === edit?(
                <>
                <textarea type ='text'
                 className="w-full p-2 border rounded"
                value={editContent}
                onChange={(e)=>setEditContent(e.target.value)} 
                rows='4'
                />
                <button onClick={()=>handleUpdate(p._id)}
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
                    Save
                  </button>
                </>
              ):(
                <>
            <ul>
            <li key={p._id} className="bg-white p-6 rounded-lg shadow-lg mb-6">
         <p className="pcontent">{p.content}</p>
        <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
         <div className="mr-4">
            <img
              src={avatarUrl}
              alt="user Avatar"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-lg">{p.username}</p>
            <p className="text-sm text-gray-500">{new Date(p.createdAt).toLocaleString()}</p>
          </div>
        </div>
         <div>
          <FontAwesomeIcon
            icon={faPenToSquare}
            className="cursor-pointer mr-4 text-blue-500"
            onClick={() => handleEdit(p._id, p.content)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(p._id)}
          />
        </div>
      </div>
  </li>
  </ul>
   </>
              )}
           </li>
            ))}
           </ul>
           
              </div>
            </blockquote>
           </figure>
        </div>
      </section>
        </div>
         </div>
         
  </div>
)
}

  


export default Welcome
 

 
