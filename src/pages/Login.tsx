import Button from "components/elements/Button";
import { getRequestToken } from "services/api";

export default function Login() {
  const handleLogin = async () => {
    console.log("hi")
    try {
      const requestToken = await getRequestToken();
      const redirectUrl = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=http://localhost:3000/callback-page`;
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="container">
      <div className="mx-auto mt-40 flex flex-col items-center justify-center sm:mt-20">
        <div className="w-full rounded-lg bg-primary shadow sm:max-w-xl md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h2>Welcome to Mowvie</h2>
            <Button onClick={handleLogin} variant="secondary">
              Login
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
