import React from "react";
import { getBallanse } from "../../utils/api";
import { getFormattedBallance } from "../../utils/utils";
import { AppContext } from "../App";

const Home: React.FC = () => {
  const [ballance, setBallance] =  React.useState('');

  const { appToken } = React.useContext(AppContext);

  const getCurrentBallance = async () => {
    const currentBallance: string = await getBallanse(appToken);

    setBallance(currentBallance);
  };

  const memoizedGetCurrentBallance = React.useCallback(
    () => {
      getCurrentBallance();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [appToken],
  );

  React.useEffect(() => {
    if (appToken) {
      memoizedGetCurrentBallance();
    }
  }, [appToken, memoizedGetCurrentBallance]);

  return (
    <div>
      <div>Hello!</div>

      {
        ballance && (
          <div>
            My ballance is - 
            { ' ' }
            { getFormattedBallance(ballance) }
            { ' ' }
            GoerliETH
          </div>
        )
      }
    </div>
  );
};

export default Home;
