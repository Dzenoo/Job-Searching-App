import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image
        src="/images/logo/logo-light.png"
        alt="light-talentify-logo"
        width={300}
        height={300}
        style={{ objectFit: "cover", width: "auto", height: "auto" }}
        loading="lazy"
      />
    </Link>
  );
};
export default Logo;
