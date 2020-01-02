// useState

import {useState,useEffect } from 'react'

const UseStateExample=()=>{
  const [name,setName]=useState('Sai')
  const [place,setPlace]=useState('India')

  return(
    <Card>
    <h1>
    {name}
    </h1>
    <button onClick={()=>setName('Ashish')}>
toggle
    </button>
    <button onClick={()=>setPlace('Delhi')}>
Place
    </button>
    </Card>
  )
}


// useEffect

const UseEffectExample=()=>{
  const [user,setUser]=useState(null)
  const [query,search]=useState('India')

//called whenver component changes ,update lifecycle method
useEffect(()=>{
  if(query.length>0){
console.log('hello');

const fetchFunc =async () =>{
  const response=await fetch(`https://jsonplaceholder.typicode.com/users?username=${searchQuery}`)
  const resJson=await response.json()
  setUser(resJson[0])
}
// whenever data comes in effects are applied

fetchFunc()
  }
},[search])
// [user]

  return(
    <Card>
  <input
type='search'
value={searchQuery}
onChange={e => search(e.target.value)}
  />
  {
    user?(
    <div>
{user.name}
    </div>):(
      <p>
No User Found
      </p>
    )
  }
    </Card>
  )
}
