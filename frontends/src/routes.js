import React from 'react'
import {BrowserRouter, Route, Switch }  from 'react-router-dom'
import Logon from './pages/Logon'
import Register from './pages/Register'
import Profile from './pages/profile'
import NewIncident from './pages/NewIncident'

//Switch  impede que  mais de uma rota seja carregada por vez
//O react não prevê as rotas sendo exatamente iguais ao URL, ele sempre irá buscar pelo  primeiro caracter
//Para evitar conflitos a propriedade exact na rota "/" faz com que só seja possível acessar a rota principal se a url for exatamente "/"
//Se isso não for feito independete do que tiver escrito na url será sempre carregada a rota "/"

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={NewIncident}></Route>
            </Switch>
        </BrowserRouter>
    )
}
