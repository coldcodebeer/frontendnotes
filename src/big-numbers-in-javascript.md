Unlike many other programming languages, JavaScript does not define different types of numbers, like integers, short, long, floating-point etc.

JavaScript numbers are always stored as double precision floating point numbers, following the international IEEE 754 standard.

This format stores numbers in 64 bits, where the number (the fraction) is stored in bits 0 to 51, the exponent in bits 52 to 62, and the sign in bit 63.

- [Going BIG with JavaScript: Numbers](https://javascript.plainenglish.io/going-big-with-javascript-numbers-71616cac8e44)

### Videos
1. [Bartek Szopka: Everything you never wanted to know about JavaScript numbers -- JSConf EU 2013](https://www.youtube.com/watch?v=MqHDDtVYJRI&ab_channel=JSConf)
   - [ieee754 visualization](http://bartaz.github.io/ieee754-visualization/)
2. [JS Bitwise Operators and Binary Numbers](https://www.youtube.com/watch?v=RRyxCmLX_ag&ab_channel=SteveGriffith-Prof3ssorSt3v3)
3. [Alexander Reardon: Let's go big (Big numbers in JavaScript) | JSConf EU 2017](https://www.youtube.com/watch?v=9SHOfZI_SsM&ab_channel=JSConf)

### Sum of two large numbers
```javascript
function findSum(str1, str2) {
  // Before proceeding further, make sure length
  // of str2 is larger.
  if (str1.length > str2.length) {
    const temp = str1
    str1 = str2
    str2 = temp
  }

  // Take an empty String for storing result
  let str = ''

  // Calculate length of both String
  const n1 = str1.length, n2 = str2.length, diff = n2 - n1

  // Initially take carry zero
  let carry = 0

  // Traverse from end of both Strings
  for (let i = n1 - 1; i >= 0; i--) {
    const sum = (str1.charAt(i) - '0') + (str2.charAt(i + diff) - '0') + carry

    str += sum % 10
    carry = Math.floor(sum / 10)
  }

  // Add remaining digits of str2[]
  for (let i = n2 - n1 - 1; i >= 0; i--) {
    const sum = (str2.charAt(i) - '0') + carry

    str += sum % 10
    carry = Math.floor(sum / 10)
  }

  // Add remaining carry
  if (carry > 0)
    str += carry

  return str.split('').reverse().join('')
}
```