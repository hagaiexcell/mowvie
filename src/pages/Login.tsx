import Button from "components/elements/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createGuestSession,
  createSessionLogin,
  getAccountDetail,
  getRequestToken,
  getSessionId,
} from "services/api";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const getRequestTokenResult = await getRequestToken();
      const createSessionLoginResult = await createSessionLogin(
        username,
        password,
        getRequestTokenResult,
      );

      const createSessionIdResult = await getSessionId(
        createSessionLoginResult,
      );
      const getAccountDetailResult = await getAccountDetail(
        createSessionIdResult,
      );

      localStorage.setItem("session_id", createSessionIdResult);
      localStorage.setItem("account_id", getAccountDetailResult.id);
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
      navigate(0);
    }
  };

  const handleGuestLogin = async () => {
    setGuestLoading(true);

    try {
      const createGuestSessionResult = await createGuestSession();
      localStorage.setItem("session_id", createGuestSessionResult);
      navigate("/");
    } catch (error) {
      setError("Something Went Wrong");
      console.error("Guest login failed", error);
    } finally {
      setGuestLoading(false);
    }
  };
  return (
    <section className="container">
      <div className="mx-auto mt-40 flex flex-col items-center justify-center sm:mt-20">
        <div className="w-full rounded-lg bg-primary shadow sm:max-w-xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h2>Welcome to Mowvie</h2>
            <form onSubmit={handleLogin} className="mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="block w-full rounded-lg border border-gray-600 bg-secondary p-2.5 text-sm text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full rounded-lg border border-gray-600 bg-secondary p-2.5 text-sm text-gray-600 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="******"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              {error && <p className="error">{error}</p>}
              <div className="flex justify-between gap-8 md:gap-16">
                <Button
                  variant="secondary"
                  classname="w-full"
                  onClick={handleGuestLogin}
                  type="button"
                  disabled={guestLoading || loading}
                >
                  {guestLoading ? "Logging in..." : "Login  As Guest"}
                </Button>
                <Button
                  variant="secondary"
                  classname="w-full"
                  disabled={loading || guestLoading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
