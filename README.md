# SHPP-Node.js-course
I start (one more) course, now I'm trying to learn Node.js

Why? Because it's more popular in my country (Ukraine)
And given that I already know Django (python), it won't take long (or shouldn't at least).

I'll update this file according to the current stage I am in.

## 1. Intro to JS
... So, 1st "stage" of the course is "intro to JS", what it means:
### 1.1 Data types & operators. Objects and functions
  #### 1.1.1 Learn bunch of stuff. Links:
  1. https://learnxinyminutes.com/docs/javascript/
  2. https://learn.javascript.ru/
  3. https://blog.angular-university.io/javascript-for-java-developers/ 
  4. https://medium.com/capital-one-tech/look-inside-javascript-by-java-developer-f3a20998e47b 
  5. https://medium.com/@byrne.greg/transitioning-from-java-to-javascript-quick-guide-on-the-basics-you-need-to-immediately-know-ef95140a7d71
  
  1.1.2 Time to practice:
  Create a "Product" constructor function to create objects with the following properties and methods:
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
  - method getProperty(<propertyName>)
  - method setProperty(<propertyName>,<newValue>)
  
  Create functions:
  - search (searches product in products array by name/description)
  - sort (sorts products according by second parameter) (it should support sorting by id/name/price)
