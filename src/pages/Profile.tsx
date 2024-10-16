import CardsListLayout from "../components/layouts/CardsListLayout";
import imgProfile from "../assets/icons/ic-profile.png";
import Button from "../components/elements/Button";

export default function Profile() {
  return (
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-4 border-b-[1px] border-gray-400 pb-6 md:border-r-[1px] md:pb-0">
          <div className="flex flex-col items-center space-y-10 px-8">
            <h2 className="">My Profile</h2>
            <div className="mt-12 space-y-4">
              <img
                className="w-52 md:w-80 rounded-full border-4 border-primary bg-white"
                src={imgProfile}
                alt=""
              />
              <h4 className="text-center">User</h4>
            </div>
            <Button classname="w-full" variant="primary">
              Log out
            </Button>
          </div>
        </div>
        <div className="col-span-8">
          <CardsListLayout variant={"md"} title="Now Playing Movies" />
        </div>
      </div>
    </div>
  );
}
