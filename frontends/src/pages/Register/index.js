import  React, {useState} from 'react'
import logo from '../../assets/logo2x.png'
import {Link, useHistory} from 'react-router-dom'
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css'
import api from '../../services/api'


export default function Register(){
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [whatsapp, setwhastapp] = useState("")
    const [city, setcity] = useState("")
    const [uf, setuf] = useState("")

    const history = useHistory()

    async function handleRegister(e){
        e.preventDefault()
        const data = {
            name:name,
            email:email,
            whatsapp:whatsapp,
            city:city,
            uf:uf
        }
        try {
            const response = await api.post('ongs', data)
            console.log(response)
            alert(`Seu id de acesso é ${response.data.id}`)
            history.push("/")
        }
        catch(err){
            console.log(err)
        }

        
    }

    return (
        <div className="register-container">
            <div  className="content">
                <section>
                    <img src={logo} alt="Be the hero"></img>

                    <h1>Cadastro</h1>
                    <p>Faça seu  cadastro e publique os casos de sua Ong</p>
                    <Link to="/" className="backlink"> <FiArrowLeft  size={16} color="#e0241e"/> Não tenho Cadastro </Link>

                </section>

                <form onSubmit={handleRegister}> 
                    <input type="text" placeholder="Nome da ONG" 
                        onChange={(e)=> setName(e.target.value)} 
                        value={name} 
                        maxLength={60}>  
                    </input>

                    <input type="email" placeholder="Email" 
                        onChange={(e)=> setemail(e.target.value)} 
                        value={email}
                        maxLength={60}>
                    </input>

                    <input type="phone" placeholder="Whatsapp" 
                        onChange={(e)=> setwhastapp(e.target.value)} 
                        value={whatsapp}
                        maxLength={15}>

                    </input>

                    <div className="input-group">
                        <input placeholder="Cidade" 
                            onChange={(e)=> setcity(e.target.value)}
                            value={city}
                            maxLength={40}  >
                        </input>

                        <input placeholder="UF" style={{ width:80}} 
                            onChange={(e)=> setuf(e.target.value)}
                            value={uf}
                            maxLength={2} >
                            

                        </input>
                    </div>

                    <button type="submit" className="button">Cadastrar</button>

                    
                </form>
            </div>

        </div>
    )

}