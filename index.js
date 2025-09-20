function endingsUpToThreeNumbersProcessing(input) {
    const result = new Map();
    const match = input.match(/(\d+)$/);
    if (match) {
        const numbers = match[1]; 
        const numLength = numbers.length;
        for (let i = 1; i <= numLength; i++) {
            const remainingString = input.slice(0, -i);
            const extractedNumbers = numbers.slice(-i).split('').map(n => `$${n}`).join(' ');
            result.set(remainingString, extractedNumbers);
        }
    }

    return result;
}

function endingsSpecAndNumberProcessing(input) {
    const result = new Map();
    const specialCharRegex = /[@#$%^&*()]$/;
    const secondLastRegex = /(\d|[@#$%^&*()])$/;
    if (specialCharRegex.test(input)) {
        const lastChar = input.slice(-1);
        const remainingAfterLastChar = input.slice(0, -1);
        if (secondLastRegex.test(remainingAfterLastChar)) {
            const secondLastChar = remainingAfterLastChar.slice(-1);
            const remainingString = remainingAfterLastChar.slice(0, -1);
            result.set(remainingString, `$${secondLastChar} $${lastChar}`);
        }
        result.set(remainingAfterLastChar, `$${lastChar}`);
    }

    return result;
}

function processYearEnding(input) {
    const result = new Map();
    const yearWithSpecialCharRegex = /(19[7-9][0-9]|20[0-2][0-6])([@#$%^&*()!])$/;
    if (yearWithSpecialCharRegex.test(input)) {
        const match = input.match(yearWithSpecialCharRegex);
        const year = match[1]; // Extract the year
        const specialChar = match[2];
        const remainingString = input.slice(0, -year.length - 1); // Remove year and special character
        const formattedYear = year.split('').map(char => `$${char}`).join('');
        result.set(remainingString, `${formattedYear}$${specialChar}`);
    } else {
        const yearRegex = /(19[7-9][0-9]|20[0-2][0-6])$/;
        if (yearRegex.test(input)) {
            const year = input.match(yearRegex)[0];
            const remainingString = input.slice(0, -year.length);
            const formattedYear = year.split('').map(char => `$${char}`).join('');
            result.set(remainingString, formattedYear);
        }
    }

    return result;
}

function processSpecialCharEnding(input) {
    const result = new Map();
    const specialCharRegex = /([@#$%^&*()!]{1,4})$/;
    if (specialCharRegex.test(input)) {
        const match = input.match(specialCharRegex)[0];
        const numSpecialChars = match.length;
        for (let i = 1; i <= numSpecialChars; i++) {
            const remainingString = input.slice(0, -i);
            const formattedSpecialChars = match.slice(-i).split('').map(char => `$${char}`).join(' ');
            result.set(remainingString, formattedSpecialChars);
        }
    }

    return result;
}
function processPatternEnding(input) {
    const result = new Map();

    const patterns = [
        "12345",
        "1234",
        "123",
        "12345!",
        "1234!",
        "123!",
        "!12345",
        "!1234",
        "!123",
        "123!@#",
        "1234!@#",
    ];


    for (const pattern of patterns) {
        if (input.endsWith(pattern)) {
            const remainingString = input.slice(0, -pattern.length);
            const formattedPattern = pattern
                .split('')
                .map(char => `$${char}`)
                .join('');
            result.set(remainingString, formattedPattern);
            break; 
        }
    }

    return result;
}

function processCapitalisedFirstLetter(input) {
    const result = new Map();
    if(input.length==0)return result;
    if (input[0] === input[0].toUpperCase() && input[0] !== input[0].toLowerCase()) {
        const modifiedString = input[0].toLowerCase() + input.slice(1);
        result.set(modifiedString, 'c'); 
    }

    return result;
}

function processPrefixPatterns(input) {
    const result = new Map();
    const yearRegex = /^(200[0-9]|201[0-9]|202[0-6])/;
    const numberRegex = /^\d+/;
    const specialPrefixes = ["!@#", "!@", "!"];

    for (const prefix of specialPrefixes) {
        if (input.startsWith(prefix)) {
            const remainingString = input.slice(prefix.length); 
            const reversedPrefix = prefix.split('').reverse().map(char => `^${char}`).join(''); 
            result.set(remainingString, reversedPrefix);
            return result; 
        }
    }

    if (yearRegex.test(input)) {
        const year = input.match(yearRegex)[0];
        const remainingString = input.slice(year.length); 
        const reversedYear = year.split('').reverse().map(char => `^${char}`).join(''); 
        result.set(remainingString, reversedYear);
        return result; 
    }

    if (numberRegex.test(input)) {
        const number = input.match(numberRegex)[0];
        const remainingString = input.slice(number.length); 
        const reversedNumber = number.split('').reverse().map(char => `^${char}`).join(''); 
        result.set(remainingString, reversedNumber);
        return result; 
    }

    return result; 
}

function processDoubledWords(input) {
    const result = new Map();
    const doubledRegex = /^(.+)\1$/;
    if (doubledRegex.test(input)) {
        const word = input.match(doubledRegex)[1]; 
        result.set(word, 'd'); 
    }

    return result;
}

function processReversedDoubles(input) {
    const result = new Map();
    if (input.length % 2 === 0) {
        const halfLength = input.length / 2;
        const firstHalf = input.slice(0, halfLength);
        const secondHalf = input.slice(halfLength).split('').reverse().join(''); 
        if (firstHalf === secondHalf) {
            result.set(firstHalf, 'f'); 
        }
    }

    return result;
}

function addResultsToMap(sourceMap, additionalMap) {
    additionalMap.forEach((value, key) => {
        if(key.length!=0) sourceMap.set(key, value.replace(/\s+/g, ''));
    });
    return sourceMap;
}

function addResultsToMapWithRule(sourceMap, additionalMap,rule) {
    additionalMap.forEach((value, key) => {
        if(key.length!=0)
        sourceMap.set(key, (value+rule).replace(/\s+/g, ''));
    });
    return sourceMap;
}

function secondRoundCandidates(string)
{
    let candidates = new Map();
    addResultsToMap(candidates, endingsUpToThreeNumbersProcessing(string));
    addResultsToMap(candidates, endingsSpecAndNumberProcessing(string));
    addResultsToMap(candidates, processYearEnding(string));
    addResultsToMap(candidates, processSpecialCharEnding(string));
    addResultsToMap(candidates, processPatternEnding(string));
    addResultsToMap(candidates, processPrefixPatterns(string));
    addResultsToMap(candidates, processCapitalisedFirstLetter(string));
    addResultsToMap(candidates, processDoubledWords(string));
    addResultsToMap(candidates, processReversedDoubles(string));
    
    return candidates;
}


export function generateCandidates(string, withRules=false)
{
    let candidates = new Map();

    addResultsToMap(candidates, endingsUpToThreeNumbersProcessing(string));
    addResultsToMap(candidates, endingsSpecAndNumberProcessing(string));
    addResultsToMap(candidates, processYearEnding(string));
    addResultsToMap(candidates, processSpecialCharEnding(string));
    addResultsToMap(candidates, processPatternEnding(string));
    addResultsToMap(candidates, processPrefixPatterns(string));
    addResultsToMap(candidates, processCapitalisedFirstLetter(string));
    addResultsToMap(candidates, processDoubledWords(string));
    addResultsToMap(candidates, processReversedDoubles(string));
    let secondRound=new Map();
    for (const [key, value] of candidates.entries()) {
            addResultsToMapWithRule(secondRound,secondRoundCandidates(key),value);
    }
    addResultsToMap(candidates, secondRound);

    if(withRules)return candidates;
    let result=[];
    
    for (const [key, value] of candidates.entries()) {
        result.push(key)
    }
    return result;


}






function convertN(chr) {
    if (typeof chr === 'number')
    {
        return chr;
    }
    if (chr >= '0' && chr <= '9') {
        return Number(chr);
    }
    return Number(chr.toUpperCase().charCodeAt(0) - 55);

}


function Nothing(string) {
    //return the same string
    return [string];
}

function Lowercase(string) {
    string=string.toLowerCase()
    //return max 65k candidates
    let lowerCasedCandidates=[];
    //Uppercase
    lowerCasedCandidates.push(string.toUpperCase());
    //Capital
    lowerCasedCandidates.push(string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());
    //inverse Capital
    lowerCasedCandidates.push(string.charAt(0).toLowerCase() + string.slice(1).toUpperCase());

    //We will not generate all the candidates, since it could be very resourcefull
    //Password
    /*  PAssword
        PASsword
        PASSword
    */
    for (let i = 0; i < string.length; i++) {
        let chars = string.split('');
        for (let j = 0; j <= i; j++) {
        chars[j] = chars[j].toUpperCase();
        }
        lowerCasedCandidates.push(chars.join(''));
    }
    return lowerCasedCandidates;
}

function Uppercase(string) {
    string=string.toUpperCase()
    let upperCasedCandidates=[];
    //Lowercase
    upperCasedCandidates.push(string.toLowerCase());
    //Capital
    upperCasedCandidates.push(string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());
    //inverse Capital
    upperCasedCandidates.push(string.charAt(0).toLowerCase() + string.slice(1).toUpperCase());

    //We will not generate all the candidates, since it could be very resourcefull
    //Password
    /*  
        PAssword
        PASsword
        PASSword
    */
    for (let i = 0; i < string.length; i++) {
        let chars = string.split('');
        for (let j = 0; j <= i; j++) {
        chars[j] = chars[j].toLowerCase();
        }
        upperCasedCandidates.push(chars.join(''));
    }
    return upperCasedCandidates;

}

function Capitalize(string) {
    string= string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    let capCasedCandidates=[];
    //Lowercase
    capCasedCandidates.push(string.toLowerCase());
    //Capital
    capCasedCandidates.push(string.toUpperCase());
    //inverse Capital
    capCasedCandidates.push(string.charAt(0).toLowerCase() + string.slice(1).toUpperCase());


    capCasedCandidates=capCasedCandidates.concat(Uppercase(string));
    capCasedCandidates=capCasedCandidates.concat(Lowercase(string));
    return capCasedCandidates;
}

function InvertCapitalize(string) {

    string= string.charAt(0).toLowerCase() + string.slice(1).toUpperCase();

    let invcapCasedCandidates=[];
    //Lowercase
    invcapCasedCandidates.push(string.toLowerCase());
    //Capital
    invcapCasedCandidates.push(string.toUpperCase());
    //inverse Capital
    invcapCasedCandidates.push(string.charAt(0).toUpperCase() + string.slice(1).toLowerCase());


    invcapCasedCandidates=invcapCasedCandidates.concat(Uppercase(string));
    invcapCasedCandidates=invcapCasedCandidates.concat(Lowercase(string));
    return invcapCasedCandidates;



}


function ToggleCase(string) {
    var result=[];
    for (var i = 0; i < string.length; i++) {
        result = TogglePosition(string, i);
    }
    return result;
}



function TogglePosition(string, pos) {
    pos = convertN(pos);
    if (string.charAt(pos) === string.charAt(pos).toUpperCase()) {
        return [string.slice(0, pos) + string.charAt(pos).toLowerCase() + string.slice(pos + 1)];
    }
    else if (string.charAt(pos) === string.charAt(pos).toLowerCase()) {
        return [string.slice(0, pos) + string.charAt(pos).toUpperCase() + string.slice(pos + 1)];
    }
}



function Reverse(string) {
    return [string.split('').reverse().join('')];
}


function Duplicate(string) {

    const len = string.length;
    if (len % 2 !== 0) return []; 

    const half = string.slice(0, len / 2);
    if (half.repeat(2) === string) {
        return [half];
    }
    return [];
}

function DuplicateN(string, n) {
    n = convertN(n);
    if (n <= 0) return [];

    let len = string.length;
    if (len % n !== 0) return [];

    let part = string.slice(0, len / n);
    if (part.repeat(n) === string) {
        return [part];
    }
    return [];
}

function Reflect(string) {
    const len = string.length;
    if (len % 2 !== 0) return [];

    const half = string.slice(0, len / 2);
    const reflected = half + half.split('').reverse().join('');

    if (reflected === string) {
        return [half];
    }
    return [];
}

function RotateLeft(string) {
    //if rotate left - then it should be rotated right
    //return [string.slice(1) + string.charAt(0)];
    return [string.charAt(string.length - 1) + string.slice(0, string.length - 1)];
}


function RotateRight(string) {
//return string.charAt(string.length - 1) + string.slice(0, string.length - 1);
return [string.slice(1) + string.charAt(0)];

    
}

function AppendCharacter(string, chr) {
      if (string.endsWith(chr)) {
    return [string.slice(0, -chr.length)];
  }
  return [];
}

function PrependCharacter(string, chr) {
     if (string.startsWith(chr)) {
    return [string.slice(chr.length)];
  }
  return [];
}

function TruncateLeft(string) {

    let charset = "!@#$";
    let numbers = "1234567890";
    charset = charset + numbers;
    /*
    let result = [];
    for (let ch of charset) {
        result.push(ch + string);
    }*/
    return [charset[Math.floor(Math.random() * charset.length)] + string];




} 

function TruncateRight(string) {


    let charset = "!@#$";
    let numbers = "1234567890";
    charset = charset + numbers;
/*
  let result = [];
  for (let ch of charset) {
    result.push(string + ch);
  }*/
  return [string + charset[Math.floor(Math.random() * charset.length)]];



}


function DeleteN(string, n) {

    n = convertN(n);

    let charset = "qazwsxedcrfvtgbyhnujmikopl";
    let numbers = "1234567890";
    charset = charset + charset.toUpperCase() + numbers;
    if(n>string.length)return [string];

    return [string.slice(0, n) + charset[Math.floor(Math.random() * charset.length)] + string.slice(n)];

}



function ExtractRange(string, start, length) {
    start = convertN(start);
    length = convertN(length);

  if (!Number.isInteger(start) || start < 0 || start > string.length) return [];
  if (!Number.isInteger(length) || length <= 0) return [];

  let commonPasswords = [
    "123456","password","qwerty","111111","12345678","abc123",
    "password1","123456789","1234567890","12345","000000","iloveyou",
    "admin","welcome","monkey","dragon"
  ];

  let years = Array.from({ length: 2050 - 1900 + 1 }, (_, i) => String(1900 + i));

  let baseNames = [
    "john","michael","david","daniel","james","robert",
    "mary","jennifer","linda","patricia","susan","jessica",
    "maria","anna","andrew","thomas","alex","kate","olga","dmitry"
  ];
  let names = [
    ...baseNames,
    ...baseNames.map(n => n.charAt(0).toUpperCase() + n.slice(1))
  ];

  let numbers = Array.from({ length: 999 }, (_, i) => String(i + 1));


  let candidatesAll = [...commonPasswords, ...years, ...names, ...numbers];
  let candidates = []
  for(let i=0;i<candidatesAll.length;i++)
  {
    if(candidatesAll[i].length!==length)continue;
    if(!candidates.includes(candidatesAll[i]))candidates.push(candidatesAll[i]);
  }

  let prefix = string.slice(0, start);
  let suffix = string.slice(start);
  return candidates.map(ins => prefix + ins + suffix);

}

function OmitRange(string, start, end) {
    return ExtractRange(string, start, end);
}

function InsertN(string, pos, chr) {
    pos = convertN(pos);
    
    //if pos > then length, return string
    if (pos < 0 || pos >= string.length) {
        return [string];
    }

    //remove character
    if ( string[pos] === chr) {
        return [string.slice(0, pos) + string.slice(pos + 1)];
    }

    //Not same letter ? empty
    return [];


}

function OverwriteN(string, pos, chr) {
    pos = convertN(pos);


  if (pos < 0 || pos >= string.length) {
    return [string];
  }

    let charset = "qazwsxedcrfvtgbyhnujmikopl";
    let numbers = "1234567890";
    charset = charset + charset.toUpperCase() + numbers;
  if (string[pos].toLowerCase() === chr.toLowerCase()) {
    let result = [];
    for (let repl of charset) {
      result.push(string.slice(0, pos) + repl + string.slice(pos + 1));
    }
    return result;
  }


  return [];



}

function TruncateN(string, start) {
   
    start = convertN(start);

  if (!Number.isInteger(start) || start < 0) return [];


  let commonPasswords = [
    "123456","password","qwerty","111111","12345678","abc123",
    "password1","123456789","1234567890","12345","000000","iloveyou",
    "admin","welcome","monkey","dragon"
  ];

  let years = Array.from({ length: 2050 - 1900 + 1 }, (_, i) => String(1900 + i));

  let baseNames = [
    "john","michael","david","daniel","james","robert",
    "mary","jennifer","linda","patricia","susan","jessica",
    "maria","anna","andrew","thomas","alex","kate","olga","dmitry"
  ];
  let names = [
    ...baseNames,
    ...baseNames.map(n => n.charAt(0).toUpperCase() + n.slice(1))
  ];

  let numbers = Array.from({ length: 999 }, (_, i) => String(i + 1));
  let candidatesAll = [...commonPasswords, ...years, ...names, ...numbers];
  let prefix = string.slice(0, start);
  let suffix = string.slice(start);
  return candidatesAll.map(ins => prefix + ins + suffix);



}


function Replace(string, find, replace) {
    return [string.replaceAll(replace, find)];
}


function Purge(string, chr) {
    

  if (string.includes(chr)) return [string];
  const pos = Math.floor(Math.random() * (string.length + 1));

  return string.slice(0, pos) + chr + string.slice(pos);

}

function DuplicateFirstN(string, n) {

  n = convertN(n);
  if (!string) return [string];
  const first = string[0];
  let i = 1;
  while (i < string.length && string[i] === first) {
    i++;
  }
  let toRemove = Math.min(n, i - 1);

  return [string.slice(0, 1) + string.slice(1 + toRemove)];


}

function DuplicateLastN(string, n) {

    n = convertN(n);
  if (!string) return string;
  let last = string[string.length - 1];
  let i = string.length - 2;
  while (i >= 0 && string[i] === last) {
    i--;
  }
  const toRemove = Math.min(n, string.length - 1 - i - 1);

  return [string.slice(0, string.length - toRemove)];
}

function DuplicateAll(string) {


  if (!string) return [string];

  let res = "";
  let i = 0;

  while (i < string.length) {
    res += string[i]; 
    if (i + 1 < string.length && string[i + 1] === string[i]) {
      i += 2; 
    } else {
      i += 1; 
    }
  }

  return [res];

}



function applyReverseRuleToPassword(password, rule)
{


    for (var i = 0; i < rule.length;) {
        switch (rule.charAt(i)) {
            case ':':
                return Nothing(password);
            case 'l':
                return Lowercase(password);
            case 'u':
                return Uppercase(password);           
            case 'c':
                return Capitalize(password);    
            case 'C':
                return InvertCapitalize(password);        
            case 't':
                return ToggleCase(password);        
            case 'T':
                return TogglePosition(password, rule.charAt(i + 1));
            case 'r':
                return Reverse(password);
            case 'd':
                return  Duplicate(password);
            case 'p':
                return  DuplicateN(password, rule.charAt(i + 1));
            case 'f':
               return Reflect(password);
            case '{':
               return RotateLeft(password);
            case '}':
                return RotateRight(password);
            case '$':
                return AppendCharacter(password, rule.charAt(i + 1));
            case '^':
                return PrependCharacter(password, rule.charAt(i + 1));
            case '[':
                return TruncateLeft(password);
            case ']':
                return TruncateRight(password);
            case 'D':
                return DeleteN(password, rule.charAt(i + 1));
            case 'x':
                return ExtractRange(password, rule.charAt(i + 1), rule.charAt(i + 2));
            case 'O':
                return OmitRange(password, rule.charAt(i + 1), rule.charAt(i + 2));
            case 'i':
                return  InsertN(password, rule.charAt(i + 1), rule.charAt(i + 2));
            case 'o':
                return  OverwriteN(password, rule.charAt(i + 1), rule.charAt(i + 2));
            case '\'':
                return  TruncateN(password, rule.charAt(i + 1));
            case 's':
                return Replace(password, rule.charAt(i + 1), rule.charAt(i + 2));
            case '@':
               return Purge(password, rule.charAt(i + 1));
            case 'z':
                return DuplicateFirstN(password, rule.charAt(i + 1));
            case 'Z':
                return DuplicateLastN(password, rule.charAt(i + 1));
            case 'q':
                return DuplicateAll(password);


        }



    }


}




function applyReverseRule(passwords, rule)
{
    let applied_array=[];
    let lngth=passwords.length;
    for(let i=0;i<lngth;i++)
    {
       applied_array= applied_array.concat(applyReverseRuleToPassword(passwords[i],rule));
    }

    //making array uniq
    let uniq_applied_array=new Set()
     lngth=applied_array.length;
    for(let i=0;i<applied_array.length;i++)
    {
        uniq_applied_array.add(applied_array[i])
    }
    return Array.from(uniq_applied_array);
}




export function reverseTheRule(password, rule, memlimit=65000) {

    let rulesGrams=[]
    
    if (rule.trim().charAt(0) === '#') return [password];
    if (rule.trim().length === 0) return [password];
    for (var i = 0; i < rule.length;) {
        switch (rule.charAt(i)) {
            case ':':
                rulesGrams.push(":");
                i++;
                break;
            case 'l':
                rulesGrams.push("l");
                i++;
                break;
            case 'u':
                rulesGrams.push("u");
                i++;
                break;
            case 'c':
                rulesGrams.push("c");
                i++;
                break;
            case 'C':
                rulesGrams.push("C");
                i++;
                break;
            case 't':
                rulesGrams.push("t");
                i++;
                break;
            case 'T':
                rulesGrams.push("T".concat(rule.charAt(i + 1)));

                i += 2;
                break;
            case 'r':
                rulesGrams.push("r");
                i++;
                break;
            case 'd':
                rulesGrams.push("d");
                i++;
                break;
            case 'p':
                rulesGrams.push("p".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case 'f':
                rulesGrams.push("f");
                i++;
                break;
            case '{':
                rulesGrams.push("{");
                i++;
                break;
            case '}':
                rulesGrams.push("}");
                i++;
                break;
            case '$':
                rulesGrams.push("$".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case '^':
                rulesGrams.push("^".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case '[':
                rulesGrams.push("[");
                i++;
                break;
            case ']':
                rulesGrams.push("]");
                i++;
                break;
            case 'D':
                rulesGrams.push("D".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case 'x':
                rulesGrams.push("x".concat(rule.charAt(i + 1)).concat(rule.charAt(i + 2)));
                i += 3;
                break;
            case 'O':
               rulesGrams.push("O".concat(rule.charAt(i + 1)).concat(rule.charAt(i + 2)));
                i += 3;
                break;
            case 'i':
                rulesGrams.push("i".concat(rule.charAt(i + 1)).concat(rule.charAt(i + 2)));
                i += 3;
                break;
            case 'o':
               rulesGrams.push("o".concat(rule.charAt(i + 1)).concat(rule.charAt(i + 2)));
                i += 3;
                break;
            case '\'':
                rulesGrams.push("'".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case 's':
                rulesGrams.push("s".concat(rule.charAt(i + 1)).concat(rule.charAt(i + 2)));
                i += 3;
                break;
            case '@':
                rulesGrams.push("@".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case 'z':
                rulesGrams.push("z".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case 'Z':
                rulesGrams.push("Z".concat(rule.charAt(i + 1)));
                i += 2;
                break;
            case 'q':
                rulesGrams.push("q");
                i++;
                break;
            default:
                i++;
                break;
        }



    }
    if( rulesGrams.length==0)
    {
        return [password];
    }
    rulesGrams = rulesGrams.reverse();
    let candidates=[];
    for (var i = 0; i < rulesGrams.length; i++) 
    {    
        if(i==0)
        {
            candidates=applyReverseRule([password],rulesGrams[i]);
        }
        else
        {
            candidates=applyReverseRule(candidates,rulesGrams[i]);
        }
        if(memlimit!==false && candidates.length>memlimit)
        {
            break;
            throw new Error(`Rule "${rule}" consumes too much memory`);
        }
    }



    return candidates;


}


