import dummyImg from "../../../assets/images/dummy-movie.jpg";
import icSave from "../../../assets/icons/ic-save.svg";
import icSaveFill from "../../../assets/icons/ic-save-fill.svg";

export default function Card() {
  return (
    <div className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl p-2 text-center transition-all duration-300 hover:bg-[#303030]">
      <div className="relative h-full w-full">
        <img
          className="w-full rounded-xl object-cover transition-all duration-300 group-hover:brightness-50"
          src={dummyImg}
          alt=""
        />
        <img
          width={36}
          className="absolute right-2 top-2 opacity-100 transition-all duration-300 hover:opacity-0"
          src={icSave}
          alt="Save Icon"
        />
        <img
          width={36}
          className="absolute right-2 top-2 opacity-0 transition-all duration-300 hover:opacity-100"
          src={icSaveFill}
          alt="Save Icon Hover"
        />
      </div>
      <div className="space-y-1">
        <h4>home alone</h4>
        <p className="desc transition-all duration-300 ease-out lg:-translate-y-6 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          Thriller - 1h26m - 2017
        </p>
      </div>
    </div>
  );
}
