import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "@/components/login-form";
import { LogoIcon } from "@/components/icons/logo-icon";

export default function AuthPage() {
  return (
    <div className="grid min-h-svh bg-white lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <LogoIcon width={100} height={40} className="text-green-dark" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-lg">
            <LoginForm />
          </div>
        </div>
        <footer className="text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Naijabites. All rights reserved.</p>
        </footer>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/images/login-frame.png"
          width={500}
          height={500}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
