import { useEffect, useState } from 'react'
import React from 'react'
import Data from './Data'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


function Home() {
    const [todos,setTodos] = useState([])
    useEffect(()=>{
      axios.get('http://localhost:3001/get')
      .then(result=>setTodos(result.data))
      .catch(err=>console.log(err))
    },[])

   const handleDelete =(id)=>{
    axios.delete(`http://localhost:3001/delete/${id}`)
    .then(result=>{
      setTodos(todos.filter(todo => todo._id !== id));
    })
    .catch(err=>console.log(err))
   }

  return (
    <div>
    {todos.map((todo) => (
        <div key={todo._id} className="Item">
          <h3>{todo.task}</h3>
          <span onClick={() => handleDelete(todo._id)}>
            <FontAwesomeIcon icon={faTrash} className="trash" />
          </span>
        </div>
      ))}
      </div>
    )
}

export default Home