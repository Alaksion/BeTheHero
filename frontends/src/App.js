import React  from 'react';
import Routes from './routes'
import './global.css'

function App() {
  // useState retorna o array [valor, funcaoAtualizacaoDeValor
  // React é um framwork Imutavel, não é possível alterar valores variáveis diretamente
  // é sempre necessário utilizar uma função de Atualização para que na próxima renderezação  da tela
  // os valores sejam devidamente atualizados
  return (
    <Routes></Routes>
    

  );
}

export default App;
