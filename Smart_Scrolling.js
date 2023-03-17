const temp = 1;
const pixel_by_temp = 3;
const timeout = 1000;

/**
 * waits a specific number of ms.
 *
 * @param {number} ms - number of milliseconds to wait.
 * @returns {object} object of type Promise.
 */
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
* scrolls n pixels in a specific direction (left or right).
*
* @param {string} element - id of JSX element.
* @param {string} direction - direction of scroll (default:"right").
* @returns {undefined} undefined.
*/
function scrolling(element, direction="right"){
  if (direction === "right"){
    element.scrollLeft += pixel_by_temp;
  }
  else if (direction === "left"){
    element.scrollLeft -= pixel_by_temp;
  }
  else{
    console.error("no direction setted");
  }
}

/**
* handles scroll by clicking prev or next button.
*
* @param {string} element - id of JSX element.
* @param {string} direction - direction of scroll (default:"right").
* @returns {undefined} undefined.
*/
async function click_scrolling(element, direction){

  let shouldBreak = false;

  setTimeout(() => {
    shouldBreak = true;
  }, timeout); 

    const long_element = document.getElementById(element);

    let column_gap = window.getComputedStyle(long_element).getPropertyValue("column-gap");
    if (column_gap !== "normal"){
      column_gap = parseInt(column_gap);
    }else{
      column_gap = 0;
    }

    const box_size = long_element.offsetWidth + column_gap;
    const scrollWidth = long_element.scrollWidth + column_gap;
    let current_position = Math.round(long_element.scrollLeft / box_size)+1;

    //scroll right
    if ( direction === "right"){
      //scroll until next page
      while( !shouldBreak & (long_element.scrollLeft < (((current_position-1) * box_size) + box_size / 5 + 1))){
        scrolling(long_element, direction);
        await wait(temp);
      }
    }
    //scroll left
    else if ( direction === "left"){
      //Before while loop we calibrate page position (this is a specific case, if last page is reached and its size is less than 0.5*page_size)
      if (scrollWidth%box_size <= 0.51*box_size & scrollWidth - box_size <= long_element.scrollLeft ){
        current_position++;
      }
      //scroll until previous page
      while( !shouldBreak & ((current_position-1) * box_size) - box_size / 5 - 1 < long_element.scrollLeft){
        scrolling(long_element, direction);
        await wait(temp);
      }
      //we check if we reached last page and we didn't enter while loop (this is a specific case, if last page size is less than 4/5 page_size)
      if(scrollWidth - box_size <= long_element.scrollLeft){
        scrolling(long_element, direction); 
        // click_scrolling(element, direction)
      }
    }
}

/**
* makes hands scrolling smooth by stopping at prev/next page.
*
* @param {string} element - id of JSX element.
* @returns {undefined} undefined.
*/
async function smart_scrolling(element) {

  let shouldBreak = false;

  setTimeout(() => {
    shouldBreak = true;
  }, timeout); 

  const long_element = document.getElementById(element);
  const paddingLeft = parseInt(window.getComputedStyle(long_element).getPropertyValue("padding-left"));
  let column_gap = window.getComputedStyle(long_element).getPropertyValue("column-gap");
  if (column_gap !== "normal"){
    column_gap = parseInt(column_gap);
  }else{
    column_gap = 0;
  }

  //Static variables
  if ( typeof smart_scrolling.prevscroll == 'undefined' ) {
      smart_scrolling.prevscroll = 0 ;
  }
  const delta_scroll = long_element.scrollLeft-smart_scrolling.prevscroll;
  smart_scrolling.prevscroll = long_element.scrollLeft;

  if ( typeof smart_scrolling.last_scroll == 'undefined' ) {
      smart_scrolling.last_scroll = new Date(); 
  }
  const delta_time = new Date() - smart_scrolling.last_scroll;
  smart_scrolling.last_scroll = new Date();

  const box_size = long_element.offsetWidth+column_gap;
  const scrollWidth = long_element.scrollWidth + column_gap;
  let current_position = Math.round(long_element.scrollLeft / box_size)+1;

  console.log(current_position);

  //scrolling right
  if(delta_scroll > 0){
    //(i)==>(i+1)
    while(!shouldBreak & ((current_position-1)*box_size + box_size/ 5) < long_element.scrollLeft & long_element.scrollLeft < current_position * box_size - paddingLeft){
      scrolling(long_element, "right");
      await wait(temp);
    }
  //scrolling left
  }else if (delta_scroll < 0){
    //before while loop we calibrate page position (this is a specific case where we reach last page and its size is less than 0.5 page_size)
   
    if (scrollWidth%box_size <= 0.51*box_size & scrollWidth - box_size <= long_element.scrollLeft+10 ){
      current_position++;
    }
    //(i)==>(i-1)
    while(!shouldBreak & (current_position-2)*box_size - paddingLeft < long_element.scrollLeft & (long_element.scrollLeft < (current_position-1) * box_size - box_size/5)){
      scrolling(long_element, "left");
      await wait(temp);
    }

  }
}

export {click_scrolling};
export {smart_scrolling};
