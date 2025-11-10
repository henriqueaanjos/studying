
import { LinkButton } from "@/components/LinkButton";
import { Logo } from "@/components/Logo";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4 bg-primary">
      <Logo size="lg"/>
      <h3 className=" text-2xl text-white font-thin">Sua Plataforma de organização de estudos!</h3>
      <div className="flex flex-row gap-2 items-center justify-between">
          <LinkButton href='/SignIn'>Sign In</LinkButton>
          <LinkButton href='/SignUp' variant="secondary">Sign Up</LinkButton>
        </div>
    </div>
  );
}
