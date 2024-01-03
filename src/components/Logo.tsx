import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <Image
        src="/images/brand_logo.svg"
        width={240}
        height={76}
        alt="Logo"
        priority
      />
    </Link>
  );
};

export default Logo;
