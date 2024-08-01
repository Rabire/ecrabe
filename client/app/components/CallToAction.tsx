import Image from "next/image";

import { Button } from "@/components/ui/button";
// import backgroundImage from "@/images/background-call-to-action.jpg";
import Link from "next/link";
import Container from "./Container";

function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src="https://salient.tailwindui.com/_next/static/media/background-call-to-action.6a5a5672.jpg"
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Get started today
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            It’s time to take control of your books. Buy our software so you can
            feel like you’re doing something productive.
          </p>

          <Button asChild className="mt-10">
            <Link href="/register">Get 6 months free</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}

export default CallToAction;
