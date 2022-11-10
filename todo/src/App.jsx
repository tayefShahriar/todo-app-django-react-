import React, {useEffect, useState} from 'react'
import Axios from 'axios'

const App = ()=>{
    const [todo, setTodo] = useState(null)
    const [data, setData] = useState('')
    const [reload, setReload] = useState(null)
    const [edit, setEdit] = useState(false)
    const [editid, setEditid] = useState(null)
    useEffect(()=>{
        const gettodo = async()=>{
            await Axios({
                method: "GET",
                url: "http://127.0.0.1:8000"
            }).then(response => {
                setTodo(response.data)
            })
        }
        gettodo()
    },[reload])
    const adddatatodo = async()=>{
        await Axios({
            method: "post",
            url: "http://127.0.0.1:8000",
            data: {
                'text': data
            }
        }).then(response=>{
            setReload(response.data)
            setData('')
        })
    }
    const deletetodo = async(id)=>{
        await Axios({
            method: "delete",
            url: `http://127.0.0.1:8000/${id}`
        }).then(response=>{
            setReload(response)
        })
    }
    const edittodo = async(id)=>{
        setEditid(id)
        await Axios({
            method: "get",
            url: `http://127.0.0.1:8000/${id}`
        }).then(response=>{
            setData(response.data['text'])
            setEdit(true)
        })
    }
    const updatetodo = async()=>{
        await Axios({
            method: 'put',
            url: `http://127.0.0.1:8000/${editid}/`,
            data:{
                'text': data
            }
        }).then(response=>{
            setReload(response.data)
            setData('')
            setEdit(false)
        })
    }
    return(
        <div>
        <div>
            <input onChange={(e) => setData(e.target.value)} value = {data} type = "text" />
            {
                edit?
                <button onClick={updatetodo}>Update Todo</button>
                :
                <button onClick={adddatatodo}>Add Todo</button>
            }
        </div>
            {
                todo !== null ? (
                    <div>
                    {
                        todo.map((d, i)=>(
                            <div key={i}>
                            <h4>{d.id}--{d.text}
                            <p>{d.date}</p>
                            </h4>
                            <button onClick={()=>edittodo(d.id)}>Edit</button>
                            <button onClick={()=>deletetodo(d.id)}>Delete</button>
                            </div>
                        ))
                    }
                    </div>
                ) : (<h1>no data</h1>)
            }
        </div>
     )
}
export default App