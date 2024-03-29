import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Quiz from "../Quiz/Quiz";

const CategoryDetailsQuiz = () => {
  const [wordData, setWordData] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    axios
      .get(`/API/keyword/${categoryName}`)
      .then((data) => {
        setWordData(data.data);
      })
      .catch((err) => console.log(err));
  }, [categoryName]);

  return (
    <div>{wordData.length ? <Quiz data={wordData} /> : <p>Loading...</p>}</div>
  );
};

export default CategoryDetailsQuiz;
