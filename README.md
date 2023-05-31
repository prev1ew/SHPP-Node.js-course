# SHPP-Node.js-course
I start (one more) course, now I'm trying to learn Node.js

Why? Because it's more popular in my country (Ukraine)
And given that I already know Django (python), it won't take long (or shouldn't at least).

I'll update this file according to the current stage I am in.

## 1. Intro to JS

... So, 1st "stage" of the course is "intro to JS", what it means:
### 1.1 Data types & operators. Objects and functions
<details>
  
  <summary>Details</summary>

  1. Learn basics:
  
  <details>
  <summary>Links</summary>
    
  1. https://learnxinyminutes.com/docs/javascript/
  
  2. https://learn.javascript.ru/
  
  3. https://blog.angular-university.io/javascript-for-java-developers/ 
  
  4. https://medium.com/capital-one-tech/look-inside-javascript-by-java-developer-f3a20998e47b 
  
  5. https://medium.com/@byrne.greg/transitioning-from-java-to-javascript-quick-guide-on-the-basics-you-need-to-immediately-know-ef95140a7d71
  
  </details>
  
  2. Time to practice:
  Create a "Product" constructor function to create objects. 
  <details>
  <summary>Details</summary>
  Create following properties and methods:
    
  - property ID (str)
  
  - property name (str)
  
  - proterty description (str)
  
  - property price (double)
  
  - property brand (str)
  
  - property sizes (array of ['XS', 'S', 'M', 'L', 'XL', 'XXL'])
  - property activeSize
  - property quantity
  - property date
  - property reviews = array of {id, author, date, comment, rating = array of {key(str), value(int)}}
  - property images
  - method getProperty()
  - method setProperty()
  
  Create functions:
  - search (searches product in products array by name/description)
  - sort (sorts products according by second parameter) (it should support sorting by id/name/price)
</details>
  </details>

### 1.2 QUIZ (1)
<details>
  
  
  <summary>Details</summary>
  
  
  The meaning of this part is to "confirm" the knowledge. I won't publish all the questions I had to answer, only several of them, so you can "guess" what kind of questions there were:
  
  - what is "var"?
  
  - what the difference between "const" and "let" ?
  
  - what is "__proto__" ? 
  
  - what of "string, char, boolean, float, double, number, object, array, function, int" JS has?
  
</details>

### 1.3 Reqular expressions
1. Learn:
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
- search on YouTube if you do not feel comfortable enough to do the practice part

2. Practice:

<details>
  
  
  <summary>Details</summary>
  
  
Create "Validator" object, with 3 methods:

1. validateEmail() ... format `first@second.end`:
  
  <details>
    
    
  <summary>Details</summary>

    
- first part: can contain a letter/numbers/"-"/".", can't start with "-" or ".", size 2-20 symbols

- second part: can contain ".!$%&’*+/=?^_-", size 1-15 sumbols

- end part: 1-5 letters

Examples:
  
`fi@secondpart.end` = valid
  
`first-part@.se=cond%p.art.end` = valid
  
`first.part@se=cond%part.r` = valid
  

`f@secondart.end,` = invalid
  
`first-part@.se=cond@part.end` = invalid
  
`-firstpart@.se=cond%.enddeded` = invalid
  
`firs_tpart@.se.en` = invalid
  
`firstpart@.se.enddeded` = invalid
  
  </details>
  
 2. validatePhone() ... format `+38 (099) 567 8901`:
  
  <details>
    
    
  <summary>Details</summary>
    
    
  - "+380" is optional part
  - "(099)" == "099" (parentheses are optional)
  - "-" and " " allower everywhere
  - max size == 25 symbols with spaces and other symbols (may be checked outside RegExp check)
  
  Examples:
  
`+38 (099) 567 8901` = valid
  
`+38 099 5 6 7 8 9  01` = valid
  
`(09-9) 567-890-1` = valid
  
`--  (099) 567 890-1 ` = valid
  

`+38 (099) 567 8901 0` = invalid
  
`+38 099 a0000000` = invalid
  
`+38 (0989) 567 8901` = invalid
  
`+48 (0989) 567 8901` = invalid
  
  </details>
  
  3. validatePassword() ... :
  
  <details>
    
    
  <summary>Details</summary>
  
    
  - size >= 8 symbols
  
  - symbol = letter/number/"_"
  
  - must contain et least 1 uppercase letter, 1 lowercase letter, 1 number
  
  Examples:
  
  `C00l_Pass` = valid
  
  `SupperPas1` = valid
  
  `Cool_pass` = invalid
  
  `C00l` = invalid
</details>
