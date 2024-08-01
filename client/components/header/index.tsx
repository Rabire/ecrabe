import Logo from "../logo";
import BurgerSideBar from "./burger-side-bar";
import MenuDropdown from "./menu-dropdown";
import MenuElements from "./menu-elements";

const Header = () => (
  <header className="sticky top-0 z-40 bg-background/80 shadow-sm backdrop-blur-sm">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-3">
      <Logo />

      <MenuElements className="hidden md:flex" />

      <MenuDropdown className="hidden md:flex" />

      <BurgerSideBar />
    </div>
  </header>
);

export default Header;
