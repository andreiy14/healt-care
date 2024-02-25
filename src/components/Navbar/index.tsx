import React from "react";
import logoCareNow from "../../assets/image/care-now.png";
type Props = {};

const Navbar = (props: Props) => {
  return (
    <header className="relative py-4 bg-white flex mx-auto w-full px-2.5 md:px-20 shadow-md shadow-bottom-xl">
      <img
        src={logoCareNow}
        alt="Care Now Logo"
        className="w-auto h-7 md:h-16"
      />
    </header>
  );
};

export default Navbar;
