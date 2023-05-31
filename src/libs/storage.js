import { Preferences } from '@capacitor/preferences';

export async function getAccounts() {
  const { value } = await Preferences.get({ key: 'allWallets' }); 
  return value
}
export async function addAccount(name, address, data) {
  const { value } = await Preferences.get({ key: 'allWallets' });
  let allWalletsData = JSON.parse(value)
  if (!allWalletsData) {
    allWalletsData = []
  }   
  
  allWalletsData.push({ name: name, address: address, data: data })
  await Preferences.set({
    key: 'allWallets',
    value: JSON.stringify(allWalletsData)
  });        
  // const list = await Preferences.keys();
}
export async function removeAccount() {
  await Preferences.remove({ key: 'allWallets' });
}

