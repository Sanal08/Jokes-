import JokeForm from "../components/jokes/JokeForm";
import { useHistory } from "react-router-dom";
import useHttp from "../components/hooks/use-http";
import { addJoke } from "../components/utils/firebase-api";
import { useEffect } from "react";

export default function AddJoke() {
  const history = useHistory();

  const { sendHttpRequest, status } = useHttp(addJoke);

  useEffect(() => {
    if (status === "completed") {
      history.push("/joke-list");
    }
  }, [status, history]);

  const addJokeHandler = (jokeData) => {
    sendHttpRequest(jokeData);
  };

  return (
    <JokeForm isLoading={status === "pending"} onAddJoke={addJokeHandler} />
  );
}
