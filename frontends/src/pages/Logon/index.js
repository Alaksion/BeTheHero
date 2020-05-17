import React, {useState} from 'react'
import api from '../../services/api'
import './styles.css'
import '../../global.css'
import {Link, useHistory} from 'react-router-dom'
import heroes from '../../assets/heroes.png'
import logo from '../../assets/logo2x.png'
import {FiLogIn} from 'react-icons/fi'


export default function Logon (){
    const [id, setid] = useState("")
    const history = useHistory()
    
    async function handleLogin(e){
        e.preventDefault()

        try{
            const response = await api.post('session', {id})
            localStorage.setItem('ongid', id)
            localStorage.setItem('name', response.data.name)
            history.push("/profile")
        }
        catch(err){
            alert('Credenciais inválidas ' + err)
        }
    }

    return(
        <div className="logon-container">
            
            <section className="form">
                <img src={logo} alt=""></img>
                
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input  type="text" placeholder="Digite seu ID" 
                    onChange={(e)=>{setid(e.target.value)}}
                    value={id}> 
                    </input>

                    <button className="button" type="submit">Entrar</button>
                    {/*O componente Link do React Router Dom permite que a página não seja totalmente recarregada
                    ao trocar de rota, dessa forma só é necessário carregar o React uma vez
                    Isso é propriedade SPA (SINGLE PAGE APP) do React sendo  aplicada  */}
                    <Link className="backlink" to="/register"> <FiLogIn  size={16} color="#e0241e"/> Não tenho cadastro </Link>

                </form>
            </section>
            <img src={heroes} alt="a"></img>
       

        </div>
    )
}

