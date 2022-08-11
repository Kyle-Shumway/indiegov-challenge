import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import ConstituentTable from './ConstituentTable';
const mockData = [{
  FirstName: 'John',
  LastName: 'Doe',
  Email: 'jdoe@test.com',
  ZipCode: '12345'
}];

function App() {
  const [ constituentData, setConstituentData ] = useState([]);
  useEffect(() => {
    async function init() {
      // const res = await axios.get('http://localhost:3030/constituent-data');
      // setConstituentData(res.data);
      setConstituentData(mockData);
    }

    init();
  })
  return (
    <div className="App">
      <div style={{padding: '4rem'}}>
      <ConstituentTable headers={['First Name', 'Last Name', 'Email', 'Zip Code']} rows={constituentData}/>
      </div>   
    </div>
  );
}

export default App;
