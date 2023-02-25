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
* scrolls 10 pixels in a specific direction (left or right).
*
* @param {string} element - id of JSX element.
* @param {string} direction - direction of scroll (default:"right").
* @returns {undefined} undefined.
*/
function scrolling(element, direction="right"){
  if (direction === "right"){
    element.scrollLeft += 10;
  }
  else if (direction === "left"){
    element.scrollLeft -= 10;
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

    const long_element = document.getElementById(element);

    const box_size = long_element.offsetWidth;
    let current_position = Math.round(long_element.scrollLeft / box_size)+1;
    console.log(current_position);

    //scroll right
    if ( direction === "right"){
      //scroll until next page
      while( (long_element.scrollLeft < (((current_position-1) * box_size) + box_size / 5 + 1)) & (long_element.scrollLeft != long_element.scrollWidth-box_size) ){
        scrolling(long_element, direction);
        await wait(10);
      }
    }
    //scroll left
    else if ( direction === "left"){
      //Before while loop we calibrate page position (this is a specific case, if last page is reached and its size is less than 0.5*page_size)
      if (long_element.scrollWidth%box_size <= 0.5*box_size & long_element.scrollWidth - box_size <= long_element.scrollLeft+10 ){
        current_position++;
      }
      //scroll until prevuois page
      while( ((current_position-1) * box_size) - box_size / 5 - 1 < long_element.scrollLeft & (long_element.scrollLeft != 0)){
        scrolling(long_element, direction);
        await wait(10);
      }
      //we check if we reached last page and we didn't enter while loop (this is a specific case, if last page size is less than 4/5 page_size)
      if(long_element.scrollWidth - box_size <= long_element.scrollLeft+10){
        scrolling(long_element, direction); 
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

  const long_element = document.getElementById(element);
  
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

  const box_size = long_element.offsetWidth;
  let current_position = Math.round(long_element.scrollLeft / box_size)+1;

  //scrolling right
  if(delta_scroll > 0){
    //(i)==>(i+1)
    while(((current_position-1)*box_size + box_size/ 5) < long_element.scrollLeft & long_element.scrollLeft < current_position * box_size & long_element.scrollLeft != (long_element.scrollWidth - box_size)){
      scrolling(long_element, "right");
      await wait(10);
    }
  //scrolling left
  }else if (delta_scroll < 0){
    //before while loop we calibrate page position (this is a specific case where we reach last page and its size is less than 0.5 page_size)
    if (long_element.scrollWidth%box_size <= 0.5*box_size & long_element.scrollWidth - box_size <= long_element.scrollLeft+10 ){
      current_position++;
    }
    //(i)==>(i-1)
    while((current_position-2)*box_size < long_element.scrollLeft & (long_element.scrollLeft < (current_position-1) * box_size - box_size/5) & long_element.scrollLeft != 0 ){
      scrolling(long_element, "left");
      await wait(10);
    }

  }
}

export {click_scrolling};
export {smart_scrolling};