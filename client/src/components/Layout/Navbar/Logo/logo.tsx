import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo-light.png"
        alt="light-talentify-logo"
        width={170}
        height={170}
        loading="lazy"
      />
    </Link>
  );
};
export default Logo;
