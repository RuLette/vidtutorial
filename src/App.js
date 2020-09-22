import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({ hits: [] });
  const [vidData, setvidData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios.get("/videotutorials").then((res) => {
        console.log(res);
        setData(res.data);
        setIsLoading(false);
      });
    };
    fetchData();
  }, [vidData]);

  return (
    <Fragment>
      <h1>Vid Tutorials</h1>
      {/* {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.vidData}>{item.title}</a>
            </li>
          ))}
        </ul>
      )} */}
    </Fragment>
  );
}

export default App;
