import { useConnect } from "wagmi";
import "./Profile.css";

export const Profile = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

  return (
    <div className={"profile-button-container"}>
      {connectors.map((connector) => (
        <button
          // className={"profile-button-container"}
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
          style={{}}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </button>
      ))}
    </div>
  );
};
