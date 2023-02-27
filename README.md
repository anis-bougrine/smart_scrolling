# smart_scrolling
## Description
- A generic light weight and smart horizontal scrolling function, supports button scrolling and touch scrolling.
- When scrolling an horizontal overflow element in a html page, this function going to figure out how many pages the element contains, where the size of the page is the element offsetwidth, and scrolling back and forward going to switch between pages.
- The power of this function can be seen when facing a dynamic overflow size, for example a text element where font-size variation can shrink or expand the overflow, this function can handle it, check the example section for a demo.
- Scrolling with button clicking and screen touching is synchronized.
- Particular cases where number of pages is a float not an integer, which leads to an incomplete page at the last page, is supported.
- This function can be easly transformed to vertical scrolling.
## Example running
An example of React application implementing the smart sroll function is provided to give you an idea on how it can be used. To see how it works please follow this steps:
```
cd smart_scrolling
cd Example
npm install react-scripts
npm start
```

Executing this commands will open a html page like the capture below, now it's up to you to enjoy scrolling :)

![Alt Text](./Example/Example_capture.png "Optional Title")
