import JokeList from "../components/jokes/JokeList";
import { getJokes } from "../components/utils/firebase-api";
import { useEffect } from "react";
import Loader from "../components/UI/Loader";
import NoJokesFound from "../components/jokes/NoJokesFound";
import useHttp from "../components/hooks/use-http";

// const DUMYY_JOKES = [
//   {
//     id: "j1",
//     topic: "Programming",
//     text: `How many programmers does it take to change a light buld? None- It's a hardware problem`,
//   },
//   {
//     id: "j2",
//     topic: "General",
//     text: `How many bones are in the human hand?
//     A handful of them.`,
//   },
// ];

export default function Jokes() {
  const {
    sendHttpRequest,
    status,
    data: loadedJokes,
    error,
  } = useHttp(getJokes, true);

  useEffect(() => {
    sendHttpRequest();
  }, [sendHttpRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedJokes || loadedJokes.length === 0)) {
    return <NoJokesFound />;
  }

  return <JokeList jokes={loadedJokes} />;
}
