// /pages/api/test-db.js
import supabase from "../../config/supaBaseClient";
import { useEffect, useState } from "react";

const TestDB = () => {
  const [fetchError, setFetchError] = useState(null);
  const [tests, setTest] = useState(null);

  useEffect(() =>{
    const fetchTest = async () =>{
      const {data, error} = await supabase
        .from('test')
        .select() //leave blank to get all data
        if(error){
          setFetchError("Could not fetch test");
          setTest(null);
          console.log(error)
        }
        if(data){
          console.log("Fetched data:", data); // Muestra los datos en la consola
          setTest(data)
          setFetchError(null)
        }
    }
    fetchTest()

  }, [])

  return (
    <div className="test page">
      {fetchError && <p>{fetchError}</p>}
      {tests && (
        <div className="test">
          {tests.map(test =>(
            <p>{test.name}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default TestDB
