import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

const Logo: React.FC<{ href?: string }> = ({ href = "/" }) => {
  const { theme } = useTheme();

  return (
    <Link href={href}>
      <Image
        src={
          theme === "dark" ? "/images/logo-dark.png" : "/images/logo-light.png"
        }
        alt="logo"
        width={170}
        height={170}
        loading="lazy"
      />
    </Link>
  );
};
export default Logo;