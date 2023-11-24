import { Preferences } from '@capacitor/preferences';
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import md5 from 'md5' 

export async function getAccounts() {
  const { value } = await Preferences.get({ key: 'allWallets' }); 
  return value
}
export async function addBcnaSession() {
  const sessionTime = Math.floor(Date.now() / 1000); 
  await Preferences.set({
    key: 'bcnaUserSession',
    value: String(sessionTime)
  });
}
export async function getBcnaSession() {
  const { value } = await Preferences.get({ key: 'bcnaUserSession' });
  return value
}
export async function removeBcnaSession() {
  await Preferences.remove({ key: 'bcnaUserSession' }); 
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
export async function editMasterPassword(oldPassword, newPassword) {
  let allAccount = JSON.parse(await getAccounts())
  for (const index in allAccount) {  
    
    // Decode wallet
    const deserialized = await DirectSecp256k1HdWallet.deserialize(allAccount[index].data, oldPassword); 
    // Encode wallet with new password
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic( deserialized.mnemonic, {
      prefix: 'bcna'
    })
    var finalWallet = await wallet.serialize( newPassword )
    allAccount[index].data = finalWallet
  }
  await Preferences.set({
    key: 'allWallets',
    value: JSON.stringify(allAccount)
  }); 
  const hash = md5(newPassword);
  await Preferences.set({
    key: 'masterPass',
    value: hash
  });
}
export async function removeMasterPassword() {
  await Preferences.remove({ key: 'masterPass' });
  const list = await Preferences.keys(); 
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

export async function editAccountId(id, name) {
  console.log('Edit account id')
  console.log(id, name)
  const { value } = await Preferences.get({ key: 'allWallets' });
  let allWalletsData = JSON.parse(value)
 
  allWalletsData[id].name = name
  console.log(allWalletsData);
  await Preferences.set({
    key: 'allWallets',
    value: JSON.stringify(allWalletsData)
  }); 
}
export async function removeAccountId(id) {
  console.log('Remove account id', id)
  const { value } = await Preferences.get({ key: 'allWallets' });
  let allWalletsData = JSON.parse(value)
 
  allWalletsData.splice(id, 1);
  console.log(allWalletsData);
  await Preferences.set({
    key: 'allWallets',
    value: JSON.stringify(allWalletsData)
  });   
}
export async function removeAccount() {
  await Preferences.remove({ key: 'allWallets' });
}

// Address book
export async function addContact(name, address, memo) {
  const { value } = await Preferences.get({ key: 'allContacts' });
  let allContactData = JSON.parse(value)
  if (!allContactData) {
    allContactData = []
  }   
  
  allContactData.push({ name: name, address: address, memo: memo })
  await Preferences.set({
    key: 'allContacts',
    value: JSON.stringify(allContactData)
  });        
  // const list = await Preferences.keys();
}

export async function editContactId(id, name, address, memo) {
  const { value } = await Preferences.get({ key: 'allContacts' });
  let allContactData = JSON.parse(value)
 
  allContactData[id].name = name
  allContactData[id].address = address
  allContactData[id].memo = memo

  await Preferences.set({
    key: 'allContacts',
    value: JSON.stringify(allContactData)
  }); 
}

export async function getAllContact() {
  const { value } = await Preferences.get({ key: 'allContacts' });
  return value
}

export async function removeContactId(id) {
  console.log('Remove contact id', id)
  const { value } = await Preferences.get({ key: 'allContacts' });
  let allContactData = JSON.parse(value)
 
  allContactData.splice(id, 1);
  console.log(allContactData);
  await Preferences.set({
    key: 'allContacts',
    value: JSON.stringify(allContactData)
  });   
}