import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Firebase
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../auth/firebase";

import { capitaliseFirstLetter } from "../../helperFunctions";

import ProgressBar from "../progressBar/ProgressBar";

import classes from "./Category.module.css";

const Category = ({ categoryInfo }) => {
  const [user] = useAuthState(auth);
  const [wordData, setWordData] = useState([]);

  const endpoint = categoryInfo.name;

  useEffect(() => {
    axios.get(`/API/keyword/${endpoint}`).then((data) => {
      setWordData(data.data);
    });
  }, [endpoint]);

  return (
    <div
      className={`${classes.category_container} ${
        categoryInfo.sub ? classes.sub : ""
      }`}
    >
      {categoryInfo.sub && <div className={classes.empty}></div>}
      <div className={classes.category}>
        <div className={classes.category_name}>
          <Link to={`/${categoryInfo.name}/flipcards`}>
            <h3>{capitaliseFirstLetter(categoryInfo.name)}</h3>
          </Link>
        </div>
        <div className={classes.number_of_words}>
          <p>{wordData.length} words</p>
        </div>
        {user && (
          <div>
            <p></p>
          </div>
        )}
        <div className={classes.difficulty}>
          <ProgressBar difficulty="easy" />
        </div>
      </div>
    </div>
  );
};

export default Category;
