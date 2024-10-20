import ErrorLayout from "components/layouts/ErrorLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSessionId } from "services/api";

const CallbackPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestToken = params.get("request_token");
    const approved = params.get("approved");

    let subscribed = true;

    if (approved === "true" && requestToken) {
      getSessionId(requestToken)
        .then((sessionId) => {
          if (subscribed) {
            localStorage.setItem("session_id", sessionId);
            navigate("/");
          }
        })
        .catch((error) => {
          setError(true);
        });
    }

    return () => {
      subscribed = false;
    };
  }, [navigate]);

  return (
    <>
      {error ? (
        <ErrorLayout />
      ) : (
        <div>
          <h1>Processing...</h1>
          <p>Redirecting you to the main page...</p>
        </div>
      )}
    </>
  );
};

export default CallbackPage;
