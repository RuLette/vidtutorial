import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [vidData, setvidData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await axios.get("/videotutorials").then((res) => {
          console.log(res, "result");
          setvidData(res.data);
        });
      } catch (error) {
        console.log(error, "error");
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Fragment>
      <h1>Vid Tutorials</h1>
      {isError && <div>Sorry, there has been an error on this app ...</div>}
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {/* <p>H{JSON.stringify(vidData)}</p> */}

          {vidData.map((item) => (
            <li key={item.id}>
              <a href={item.vidData}>{item.teacherName}</a>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
}

export default App;
