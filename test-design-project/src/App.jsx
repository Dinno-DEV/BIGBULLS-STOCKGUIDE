import Header from "./layout/Header"
import Content from "./layout/Content"
import Footer from "./layout/Footer"
import "./app.css"
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    async function fetchData() {
      console.log(import.meta.env.VITE_API_URL);
      setIsLoading(true); // Set loading to true when fetch starts
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}StockDetails`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: 'TSLA', // This is where you need to send the name of the stock. 
          }),
        });
        if (!response.ok) {
          throw new Error("Network not ok");
        }
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false); // Set loading to false when fetch is complete
      }
    }
    fetchData();
  }, []);

  return(
    <div className="app">
      <img src="https://proxy.notsobot.com/google-images?url=https%3A%2F%2Fimages-wixmp-ed30a86b8c4ca887773594c2.wixmp.com%2Ff%2F053bc983-4e4f-474f-bb0e-687f077d7067%2Fdg1vwtt-320b4c53-2683-41d0-b78f-5845c52be3bb.jpg%3Ftoken%3DeyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzA1M2JjOTgzLTRlNGYtNDc0Zi1iYjBlLTY4N2YwNzdkNzA2N1wvZGcxdnd0dC0zMjBiNGM1My0yNjgzLTQxZDAtYjc4Zi01ODQ1YzUyYmUzYmIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.aCzZz6Qe-z6_y9ZuD_wBtGZQiW2GN0b0S_Wt3f3eFxM&backup=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRBk_FnSnKdpWc_Qds1BpWMItoT6Jrt5C6Ro8FV_0-dNsFInGUFvUyg05gh0QWlxiw0vQ4%26usqp%3DCAU" alt="" />
      <>
      {isLoading ? (
        <div>Loading...</div> // Display loading message while data is being fetched
      ) : (
        data && (
          <div>
            <h3>{data.StockName}</h3>
          </div>
        )
      )}
      </>
      <Header></Header>
      <Content></Content>
      <Footer></Footer>
    </div>
  )
}

export default App
