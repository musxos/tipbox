/* Moralis init code */
const serverUrl = "https://5awtjxbgwfd5.usemoralis.com:2053/server";
const appId = "9yYaaArDK5Cu6C4AN44qA9FoHZ559r1gA79qrwM9";
Moralis.start({ serverUrl, appId });

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    user = await Moralis.authenticate({ signingMessage: "Log in Avantasy" })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        let useraddres;
        useraddres =  user.get("ethAddress");
        shortaddres = useraddres.slice(0,5) + "..." + useraddres.slice(39);
        document.getElementById("btn-login").innerHTML = shortaddres;
      })
      .catch(function (error) {
        console.log(error);
      });
  }else{
  document.getElementById("btn-login").innerHTML = shortaddres;
  }
};

async function logOut() {
  await Moralis.User.logOut();
  document.getElementById("btn-login").innerHTML = "Connect";
  console.log("logged out");
}

const switchNetworkMumbai = async () => {
    try {
      await web3.currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await web3.currentProvider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Mumbai",
                rpcUrls: ["https://rpc-mumbai.matic.today"],
                nativeCurrency: {
                  name: "Matic",
                  symbol: "Matic",
                  decimals: 18,
                },
                blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }
  }


document.getElementById("btn-login").onclick = login;
document.getElementById("btn-switch").onclick = switchNetworkMumbai;
document.getElementById("btn-logout").onclick = logOut;
