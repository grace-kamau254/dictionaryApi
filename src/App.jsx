 
 import {useEffect}from 'react'
 function App (){
  const {todoitems, setTodoitems} = useState([]);
    useEffect(() => {
 async function fetchData() {
   try
   {
     const response = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/hello');
     const data = await response.json();
     console.log(data);
   }
   catch (error) {
     console.error(error);
   }
 }
 fetchData();
}, []);

 
 }
return (
  <div>
    <h1>Grace Dictionary App</h1>
     
    }
  </div>
)
export default function App() 