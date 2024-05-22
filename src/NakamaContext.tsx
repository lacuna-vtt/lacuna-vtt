import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { Client, Session, Socket } from "@heroiclabs/nakama-js";
import { WebSocketAdapterPb } from "@heroiclabs/nakama-js-protobuf";

// TODO: account and other objects?
interface NakamaContextInterface {
  client: Client | undefined;
  session: Session | undefined;
  setSession: React.Dispatch<React.SetStateAction<Session | undefined>>;
  socket: Socket | undefined;
  isConnected: boolean;
}

interface NakamaProviderProps {
  children?: ReactNode;
}

const USE_SSL = false; // TODO don't hardcode this
const client = new Client(
  "defaultkey",
  // @ts-ignore
  "64.23.232.179",
  "7350",
  USE_SSL
);

const NakamaContext = createContext<NakamaContextInterface | undefined>(
  undefined
);

export const useNakamaContext = () => {
  const context = useContext(NakamaContext);
  if (context === undefined) {
    throw new Error("useNakamaContext must be used within a NakamaProvider");
  }
  return context;
};

// TODO: session management in local storage

export const NakamaProvider: React.FC<NakamaProviderProps> = (
  props: NakamaProviderProps
) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [socket, setSocket] = useState<Socket | undefined>(undefined);

  useEffect(() => {
    const createSocket = async () => {
      if (!client || !session || isConnected) {
        return;
      }
      console.info("Connecting socket");
      const newSocket = client.createSocket(
        USE_SSL,
        false,
        new WebSocketAdapterPb()
      );
      newSocket.ondisconnect = (evt: Event) => {
        console.info("Disconnected", evt);
        setIsConnected(false);
      };
      // TODO: what the fuck is this second argument?
      const newSession = await newSocket.connect(session, false);
      setIsConnected(true);
      setSession(newSession);
      setSocket(newSocket);
    };
    createSocket().catch((e) => {
      console.error(e);
    });
  }, [client, session]);

  return (
    <NakamaContext.Provider
      value={{ client, session, setSession, socket, isConnected }}
    >
      {props.children}
    </NakamaContext.Provider>
  );
};
