import { Preferences } from '@capacitor/preferences';
import md5 from 'md5' 

export async function getAccounts() {
  const { value } = await Preferences.get({ key: 'allWallets' }); 
  return value
}
export async function addSession() {
  await Preferences.set({
    key: 'userSession',
    value: Math.floor(Date.now() / 1000)
  });
}
export async function getSession() {
  const { value } = await Preferences.get({ key: 'userSession' });
  return value
}
export async function removeSession() {
  await Preferences.remove({ key: 'userSession' });
  const list = await Preferences.keys();
  console.log(list)
}
export async function getMasterPassword() {
  const { value } = await Preferences.get({ key: 'masterPass' });
  //console.log('checkMPexistend', value)
  if (value)
    return true
  else
    return false  
}
export async function addMasterPassword(password) {
  const hash = md5(password);
  await Preferences.set({
    key: 'masterPass',
    value: hash
  });
}
export async function removeMasterPassword() {
  await Preferences.remove({ key: 'masterPass' });
  const list = await Preferences.keys();
  console.log(list)
}
export async function checkMasterPassword(hash) {
  const { value } = await Preferences.get({ key: 'masterPass' });
  if (value == hash)
    return true
  else
    return false
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

