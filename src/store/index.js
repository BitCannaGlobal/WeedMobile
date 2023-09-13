import { createStore } from 'vuex'
import axios from "axios";
import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { createProtobufRpcClient, QueryClient } from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc"; 
import Long from "long";

import * as bank from "cosmjs-types/cosmos/bank/v1beta1/query"; 
import * as distrib from "cosmjs-types/cosmos/distribution/v1beta1/query";
import * as staking from "cosmjs-types/cosmos/staking/v1beta1/query";

import bitcannaConfig from '../bitcanna.config'

export default createStore({
  state: {
    network: 'mainnet',
    rpcClient: null,
    rpcBase: null,
    masterPassExist: false,
    isLogged: false,
    sessionMax: 1000000,
    allWallets: [],
    allWalletsList: [],
    accountSelected: 0,
    spendableBalances: 0,
    totalRewards: 0,
    priceNow: 0,
    totalDelegations: 0,
    totalUnbound: 0,
    poolStaking: 0,
  },
  getters: {
  },
  mutations: {
    async setIsLogged(state, data) {
      state.isLogged = data
    },
    setNetwork(state, data) {
      state.network = data
    }
  },
  actions: {
    async initRpc({ state }) {      
      if(state.rpcClient) {
        state.rpcBase.disconnect();
      } 

      console.log(bitcannaConfig)
      const client = await Tendermint37Client.connect(bitcannaConfig[state.network].rpcURL) 
      const queryClient = new QueryClient(client);
      const rpcClient = createProtobufRpcClient(queryClient);
      state.rpcClient = rpcClient
      state.rpcBase = client 
    },  
    async getPriceNow({ state }) {
      const getPrice = await axios("https://api.coingecko.com/api/v3/simple/price?ids=bitcanna&vs_currencies=usd");
      state.priceNow = getPrice.data.bitcanna.usd.toFixed(5); 
    },
    async getBankModule({ state }, addressSelected) {
      const queryBank = new bank.QueryClientImpl(state.rpcClient); 
      let spendableBalances = await queryBank.SpendableBalances({ address: addressSelected });
 
      const found = spendableBalances.balances.find(element => element.denom === bitcannaConfig[state.network].coinLookup.chainDenom);
      // TODO: fix this
      let returnValue = ''
      if ( found?.amount > 0){
        returnValue = found?.amount / 1000000
      } else {
        returnValue = 0
      }
 
      state.spendableBalances = returnValue 
    },
    async getStakingModule({ state }, addressSelected) {    
      const queryStaking = new staking.QueryClientImpl(state.rpcClient);
      let getPoolStaking = await queryStaking.Pool({});  
      let delegatorValidators = await queryStaking.DelegatorDelegations({ delegatorAddr: addressSelected, pagination: {
        countTotal: false,
        key: '',
        offset: Long.fromNumber(0, true),
        limit: Long.fromNumber(200, true),
        reverse: false,
      }}); 

      let total = 0;  
      let allUnbound = await queryStaking.DelegatorUnbondingDelegations({ delegatorAddr: addressSelected });       
      let totalUnbound = 0;

      for (let i of delegatorValidators.delegationResponses) { 
        total += Number(i.balance.amount);
      }   
      if (allUnbound.unbondingResponses.length > 0) {   
        for (let i of allUnbound.unbondingResponses) {
          for (let j of i.entries) {
            totalUnbound += Number(j.balance)
          }
        }   
      } else {
        totalUnbound = 0.00
      }
 
      state.totalDelegations = (total / 1000000).toFixed(2)
      state.totalUnbound = (totalUnbound / 1000000).toFixed(2)
      state.poolStaking = getPoolStaking.pool
    }, 
    async getDistribModule({ state }, addressSelected) { 
      const queryDistrib = new distrib.QueryClientImpl(state.rpcClient);
      const queryDistribResult = await queryDistrib.DelegationTotalRewards({ delegatorAddress: addressSelected }); 
      const found = queryDistribResult.total.find(element => element.denom === bitcannaConfig[state.network].coinLookup.chainDenom);
      let returnValue = ''
      if ( queryDistribResult.total.length > 0){
        returnValue = Number(found.amount / 1000000000000000000000000).toFixed(6)
      } else {
        returnValue = 0
      }

      console.log('queryDistribResult', returnValue)

      //this.totalMyValidators = queryDistribResult.rewards.length
      //this.totalDelegationsRewards = queryDistribResult.rewards
      state.totalRewards = returnValue

    }, 
    async getWalletAmount({ state }) {
      let totalToken = 
        Number(state.spendableBalances) + 
        Number(state.totalDelegations) + 
        Number(state.totalUnbound) + 
        Number(state.totalRewards)

      state.totalTokens = (totalToken).toFixed(6)
      //state.fiatWalletValue = totalToken * this.chainSelectedPrice
    },
    async getWallets({ state }) {
      const { value } = await Preferences.get({ key: 'allWallets' });
      if (value) {
        state.allWallets = JSON.parse(value)
        state.allWalletsList = []
        for (const [index, element] of state.allWallets.entries()) {
          console.log('index', index)
          //console.log('accountSelected', this.accountSelected)
          let selected = false
          if(index === state.accountSelected) {
            selected = true
          }
          state.allWalletsList.push({ name: element.name, addr: element.address, selected: selected })
        } 
      } 
    },
    changeWallet({ state }, data) {
      state.accountSelected = data

      
    },
    async checkLogin({ state }, walletData) { 
      // By wallet name, not active
      //let foundWallet = state.allWallets.find( ({ name }) => name === data.name )      
      try {
        await DirectSecp256k1HdWallet.deserialize(walletData.data, walletData.password); 
        state.isLogged = true
      } catch (error) {
        console.log(error)  
        state.isLogged = false
      }
    },
    resetData({ state }) {
      state.spendableBalances = 0
      state.totalRewards = 0
      state.totalDelegations = 0
      state.totalUnbound = 0
      state.poolStaking = 0
    }
  },
  modules: {
  }
})
