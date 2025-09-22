
const hashcat = require('./dist/hashcat-reverse-rules.js');
const fs = require('fs');
const readline = require('readline');

console.log(hashcat.applyReverseRule("password","l"));
console.log(hashcat.applyReverseRule("a","l"));
console.log(hashcat.applyReverseRule("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","l"));


console.log(hashcat.applyReverseRule("password","u"));
console.log(hashcat.applyReverseRule("a","u"));
console.log(hashcat.applyReverseRule("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","u"));



console.log(hashcat.applyReverseRule("password","C"));
console.log(hashcat.applyReverseRule("a","C"));
console.log(hashcat.applyReverseRule("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","C"));

console.log(hashcat.applyReverseRule("password","c"));
console.log(hashcat.applyReverseRule("a","c"));
console.log(hashcat.applyReverseRule("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","c"));



console.log(hashcat.applyReverseRule("password","t"));
console.log(hashcat.applyReverseRule("a","t"));
console.log(hashcat.applyReverseRule("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","t"));
console.log(hashcat.applyReverseRule("AaA","t"));
console.log(hashcat.applyReverseRule("AaA!","t"));
console.log(hashcat.applyReverseRule("AaA1","t"));


console.log(hashcat.applyReverseRule("password","T1"));
console.log(hashcat.applyReverseRule("a","T1"));
console.log(hashcat.applyReverseRule("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","T1"));
console.log(hashcat.applyReverseRule("AaA","T1"));
console.log(hashcat.applyReverseRule("AaA!","T1"));
console.log(hashcat.applyReverseRule("AaA1","T1"));

console.log(hashcat.applyReverseRule("password","r"));
console.log(hashcat.applyReverseRule("password","d")); //empty
console.log(hashcat.applyReverseRule("passwordpassword","d"));//password


console.log("Repeat");
console.log(hashcat.applyReverseRule("password","p1")); //empty
console.log(hashcat.applyReverseRule("password","p0")); //empty
console.log(hashcat.applyReverseRule("passwordpassword","p1"));//password
console.log(hashcat.applyReverseRule("passwordpassword","p2"));//passwordpassword
console.log(hashcat.applyReverseRule("passwordpasswordpassword","p2"));//password
console.log(hashcat.applyReverseRule("aaa","p2"));//a
console.log(hashcat.applyReverseRule("p@ssW0rddr0Wss@p","f"));//p@ssW0rd	
console.log(hashcat.applyReverseRule("@ssW0rdp","{"));//p@ssW0rd	
console.log(hashcat.applyReverseRule("dp@ssW0r","}"));//p@ssW0rd	

console.log(hashcat.applyReverseRule("a","{"));//a
console.log(hashcat.applyReverseRule("a","}"));//a

console.log(hashcat.applyReverseRule("p@ssW0rd12","$1$2"));//p@ssW0rd
console.log(hashcat.applyReverseRule("p@ssW0rd1","$1"));//p@ssW0rd
console.log(hashcat.applyReverseRule("p@ssW0rd12","$3"));//[]

console.log(hashcat.applyReverseRule("12p@ssW0rd","^2^1"));//p@ssW0rd
console.log(hashcat.applyReverseRule("12p@ssW0rd","^1"));//2p@ssW0rd
console.log(hashcat.applyReverseRule("12p@ssW0rd","^3"));//[]

console.log(hashcat.applyReverseRule("p@ssW0rd","]"));//[]
console.log(hashcat.applyReverseRule("p@ssW0rd","["));//[]
console.log("Deleting");
console.log(hashcat.applyReverseRule("p@ssW0rd","D1"));//[]
console.log(hashcat.applyReverseRule("p@ssW0rd","D0"));//[]
console.log(hashcat.applyReverseRule("p@ssW0rd","D20"));//[]

console.log("Extract");

console.log(hashcat.applyReverseRule("p@ss","x03"));//[]
console.log(hashcat.applyReverseRule("p@ss","x04"));//[many]
console.log(hashcat.applyReverseRule("p@ss","x05"));//[many]
console.log(hashcat.applyReverseRule("A","x0A"));//[many]
console.log(hashcat.applyReverseRule("p@ss","x0A"));//[many]
console.log("Complex");
console.log(hashcat.applyReverseRule("p@ss","$1 x0A"));//[]
console.log("Omit");
console.log(hashcat.applyReverseRule("psW0rd","O14"));//[Some]
console.log(hashcat.applyReverseRule("psW0rd","O1A"));//[Some]
console.log("Delete");
console.log(hashcat.applyReverseRule("p@ss!W0rd","i4!"));

console.log("Overwrite");
console.log(hashcat.applyReverseRule("p@s$W0rd","o3$"));


/*
console.log(hashcat.applyReverseRule("password","l"));
console.log(hashcat.applyReverseRule("password","D9"));//Last added
console.log(hashcat.applyReverseRule("password","D10"));//empty

console.log(hashcat.applyReverseRule("password","x19"));
console.log(hashcat.applyReverseRule("password","x1A"));


console.log(hashcat.applyReverseRule("password","i1a"));//pssword
console.log(hashcat.applyReverseRule("password","i7d"));//passwor
console.log(hashcat.applyReverseRule("password","i7a"));//[]


console.log(hashcat.applyReverseRule("password","o3s"));//Array
console.log(hashcat.applyReverseRule("pas$word","o3$"));
console.log(hashcat.applyReverseRule("password","o31"));
console.log(hashcat.applyReverseRule("password","oB1"));

console.log(hashcat.applyReverseRule("password","'6"));

console.log(hashcat.applyReverseRule("password","s$s"));
console.log(hashcat.applyReverseRule("password","@s"));

console.log(hashcat.applyReverseRule("password","z1"));
console.log(hashcat.applyReverseRule("pppassword","z1"));
console.log(hashcat.applyReverseRule("pppppassword","z3"));


console.log(hashcat.applyReverseRule("password","Z1"));
console.log(hashcat.applyReverseRule("ppassworddddd","Z2"));
console.log(hashcat.applyReverseRule("pppppasswordddd","Z3"));


console.log(hashcat.applyReverseRule("password","Z1z1"));
console.log(hashcat.applyReverseRule("ppassworddddd","Z2z1"));
console.log(hashcat.applyReverseRule("pppppasswordddd","Z3z1"));
console.log(hashcat.applyReverseRule("pppppasswordddd","q"));
console.log(hashcat.applyReverseRule("ppaasswwoorrdd","q"));
console.log(hashcat.applyReverseRule("ppaasssswwoorrdd","q"));
*/

//console.log(hashcat.generateCandidates("password123"));

/*



function readRulesSync(filePath) {
  const data = fs.readFileSync(filePath, 'utf-8');
  const lines = data.split(/\r?\n/);
let i=0;
let success=0;
let fail=0;
  for (const line of lines) {
    if (line.trim() === '') continue;
   hashcat.reverseTheRule("password",line); 

  }
  
}
  */
/*
readRulesSync('fuzz.rule');
*/