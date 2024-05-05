import Header from "./layout/Header"
import Content from "./layout/Content"
import Footer from "./layout/Footer"
import "./app.css"
import { useEffect, useState } from 'react';
import { FaLinkedin } from "react-icons/fa";
import yaes from './assets/yaes.jpg';
import dawg from './assets/dawg.jpeg';

function AboutUsPanel({show}){
  let position = "-10px"
  let fade = "opacity(0%) blur(30px)"
  if (show){
    position = "10px"
    fade = "opacity(100%) blur(0px)"
  }else{
    position = "-41vw"
    fade = "opacity(0%) blur(30px)"
  }
  return(
    <div className='about-us-panel' style={{right: position, filter: fade}}>
        <div className='profiles'>
            <div className='profile-section'>
                <img src={yaes} alt="Yaeswant Urumaiya" />
                <h3>Yaeshwanth Urumaiya</h3>
                <p> <FaLinkedin /> <a href="https://www.linkedin.com/in/yaeshwanth-urumaiya/" target="_blank">Linkedin</a> </p>
            </div>
            <div className='profile-section'>
                <img src={dawg} alt="Frenlie Tjandra Yuliswan" />
                <h3>Frenlie Tjandra Yuliswan</h3>
                <p> <FaLinkedin /> <a href="https://www.linkedin.com/in/frenlie-tjandra-yuliswan" target="_blank">Linkedin</a> </p>
            </div>
        </div>
        <div className='credits'>
            <div>Stock data from yahoo! finance</div>
        </div>
    </div>
  )
}

function App() {
  const [stockAlias,setStockAlias] = useState('');
  const [stockData,setStockData] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [isStockExist,setIsStockExist] = useState(false);
  const [timeDuringFetch,setTimeDuringFetch] = useState('');
  const [effectTrigger,setEffectTrigger] = useState(0);
  const [errorFetchingData,setErrorFetchingData] = useState(false);
  const [show,setShow] = useState(false);

  function toggleShow(){
    if (show) {
      setShow(false)
    }else{
      setShow(true)
    }
  }

  function dummyFunction(a){
    setStockAlias(a);
    console.log(a);
    setEffectTrigger(effectTrigger+1);
  }

  async function fetchData(){
    const apiURL = `${import.meta.env.VITE_API_URL}StockDetails`;
    const fetchOptions = {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({key:stockAlias})
    }
    try{
      setErrorFetchingData(false);
      setIsStockExist(false);
      setTimeDuringFetch(`${new Date().getHours()}:${new Date().getMinutes()}`)
      setIsLoading(true);
      console.log(`[server] fetching data for ${stockAlias}..`)
      const response = await fetch(apiURL,fetchOptions);
      if(!response.ok){
        throw new Error(`Network not ok when fetching ${stockAlias}`);
      }
      const result = await response.json();
      setStockData(result);
      setIsStockExist(true);
      console.log(result);
    }
    catch(error){
      console.error("Error: ",error);
      setIsStockExist(false);
      setErrorFetchingData(true);
    }
    finally{
      setIsLoading(false)
    }
  }

  useEffect(()=>{
    if(effectTrigger > 0){
      fetchData()
    }
  },[effectTrigger]);

  return(
    <div className="app">
      <img src="https://proxy.notsobot.com/google-images?url=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F053bc983-4e4f-474f-bb0e-687f077d7067%2Fdg1vwtt-320b4c53-2683-41d0-b78f-5845c52be3bb.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JjOTgzLTRlNGYtNDc0Zi1iYjBlLTY4N2YwNzdkNzA2N1wvZGcxdnd0dC0zMjBiNGM1My0yNjgzLTQxZDAtYjc4Zi01ODQ1YzUyYmUzYmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aCzZz6Qe-z6_y9ZuD_wBtGZQiW2GN0b0S_Wt3f3eFxM&backup=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRBk_FnSnKdpWc_Qds1BpWMItoT6Jrt5C6Ro8FV_0-dNsFInGUFvUyg05gh0QWlxiw0vQ4%26usqp%3DCAU" alt="" />
      <Header stockAlias={dummyFunction} show={toggleShow}></Header>
      <AboutUsPanel show={show}/>
      <Content stockData={stockData} isStockExist={isStockExist} timeDuringFetch={timeDuringFetch} isLoading={isLoading} errorFetchingData={errorFetchingData} effectTrigger={effectTrigger}></Content>
      <Footer></Footer>
    </div>
  )
}

export default App
