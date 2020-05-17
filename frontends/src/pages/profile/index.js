import React, {useEffect, useState} from 'react'
import logo from '../../assets/logo2x.png'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2}  from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'


export default  function Profile(){
    const ong_name = localStorage.getItem('name')
    const [incidents, setIncidents] = useState([])
    const history = useHistory()

    async function HandleLogout(){
        localStorage.clear()
        history.push("/")

    }

    async function HandledeleteCase(id){
        try {
            await api.delete('incidents/'+id, {
                headers:{
                    Authorization:localStorage.getItem('ongid')
                }
            })
            setIncidents(incidents.filter(incident => incident.id !== id))
            alert('Caso excluído com sucesso')
        }
        catch{
            alert('Houve um erro ao deletar caso, tentar novamente mais tarde')
        }
    }

    useEffect(()=>{
        api.get('profile', {
            headers:{
                Authorization: localStorage.getItem('ongid')
            }
        }).then((res)=>{
            setIncidents(res.data)

        })
    }, [localStorage.getItem('ongid')])

    return (
        <div className="profile-container">
            <header>

                <img  src={logo}  alt="be the hero"></img>
                <span>Bem vindo {ong_name}</span>
                <Link className="button" to="incidents/new">Cadastrar novo Caso</Link>
                <button onClick={() => HandleLogout()} type="button">
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map(incident => {
                   return (
                        <li key={incident.id}>
                            <strong>Caso: </strong>
                            <p>{incident.title}</p>

                            <strong>Descrição</strong>
                            <p>{incident.description}</p>

                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(incident.value)}</p>

                            <button onClick={() => HandledeleteCase(incident.id)} type="button"><FiTrash2  size={20} color="#A8A8B3" /> </button>
                    </li>
                   )
               })}
            </ul>
        </div>

    )
}