import { ReactNode, useState } from "react";
import NormalLayout from "../layouts/NormalLayout";
import { useNakamaContext } from "../NakamaContext";

interface LoginPage {
  children?: ReactNode;
}

export default function LoginPage(props: LoginPage) {
  const ctx = useNakamaContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = () => {
    const doLogin = async () => {
      const session = await ctx.client?.authenticateEmail(email, password);
      ctx.setSession(session);
    };
    doLogin().catch((e) => alert("Unable to login"));
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
