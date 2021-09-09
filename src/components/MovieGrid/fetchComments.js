import { useEffect, useState } from "react";
import axios from "axios";

function FetchComments(movies, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [comments, setComments] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setErr(false);
    if (movies._id) {
      axios
        .get(`/award/audienceComments?id=${movies._id}&page=${pageNumber}`)
        .then((res) => {
          setComments((prevComments) => [...prevComments, ...res.data.payload]);
          setHasMore(res.data.payload.length > 0);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setErr(true);
        });
    }
  }, [movies, pageNumber]);

  return { loading, hasMore, err, comments };
}

export default FetchComments;
