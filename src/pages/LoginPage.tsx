import { ReactNode, useState } from "react";
import NormalLayout from "../layouts/NormalLayout";
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
      <h1 className="title">Login</h1>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Email address"
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
      </div>
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            className="input"
            type="password"
            placeholder="Password"
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
      </div>
      <button className="button is-primary" onClick={login}>
        Login
      </button>
    </NormalLayout>
  );
}
