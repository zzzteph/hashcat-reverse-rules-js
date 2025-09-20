
const hashcat = require('./dist/hashcat-reverse-rules.js');
const hashcatRule = require('hashcat-rules-js');
const fs = require('fs');
const readline = require('readline');/*
console.log(hashcat.reverseTheRule("password","D1"));
console.log(hashcat.reverseTheRule("password","D9"));//Last added
console.log(hashcat.reverseTheRule("password","D10"));//empty

console.log(hashcat.reverseTheRule("password","x19"));
console.log(hashcat.reverseTheRule("password","x1A"));


console.log(hashcat.reverseTheRule("password","i1a"));//pssword
console.log(hashcat.reverseTheRule("password","i7d"));//passwor
console.log(hashcat.reverseTheRule("password","i7a"));//[]


console.log(hashcat.reverseTheRule("password","o3s"));//Array
console.log(hashcat.reverseTheRule("pas$word","o3$"));
console.log(hashcat.reverseTheRule("password","o31"));
console.log(hashcat.reverseTheRule("password","oB1"));
console.log(hashcat.reverseTheRule("password","'6"));
console.log(hashcat.reverseTheRule("password","s$s"));
console.log(hashcat.reverseTheRule("password","@s"));

console.log(hashcat.reverseTheRule("password","z1"));
console.log(hashcat.reverseTheRule("pppassword","z1"));
console.log(hashcat.reverseTheRule("pppppassword","z3"));


console.log(hashcat.reverseTheRule("password","Z1"));
console.log(hashcat.reverseTheRule("ppassworddddd","Z2"));
console.log(hashcat.reverseTheRule("pppppasswordddd","Z3"));


console.log(hashcat.reverseTheRule("password","Z1z1"));
console.log(hashcat.reverseTheRule("ppassworddddd","Z2z1"));
console.log(hashcat.reverseTheRule("pppppasswordddd","Z3z1"));
console.log(hashcat.reverseTheRule("pppppasswordddd","q"));
console.log(hashcat.reverseTheRule("ppaasswwoorrdd","q"));
console.log(hashcat.reverseTheRule("ppaasssswwoorrdd","q"));
*/

console.log(hashcatRule.applyRule("password","x04"));
console.log(hashcatRule.applyRule("password","x14"));
console.log(hashcatRule.applyRule("password","x24"));
console.log(hashcatRule.applyRule("password","x34"));
console.log(hashcatRule.applyRule("password","x34"));
console.log(hashcatRule.applyRule("password","x34"));
console.log(hashcatRule.applyRule("password","x34"));
console.log(hashcat.generateCandidates("password123"));




/*
function readRulesSync(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split(/\r?\n/);
let i=0;
let success=0;
let fail=0;
  for (const line of lines) {
    if (line.trim() === '') continue;

    let pass=hashcatRule.applyRule("password",line);



    let results=hashcat.reverseTheRule(pass,line); 
    let found=false;
    for(let i=0;i<results.length;i++)
    {
      if(hashcatRule.applyRule(results[i],line)==pass)
      {
        
        found=true;
      }
    }
    if(!found)
      {
                console.log("ERROR:"+line+":"+pass);
       console.log(results);
        fail++;
      }
    if(found)success++;

  /*
    if(results!==false && !results.includes("password"))
    {
        console.log("ERROR:"+line+":"+pass);
       console.log(results);
        fail++;
    }
    else

        {
        
        }
        */
//  }
//  console.log(success);
//  console.log(fail);
  
//}

//readRulesSync('test.rule');
