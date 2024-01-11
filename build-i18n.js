// In dev! Not working yet!
// This script will translate the english.js file to the other languages
// and save them in the same folder.
// @atmoner 2024

import fs from 'fs'
import translatte from 'translatte'
import english from './src/libs/i18n/english.js'

async function translate(data) {
  try {
    for (const type in english) {
      for (const typeSub in english[type]) {
        if(typeof english[type][typeSub] === 'object') {
          for (const typeSubSub in english[type][typeSub]) {
            console.log(english[type][typeSub][typeSubSub])
            let returnVar = await translatte(english[type][typeSub][typeSubSub], { to: data.lang })
            english[type][typeSub][typeSubSub] = returnVar.text
            console.log(returnVar.text)
          }
        } else {
          console.log(english[type][typeSub])
          let returnVar = await translatte(english[type][typeSub], { to: data.lang })
          english[type][typeSub] = returnVar.text
          console.log(returnVar.text)
        }
      }
    }  
    
    let content = `export default ${JSON.stringify(english, null, 2)}`
    console.log(content) 
    fs.writeFileSync("./src/libs/i18n/" + data.file, content)   
  } catch (error) {
    console.error(error)
  }
}

const allLang = [{
  lang: 'fr',
  file: 'french.dev.js'
}/* , {
  lang: 'nl',
  file: 'dutch.dev.js'
}*/] 
for (const type in allLang) {
  translate(allLang[type], allLang[type].file)
}
// translate('fr')

