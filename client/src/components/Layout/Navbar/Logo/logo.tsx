import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Link href="/">
      <Image
        src={
          theme === "dark"
            ? "/images/logo/logo-dark.png"
            : "/images/logo/logo-light.png"
        }
        alt="light-talentify-logo"
        width={170}
        height={170}
        loading="lazy"
      />
    </Link>
  );
};
export default Logo;
