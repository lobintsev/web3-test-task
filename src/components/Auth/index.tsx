import React from "react";
import { useNavigate } from "react-router";
import { connect } from "../../utils/api";
import { AppContext } from "../App";

const Auth: React.FC = () => {
  const [message, setMessage] = React.useState('');

  const navigate = useNavigate();

  const { setAppToken } = React.useContext(AppContext);

  const handleConnect = async (_e: React.MouseEvent<HTMLButtonElement>) => {
    const token = await connect();

    if (token === process.env.REACT_APP_WALLET_TOKEN) {
      setAppToken(token);
      navigate('/');
    } else {
      setMessage(`You aren't in the db`);
    }
  };

  return (
    <>
      <button onClick={handleConnect}>
        Login
      </button>

      <div>
        { message }
      </div>
    </>
  );
};

export default Auth;
