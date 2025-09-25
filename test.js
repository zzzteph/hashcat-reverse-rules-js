
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

console.log("Truncate");
console.log(hashcat.applyReverseRule("p@ssW0","'6"));

console.log("Replace");
console.log(hashcat.applyReverseRule("p@$$W0rd","ss$"));

console.log("Purge");
console.log(hashcat.applyReverseRule("p@W0rd","@s"));


console.log("DuplicateFirst");
console.log(hashcat.applyReverseRule("ppp@ssW0rd","z2"));
console.log("DuplicateLast");
console.log(hashcat.applyReverseRule("p@ssW0rddd","Z2"));
console.log("Duplicate all");
console.log(hashcat.applyReverseRule("pp@@ssssWW00rrdd","q"));
console.log(hashcat.applyReverseRule("pp@@ssssWW000rrdd","q"));

console.log("Swap front");
console.log(hashcat.applyReverseRule("@pssW0rd","k"));
console.log(hashcat.applyReverseRule("@p","k"));
console.log(hashcat.applyReverseRule("1","k"));
console.log("Swap back");
console.log(hashcat.applyReverseRule("p@ssW0dr","K"));
console.log(hashcat.applyReverseRule("p@ssW0dr","K"));
console.log(hashcat.applyReverseRule("p@ssW0dr","K"));
console.log("Swap position");
console.log(hashcat.applyReverseRule("p@sWs0rd","*34"));
console.log(hashcat.applyReverseRule("pass","*34"));

console.log("Bitwise left");
console.log(hashcat.applyReverseRule("p@æsW0rd","L2"));


console.log("Bitwise right");
console.log(hashcat.applyReverseRule("p@9sW0rd","R2"));

console.log("ASCII increment");
console.log(hashcat.applyReverseRule("p@tsW0rd","+2"));
console.log("ASCII ddedcrement");
console.log(hashcat.applyReverseRule("p?ssW0rd","-1"));

console.log("Replace N+1");
console.log(hashcat.applyReverseRule("psssW0rd",".1"));
console.log("Replace N-1");
console.log(hashcat.applyReverseRule("ppssW0rd",",1"));


console.log("Duplicate N first");
console.log(hashcat.applyReverseRule("p@p@ssW0rd","y2"));
console.log(hashcat.applyReverseRule("pp@ssW0rd","y2"));


console.log("Duplicate N last");
console.log(hashcat.applyReverseRule("p@ssW0rdrd","Y2"));
console.log(hashcat.applyReverseRule("p@ssW0","Y2"));


console.log("Lower the words");
console.log(hashcat.applyReverseRule("P@ssw0rd W0rld","E"));
console.log("Lower the words");
console.log(hashcat.applyReverseRule("P@ssw0rd-W0rld","e-"));
