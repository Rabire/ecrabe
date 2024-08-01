import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Container from "./Container";

function Header() {
  return (
    <header className="py-10">
      <Container>
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Logo
            // className="h-10 w-auto"
            />

            <div className="hidden md:flex md:gap-x-6">
              <Link href="#features">Features</Link>
              <Link href="#testimonials">Testimonials</Link>
              <Link href="#pricing">Pricing</Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Link href="/login">Sign in</Link>
            </div>

            <Button asChild>
              <Link href="/login">
                Get started <span className="hidden lg:inline">today</span>
              </Link>
            </Button>

            {/* TODO: Implement MobileNavigation */}
            {/* <div className="-mr-1 md:hidden">
              <MobileNavigation />
            </div> */}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;

// function MobileNavLink({
//   href,
//   children,
// }: {
//   href: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <PopoverButton as={Link} href={href} className="block w-full p-2">
//       {children}
//     </PopoverButton>
//   );
// }

// function MobileNavIcon({ open }: { open: boolean }) {
//   return (
//     <svg
//       aria-hidden="true"
//       className="h-3.5 w-3.5 overflow-visible stroke-slate-700"
//       fill="none"
//       strokeWidth={2}
//       strokeLinecap="round"
//     >
//       <path
//         d="M0 1H14M0 7H14M0 13H14"
//         className={clsx(
//           "origin-center transition",
//           open && "scale-90 opacity-0",
//         )}
//       />
//       <path
//         d="M2 2L12 12M12 2L2 12"
//         className={clsx(
//           "origin-center transition",
//           !open && "scale-90 opacity-0",
//         )}
//       />
//     </svg>
//   );
// }

// function MobileNavigation() {
//   return (
//     <Popover>
//       <PopoverButton
//         className="ui-not-focus-visible:outline-none relative z-10 flex h-8 w-8 items-center justify-center"
//         aria-label="Toggle Navigation"
//       >
//         {({ open }) => <MobileNavIcon open={open} />}
//       </PopoverButton>
//       <PopoverBackdrop
//         transition
//         className="fixed inset-0 bg-slate-300/50 duration-150 data-[closed]:opacity-0 data-[enter]:ease-out data-[leave]:ease-in"
//       />
//       <PopoverPanel
//         transition
//         className="absolute inset-x-0 top-full mt-4 flex origin-top flex-col rounded-2xl bg-white p-4 text-lg tracking-tight text-slate-900 shadow-xl ring-1 ring-slate-900/5 data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in"
//       >
//         <MobileNavLink href="#features">Features</MobileNavLink>
//         <MobileNavLink href="#testimonials">Testimonials</MobileNavLink>
//         <MobileNavLink href="#pricing">Pricing</MobileNavLink>
//         <hr className="m-2 border-slate-300/40" />
//         <MobileNavLink href="/login">Sign in</MobileNavLink>
//       </PopoverPanel>
//     </Popover>
//   );
// }
