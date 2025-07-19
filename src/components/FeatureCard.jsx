import { Link } from "react-router-dom";

const FeatureCard = ({ detail,recipe }) => {
  const IconComponent = detail.logo;
  const ValueComponent = detail.value;

  return (
    <div className="border border-gray-400 rounded-md p-3 flex flex-col items-center gap-2">
      <IconComponent className="text-orange-500 text-2xl" />

      <p className="text-gray-500 text-lg font-bold tracking-wide font-[poppins]">
        {detail.title}
      </p>

      {detail.title === "Favourite" ? (
        <ValueComponent recipe = {recipe} style={true} className="text-orange-500 text-md font-extrabold" />
      ) : detail.title === "Source" ? (
        <Link
          to={detail.value}
          className="bg-orange-500 px-3 py-2 rounded-md text-white"
        >
          Source
        </Link>
      ) : (
        <p className="text-md font-extrabold tracking-wide font-[poppins] dark:text-white">
          {detail.value}
        </p>
      )}
    </div>
  );
};

export default FeatureCard;


