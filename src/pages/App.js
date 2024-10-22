
import { useState } from 'react';
import gitLogo from '../assets/github.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { api } from '../services/api';
import { Container } from './styles';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);


  const handleSearchRepo = async () => {
    try {
      const { data } = await api.get(`repos/${currentRepo}`);
  
      if (data.id) {
        const isExist = repos.find(repo => repo.id === data.id);
  
        if (!isExist) {
          setRepos(prev => [...prev, data]);
          setCurrentRepo('');
          return;
        }
      }
      alert('Este repositório já foi adicionado à sua lista');
    } catch (error) {
      console.error('Erro ao buscar repositório:', error);
      alert('Erro ao buscar repositório. Verifique se o nome está correto.');
    }
  };

  const handleRemoveRepo = (id) => {
    
    const updateRepo = repos.filter(repo => repo.id !== id);
    setRepos(updateRepo);
  }


  return (
    <Container>
      <img src={gitLogo} width={72} height={72} alt="github logo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)} 
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearchRepo();
          }
      }} />
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => (<ItemRepo key={repo.id} handleRemoveRepo={handleRemoveRepo} repo={repo}/>))}
    </Container>
  );
}

export default App;
