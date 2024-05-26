import { ReactNode, useEffect, useState } from "react";
import { useNakamaContext } from "../NakamaContext";
import { Link } from "react-router-dom";

interface LacunaNavbarProps {
  children?: ReactNode;
}

export default function LacunaNavbar(props: LacunaNavbarProps) {
  const ctx = useNakamaContext();
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (ctx.isConnected) {
      setShowLoginModal(false);
    }
  }, [ctx.isConnected]);

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

  const logout = (_evt: any) => {
    ctx.socket?.disconnect(true);
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="#">
            Lacuna
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBurgerMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBurgerMenu" className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to={"/"}>
              Home
            </Link>
            <Link className="navbar-item" to={"/game/foobar"}>
              Games
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {ctx.isConnected ? (
                  <a className="button is-primary" onClick={logout}>
                    <strong>Sign out</strong>
                  </a>
                ) : (
                  <a
                    className="button is-primary"
                    onClick={(_evt: any) => setShowLoginModal(true)}
                  >
                    <strong>Sign in</strong>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className={`modal ${showLoginModal ? "is-active" : ""}`}>
        <div
          className="modal-background"
          onClick={(_evt: any) => setShowLoginModal(false)}
        ></div>
        <div className="modal-card">
          <section className="modal-card-body">
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
          </section>
          <footer className="modal-card-foot">
            <div className="buttons">
              <button className="button is-primary" onClick={login}>
                Sign in
              </button>
              <button
                className="button"
                onClick={(_evt: any) => setShowLoginModal(false)}
              >
                Cancel
              </button>
            </div>
          </footer>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={(_evt: any) => setShowLoginModal(false)}
        ></button>
      </div>
    </>
  );
}
