export const connect = async (): Promise<string> => {
  try {
    // @ts-ignore:next-line
    const resp = await window.ethereum.send('eth_requestAccounts');

    const { result: [token] } = resp;
    
    return token;
  } catch(e) {
    console.error(e);

    return '';
  }
};

export const check = async (): Promise<{ isAuth: boolean, token: string }> => {
  try {
    // @ts-ignore:next-line
    const resp = await window.ethereum.send('wallet_getPermissions');
    const { result } = resp;

    if (!result.length) {
      return {
        isAuth: false,
        token: ''
      };
    }

    const [token] = result[0].caveats[0].value;

    return {
      isAuth: token === process.env.REACT_APP_WALLET_TOKEN,
      token,
    };

  } catch(e) {
    console.error(e);

    return {
      isAuth: false,
      token: '',
    };
  }
};

export const getBallanse = async (token: string): Promise<string> => {
  try {
    // @ts-ignore:next-line
    return await window.ethereum.send(
      { method: 'eth_getBalance', params: [token, 'latest'] },
      (_: null, { result }: { result: string }) => {
        return result;
      },
    );
  } catch(e) {
    console.error(e);

    return '';
  }
};
