import React from "react";
import AppLogo from "../images/AppLogo";

const Header = () => {
  return (
    <div className="bg-primary">
      <div className="container mx-auto px-10 py-3">
        <div className="flex items-center justify-between">
          <AppLogo width={"175px"} logotType={2} />
          <nav className="flex gap-16 text-white font-semibold">
            <buton>About</buton>
            <buton>About</buton>
            <buton>About</buton>
            <buton>About</buton>
            <buton>About</buton>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
