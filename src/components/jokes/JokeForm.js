import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import Loader from "../UI/Loader";
import styles from "./JokeForm.module.css";

const JokeForm = (props) => {
  const [isFormFocused, setisFormFocused] = useState(false);
  const topicInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredTopic = topicInputRef.current.value;
    const enteredText = textInputRef.current.value;

    props.onAddJoke({ topic: enteredTopic, text: enteredText });
  }

  const formFocesHandler = () => {
    setisFormFocused(true);
  };

  const sendDataHandler = () => {
    setisFormFocused(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isFormFocused}
        message={(location) =>
          "Do you really want to leavy  this page? If so, you will lost all data in the from!"
        }
      />
      <Card>
        <form
          onFocus={formFocesHandler}
          className={styles.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={styles.loading}>
              <Loader />
            </div>
          )}

          <div className={styles.control}>
            <label htmlFor="topic">Topic</label>
            <input type="text" id="topic" ref={topicInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={styles.actions}>
            <button className="btn" onClick={sendDataHandler}>
              Add Joke
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default JokeForm;
