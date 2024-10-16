import { Link } from "react-router-dom";
import Button from "../components/elements/Button";

export default function ErrorPage() {
  return (
    <section className="flex h-full min-h-screen items-center p-16">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, we couldn't find this page.
          </p>
          <p className="mb-8 mt-4">
            But dont worry, you can find plenty of other things on our homepage.
          </p>
          <Button variant="primary">
            <Link to={"/"}>
              <span>Back to homepage</span>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
