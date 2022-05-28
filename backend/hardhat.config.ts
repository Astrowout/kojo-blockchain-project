import * as dotenv from 'dotenv';

import { HardhatUserConfig, task } from 'hardhat/config';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'solidity-coverage';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (_, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.9',
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  defaultNetwork: 'mumbai',
  networks: {
    hardhat: {
      chainId: 80001,
      gas: 2100000,
      gasPrice: 8000000000,
    },
    localhost: {
      chainId: 80001,
      gas: 2100000,
      gasPrice: 8000000000,
    },
    // ethereum: {
    //   chainId: 1,
    //   url: process.env.ETHEREUM_MAINNET_RPC_URL,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    // morden: {
    //   chainId: 2,
    //   url: process.env.ETHEREUM_MORDEN_RPC_URL,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    // ropsten: {
    //   chainId: 3,
    //   url: process.env.ETHEREUM_ROPSTEN_RPC_URL ?? '',
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    // rinkeby: {
    //   chainId: 4,
    //   url: process.env.ETHEREUM_RINKEBY_RPC_URL,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    // goerli: {
    //   chainId: 5,
    //   url: process.env.ETHEREUM_GOERLI_RPC_URL ?? '',
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    // kovan: {
    //   chainId: 42,
    //   url: process.env.ETHEREUM_KOVAN_RPC_URL,
    //   accounts:
    //     process.env.PRIVATE_KE !== undefined ? [process.env.PRIVATE_KE] : [],
    // },
    // polygon: {
    //   chainId: 137,
    //   url: process.env.POLYGON_MAINNET_RPC_URL,
    //   accounts:
    //     process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    // },
    mumbai: {
      chainId: 80001,
      url: process.env.POLYGON_MUMBAI_RPC_URL,
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      gas: 2100000,
      gasPrice: 8000000000,
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_API_KEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'EUR',
    // outputFile: 'gas-report.txt',
    // noColors: true,
  },
};

export default config;
