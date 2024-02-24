import { LinkElement } from "@/components/shared/Link";
import Image from "next/image";
import React from "react";

const Logo: React.FC = () => {
  return (
    <Image
      src="/images/logo/logo-light.png"
      alt="light-talentify-logo"
      width={170}
      height={170}
      loading="lazy"
      objectFit="cover"
    />
  );
};

const AuthenticationDivLinks: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <div>
        <LinkElement variant={"outlined"} href={"/login"}>
          Login
        </LinkElement>
      </div>
      <div>
        <LinkElement variant={"default"} href={"/signup"}>
          Signup
        </LinkElement>
      </div>
    </div>
  );
};

const Navbar: React.FC = () => {
  return (
    <header className="base-margin flex justify-between items-center gap-3 overflow-hidden border-b border-base-gray">
      <div>
        <Logo />
      </div>
      <div>
        <AuthenticationDivLinks />
      </div>
    </header>
  );
};

export { Navbar };
