import { ReactNode, useEffect, useState } from "react";
import NormalLayout from "../components/NormalLayout";
import { useNakamaContext } from "../NakamaContext";
import NakamaLoginRequired from "../components/NakamaLoginRequired";
import { ApiMatch } from "@heroiclabs/nakama-js/dist/api.gen";

interface LobbyPageProps {
  children?: ReactNode;
}

export default function LobbyPage(props: LobbyPageProps) {
  const ctx = useNakamaContext();
  const [matches, setMatches] = useState<ApiMatch[]>([]);

  const fetchMatches = async () => {
    try {
      if (ctx.isConnected && ctx.session) {
        const result = await ctx.client?.listMatches(
          ctx.session,
          100,
          true,
          undefined,
          0,
          999,
          undefined
        );
        if (result?.matches != undefined) {
          setMatches(result?.matches);
        }
      }
    } catch (e) {
      console.error(e);
      alert("Unable to fetch matches");
    }
  };

  const createMatch = async () => {
    try {
      if (ctx.isConnected && ctx.socket) {
        const payload = prompt("Payload");
        if (payload) {
          console.log("Creating match");
          const response = await ctx.socket.rpc(
            "startlacunagame",
            JSON.stringify({ payload })
          );
          console.dir(response);
          await fetchMatches();
        }
      }
    } catch (e) {
      alert("Unable to fetch matches");
    }
  };

  const leaveMatch = async (matchId: string) => {
    try {
      await ctx.socket?.leaveMatch(matchId);
      await fetchMatches();
    } catch (e) {
      alert("Unable to leave match");
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [ctx.isConnected]);

  return (
    <NormalLayout>
      <NakamaLoginRequired>
        <button className="button" onClick={(_evt: any) => fetchMatches()}>
          Refresh
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Match ID</th>
              <th>Label</th>
              <th>Presences</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr>
                <td>{match.match_id}</td>
                <td>{match.label}</td>
                <td>{match.size}</td>
                <td>
                  <button
                    className="button"
                    onClick={(_evt) => {
                      leaveMatch(match.match_id || "");
                    }}
                  >
                    Leave
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="button" onClick={(_evt: any) => createMatch()}>
          Create
        </button>
      </NakamaLoginRequired>
    </NormalLayout>
  );
}
