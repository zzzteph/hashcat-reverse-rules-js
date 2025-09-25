# hashcat-reverse-rules-js

The library is used to **reverse** the password based on **hashcat rules**. Given a final password and one or more Hashcat rules, the library generates candidate inputs that - when the rules are applied - produce that final password.

```
Password123 ---- > Password, $1$2$3
```

This is useful for improving wordlists, narrowing down candidate inputs, and for research into rule-based password transformations. For background on rules and rule syntax, see the [Hashcat wiki](https://hashcat.net/wiki/doku.php?id=rule_based_attack).





## Installation

```sh
npm install hashcat-reverse-rules-js
```

### Compiles and minifies for production

```sh
npm run build
```




## Usage


### applyReverseRule

```
function applyReverseRule(password, rule, memlimit=65000, limit=10)
```

Generate possible input candidates that would become a password after applying the rule.


The **applyReverseRule** function takes the following options:

 - **password** (required): The password to which the rules will be applied.
 - **rule** (required): Rules compatible with the Hashcat rules engine.
 - **memlimit** (optional):  Maximum memory (or total candidates) to allow while generating results. Defaults to 65000.
 - **limit**(optional): Max candidates produced by a single part of a multi-part rule. Defaults to 10.
 


The **reverseRule** function returns an array of strings (candidates) that will generate the initial password with specific rules. If no candidates could be generated, the empty[] array will be returned.

```javascript
import reverse from 'hashcat-reverse-rules-js';

console.log(reverse.applyReverseRule('password', 'l'));
/*
[
  'PASSWORD', 'Password',
  'pASSWORD', 'PAssword',
  'PASSWOrd', 'PASSWord',
  'PASsword', 'PASSWORd',
  'PASSword'
]
*/
```


### reversePassword

Try to deduce likely candidate inputs and the rules that could produce the given password.

```
function reversePassword(string, withRules=false)
```

The **reversePassword** function takes the following options:

 - **string** (required): The password to which the rules will be applied.
 - **withRules** (required): output the rules for the candidate
 
 

An array of candidate strings, or an array of objects when withRules is true (each object contains the candidate and the rule(s) that produced it). If no candidates are found, returns an empty array [].



```javascript
console.log(hashcat.reversePassword("P@assword123"));

[
  'P@assword12',
  'P@assword1',
  'P@assword',
  'p@assword123',
  'p@assword12',
  'p@assword1',
  'p@assword'
]

```








### Supported rules

|Name|Function|Description|Example Rule|Input Word|Output Word|
| --- | --- | --- | --- | --- | --- |
|Nothing|:|Do nothing (passthrough)|:|p@ssW0rd|p@ssW0rd|
|Lowercase|	l|Lowercase all letters|	l|p@ssW0rd	|p@ssw0rd	|
|Uppercase|u|Uppercase all letters	|u|p@ssW0rd	|P@SSW0RD|
|Capitalize|	c|Capitalize the first letter and lower the rest	|c|p@ssW0rd	|	P@ssw0rd|
|Invert Capitalize	|C|Lowercase first found character, uppercase the rest	|C|p@ssW0rd	|p@SSW0RD|
|Toggle Case	|	t|Toggle the case of all characters in word.	|t|p@ssW0rd	|P@SSw0RD	|
|Toggle @	|TN|Toggle the case of characters at position N	|T3|p@ssW0rd	|p@sSW0rd	|
|Reverse|	r|Reverse the entire word	|r|p@ssW0rd	|dr0Wss@p	|
|Duplicate|d|Duplicate entire word	|d|p@ssW0rd	|p@ssW0rdp@ssW0rd	|
|Duplicate N	|pN|Append duplicated word N times	|p2|p@ssW0rd	|p@ssW0rdp@ssW0rdp@ssW0rd	|
|Reflect|f|Duplicate word reversed	|f|p@ssW0rd	|p@ssW0rddr0Wss@p	|
|Rotate Left	|{|Rotate the word left.	|	{|p@ssW0rd	|@ssW0rdp	|
|Rotate Right	|}|Rotate the word right	|}|p@ssW0rd	|dp@ssW0r	|
|Append Character	|$X	|Append character X to end	|$1	|p@ssW0rd	|p@ssW0rd1	|
|Prepend Character	|^X	|Prepend character X to front	|^1	|p@ssW0rd	|1p@ssW0rd	|
|Truncate left	|[|Delete first character	|[|p@ssW0rd	|@ssW0rd	|
|Trucate right	|]|Delete last character	|	]|p@ssW0rd	|p@assW0r	|
|Delete @ N	|DN|Delete character at position N	|D3|p@ssW0rd	|p@sW0rd	|
|Extract range	|xNM|Extract M characters, starting at position N	|x04|p@ssW0rd	|p@ss	|
|Omit range	|ONM|Delete M characters, starting at position N	|O12|p@ssW0rd	|psW0rd	|
|Insert @ N	|iNX|Insert character X at position N	|i4!	|p@ssW0rd	|p@ss!W0rd	|
|Overwrite @ N	|oNX|Overwrite character at position N with X	|o3$	|p@ssW0rd	|p@s$W0rd	|
|Truncate @ N		|'N	|Truncate word at position N	|'6	|p@ssW0rd	|p@ssW0	|
|Replace	|sXY|Replace all instances of X with Y	|ss$	|p@ssW0rd	|p@$$W0rd	|
|Purge	|@X	|Purge all instances of X	|@s	|p@ssW0rd	|p@W0rd	|
|Duplicate first N|zN	|Duplicate first character N times		|z2|p@ssW0rd	|ppp@ssW0rd	|
|Duplicate last N|ZN|Duplicate last character N times	|Z2|p@ssW0rd	|p@ssW0rddd	|
|Duplicate all|q|Duplicate every character	|q|p@ssW0rd	|pp@@ssssWW00rrdd	|
|Swap front|k|	Swap first two characters|k|p@ssW0rd	|@pssW0rd	|
|Swap back|K|	Swap last two characters	|K|p@ssW0rd	|p@ssW0dr	|
|Swap @ N|*NM|	Swap character at position N with character at position M|*34|p@ssW0rd	|p@sWs0rd	|
|Bitwise shift left|LN|Bitwise shift left character @ N	|L2|p@ssW0rd	|p@æsW0rd	|
|Bitwise shift right|RN|Bitwise shift right character @ N	|	R2|p@ssW0rd	|p@9sW0rd	|
|ASCII increment|+N|	Increment character @ N by 1 ascii value|+2|p@ssW0rd	|p@tsW0rd	|
|ASCII decrement|-N|Decrement character @ N by 1 ascii value	|-1|p@ssW0rd	|p?ssW0rd	|
|Replace N + 1|.N|	Replace character @ N with value at @ N plus 1	|.1|p@ssW0rd	|psssW0rd	|
|Replace N - 1|,N|	Replace character @ N with value at @ N minus 1	|,1|p@ssW0rd	|ppssW0rd	|
|Duplicate block front|yN|	Duplicate first N characters	|y2|p@ssW0rd	|	p@p@ssW0rd	|
|Duplicate block back|YN|	Duplicate last N characters	|Y2|p@ssW0rd	|	p@ssW0rdrd	|
|Title|E|Lower case the whole line, then upper case the first letter and every letter after a space	|E|p@ssW0rd	|P@ssw0rd W0rld	|
|Title w/separator|e|Lower case the whole line, then upper case the first letter and every letter after a custom separator character	|e-|p@ssW0rd	|P@ssw0rd-W0rld	|
