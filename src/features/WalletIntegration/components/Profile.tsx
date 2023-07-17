import { useAccount, useConnect, useDisconnect } from "wagmi";

import "./Profile.css";
import metaLogo from "../../../assets/MetaMask_Fox.svg";
import { useUpdateUserState } from "../../../hooks/useUserState";
import { useEffect } from "react";

export const Profile = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { isConnected } = useAccount();
  const { setLogin } = useUpdateUserState();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    setLogin(!isConnected);
  });

  if (isConnected) {
    return (
      <div className={"profile-container"}>
        <button
          // @ts-ignore
          onClick={disconnect}
          className={"profile"}
        >
          <img src={metaLogo} style={{ height: 40 }} />
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className={"profile-container"}>
      {connectors.map((connector) => (
        <button
          className={"profile"}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          style={{}}
        >
          <img src={metaLogo} style={{ height: 40 }} />
          {"Connect " + connector.name}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}
    </div>
  );
};
