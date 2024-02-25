import logoCareNow from "../../assets/image/care-now.png";
import { useNavigate } from "react-router-dom";
type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();

  return (
    <header className="relative py-4 bg-white flex mx-auto w-full px-2.5 md:px-20 shadow-md shadow-bottom-xl">
      <img
        onClick={() => navigate("/")}
        src={logoCareNow}
        alt="Care Now Logo"
        className="cursor-pointer w-auto h-7 md:h-11"
      />
    </header>
  );
};

export default Navbar;
