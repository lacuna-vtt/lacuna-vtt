import { ReactNode, useState } from "react";
import NormalLayout from "../components/NormalLayout";
import { useNakamaContext } from "../NakamaContext";

interface LoginPageProps {
  children?: ReactNode;
}

export default function LoginPage(props: LoginPageProps) {
  const ctx = useNakamaContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = () => {
    const doLogin = async () => {
      try {
        const session = await ctx.client?.authenticateEmail(email, password);
        ctx.setSession(session);
      } catch (e: any) {
        const msg = await e.json();
        console.info("Unable to login", msg);
        alert(`Unable to login: ${msg.message || "Unknown reason"}`);
      }
    };
    doLogin();
  };

  return (
    <NormalLayout>
      <p>You are not logged in</p>
    </NormalLayout>
  );
}
