import React, { useState } from 'react'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import logo from '../../assets/logo2x.png'
import {Link, useHistory} from 'react-router-dom'
import api from '../../services/api'


export default function NewIncident(){
    const ong_id = localStorage.getItem('ongid')
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [value, setValue] = useState()
    const history = useHistory()

    async function handleCreate(e){
        e.preventDefault()
        const data = {
            title:title,
            description:description,
            value:value,
        }
        await api.post('/incidents', data, {
            headers:{
                authorization: ong_id
            }
        }).then(()=>{
            alert("Caso Criado com sucesso")
            history.push("/profile")

            
        }).catch((err)=>{
            alert("Ocorreu um erro ao criar caso, tenta novamente mais tarde")
        })

    }

    return (
        <div className="newIncident-container">
            <div  className="content">
                <section>
                    <img src={logo} alt="Be the hero"></img>

                    <h1>Cadastrar novo Caso</h1>
                    <p>Faça seu  cadastro e publique os casos de sua Ong</p>
                    <Link to="/profile" className="backlink"> <FiArrowLeft  size={16} color="#e0241e"/> Voltar para home </Link>

                </section>

                <form onSubmit={handleCreate}>
                    <input type="text" 
                    placeholder="Título do caso" 
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)} >
                    </input>

                    <textarea type="text" 
                    placeholder="Descrição" 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)} >
                     > 
                    </textarea>

                    <input type="currency" 
                    placeholder="Valor a ser arrecadado"
                    value= {value} 
                    onChange={(e)=> setValue(e.target.value)} 
                    ></input>

                    <button type="submit" className="button">Cadastrar</button>

                    
                </form>
            </div>

        </div>
    )
}