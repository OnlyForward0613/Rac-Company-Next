/* eslint-disable @next/next/no-img-element */
import { Home2, Wallet3 } from "iconsax-react";
import Link from "next/link";
import {
  bottomNavItems,
  topNavItems,
  useNavContext,
  type NavItemType,
} from "~/contexts/NavigationContext";

export type NavItemProps = {
  navItem: NavItemType;
  onClick?: () => void;
};

export const NavItem = ({ navItem, onClick }: NavItemProps) => {
  const { activeNav } = useNavContext();

  return (
    <div
      data-close="#sheet_b"
      onClick={onClick}
      className={`flex w-full items-center bg-opacity-[8%] hover:bg-[url('/images/nav/nav_item_hover_bg.svg')] ${
        navItem.title === activeNav &&
        "bg-[url('/images/nav/nav_item_hover_bg.svg')]"
      }`}
    >
      <span className="p-[16px]">{navItem.src}</span>
      <span className="body-lg text-gray-100">{navItem.title}</span>
    </div>
  );
};

export const TopNav = () => {
  return (
    <div className="flex flex-col gap-[16px] overflow-y-auto">
      <Link href="/">
        <NavItem
          navItem={{
            src: <Home2 className="text-gray-400" />,
            title: "Home",
            href: "/",
          }}
        />
      </Link>
      <div>
        {topNavItems.map((navItem) => {
          return (
            <Link key={navItem.href} href={navItem.href}>
              <NavItem navItem={navItem} />
            </Link>
          );
        })}
      </div>
      <Link href="/billing">
        <NavItem
          navItem={{
            src: <Wallet3 className="text-gray-400" />,
            title: "Billing",
            href: "/billing",
          }}
        />
      </Link>
    </div>
  );
};

export const BottomNav = () => {
  return (
    <div className="flex flex-1 flex-col justify-end pb-[32px]">
      <div className="px-[20px]">
        <hr className="w-full border-gray-700" />
      </div>
      {bottomNavItems.map((navItem) => {
        return (
          <Link key={navItem.href} href={navItem.href}>
            <NavItem navItem={navItem} />
          </Link>
        );
      })}
    </div>
  );
};
