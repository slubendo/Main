// in a js file we dont need the script tag.


document.getElementById('heading').style.backgroundColor = "black";

//  a statement is a single line of javascript optionally ending in ;
//  javascript is case sensitive getElementById and getElementByID are different
// document.getElementsByClassName
// document.getElementsByTagName
// document.querySelector(cssSelector) - returns the first matched element
// document.querySelectorAll(cssSelector) - returns all of the matching elements

// JS is an object oriented language 
// OOP- object oriented programing
// Objects in JS used dot. notation
// left hand side of the dot. is an object
// window.innerHeight/ .window object is the default client side object
// Console. - object related to the console in the developer tools

// Main objects used are document. windows. console.

// have to change them individually 
// document.getElementsByTagName[0].style.color = 'red'
// if there are 100 paragraphs it doesn't translate well
// D.R.Y. Don't Repeat YourSelf
// for (let paragraph of document.getElementByTagName("p")){
//     paragraph.style.color = "red"
// }
