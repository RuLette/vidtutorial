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
        await axios.get("/videotutorials").then((res) => {
          console.log(res.data, "result data");
          setvidData(res.data);
        });
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);
  // Inputs a teacher, gets all video tutorials by a teacher;
  function getTutorialsForTeacher(inputTeacher) {
    return vidData.filter(
      (tutorial) =>
        tutorial.teacherName.toLowerCase() === inputTeacher ||
        tutorial.teacherId === inputTeacher
    );
  }
  // Gets top 20 tutorials
  function getTopRatedTutorials() {
    vidData
      .sort(function (a, b) {
        return b.averageUserRating - a.averageUserRating;
      })
      .slice(0, 20);
  }
  // Inputs a collection of tags, outputs the top 20 rated
  function getTopRatedTutorialsForTags(inputTags) {
    const hasTags = vidData.filter((tutorial) =>
      tutorial.tags.includes(inputTags)
    );
    hasTags
      .sort(function (a, b) {
        return b.averageUserRating - a.averageUserRating;
      })
      .slice(0, 20);
  }
  // Inputs a string, entered by the user, outputs a collection of tutorials relevant to string
  function searchForTutorials(inputString) {
    function filterByValue(array, value) {
      return array.filter(
        (data) =>
          JSON.stringify(data).toLowerCase().indexOf(value.toLowerCase()) !== -1
      );
    }
    return filterByValue(vidData, inputString);
  }
  return (
    <Fragment>
      <h1>Vid Tutorials</h1>
      {isError && <div>Sorry, there has been an error on this app ...</div>}
      {isLoading ? (
        <div>Loading, please wait ...</div>
      ) : (
        <ul>
          <li>
            {JSON.stringify(
              getTutorialsForTeacher("5a48d52f-7559-4540-bb6c-97aade16e31d")
            )}
          </li>
          {/* <a href onClick={searchForTutorials("test")}>
            Test
          </a> */}

          {/* {getTutorialsForTeacher("Katy").map((item) => (
            <li key={item.id}>
              <ul>content</ul>
            </li>
          ))} */}
        </ul>
      )}
    </Fragment>
  );
}
export default App;
