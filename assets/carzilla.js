/**
 * Move extra content to #overflow
 *
 * @return null
 */
if (document.getElementById('output')) {
  (function moveToOverflow() {
    const output = document.getElementById('output');
    const overflow = document.getElementById('overflow');

    let position = 0;

    // Convert nodeList into an array
    const children = [...output.childNodes];

    // Find position of node containing the separator
    children.forEach((item, index) => {
      if(item.innerHTML == '---') {
        // Set the position based on matching node's index
        position = index;
        // Remove the node containing the separator
        item.remove();
      }
    });

    // If no separator text, return 
    if (position == 0) return;
    
    // Remove nodes from before the separator
    const overflowChildren = children.slice(position + 1);

    // Append nodes to overflow container
    overflowChildren.forEach((child) => {
      overflow.appendChild(child);
    });

    const link = '<p><a href="#overflow" class="t-red">Continue Reading...</a></p>';
    output.insertAdjacentHTML('beforeend', link);
    
  })();
}

/**
 * Wrap iframe in div
 *
 * @return null
 */
function iframeWrap(iframe) {
  // Return if no iFrame
  if (iframe == null) {
    console.error('No iframe element provided; iframeWrap()');
    return;
  }

  // Create an empty div to serve as a wrapper element
  const wrapper = document.createElement('div');
  // Add class to wrapper element
  wrapper.classList.add('youtube-wrapper');
  // Insert the wrapper before the current iframe
  iframe.parentNode.insertBefore(wrapper, iframe);
  // Append the iframe to the wrapper element
  wrapper.appendChild(iframe);
}

/**
 * Wrap blog iFrame in container element
 */
if (document.querySelectorAll('.templateArticle').length > 0 && document.querySelectorAll('iframe[src*=youtube]').length > 0) {
  const iframe = document.querySelectorAll('iframe');

  // For Each iframe on the page wrap it in a .youtube-wrapper div
  iframe.forEach((item) => {
    iframeWrap(item);
  });
}

/**
 * Add Product Review Video(s) to Video Section
 */
if (document.getElementById('product-review-video')) {
  const reviewTitle = document.getElementById('product-review-title');
  const reviewArea = document.getElementById('product-review-video');
  const iframe = document.querySelectorAll('iframe[src*=youtube]');

  // Check if there are any iframe elements before execution
  if (iframe.length > 0) {
    // For Each iFrame, Append it to the #product-review-video area
    iframe.forEach((item) => {
      reviewArea.appendChild(item);
    });

    // Insert a heading for review section
    reviewTitle.innerHTML = `<h2 class="c-title t-xxxl t-center">Product Review</h2>`;

    // Wrap each iframe with a .youtube-wrapper div
    reviewArea.querySelectorAll('iframe').forEach((item) => {
      iframeWrap(item);
    });
  }
}

if (document.querySelector("#cart_block")) {
  // Adds class to ajax cart, so wholesale plugin can hook into cart and apply discounts
  document.querySelector("#cart_block").addEventListener("mouseover", function() { document.querySelector("#cart_block").classList.add("is-cart-hovered") });
  document.querySelector("#cart_block").addEventListener("mouseout", function() { document.querySelector("#cart_block").classList.remove("is-cart-hovered") });
}



$(".single-option-selector").mouseleave(function(){
  var v = $(".met").val();
  if (v=='Out of stock'){
  $(".metbutton").show();
  }else{
     $(".metbutton").hide();
  }
})

// $(document).ready(function(){
//     $('ul.shopify-tabs > li').click(function(){
//       var tab_id = $(this).attr('data-tab');

//       $(this).parent().find('li').removeClass('current');
//       $('.shopify-tab-content').removeClass('current');

//       $(this).addClass('current');
//       $("#"+tab_id).addClass('current');
//     })
//   })

document.getElementsByClassName("tablinks")[0].click();
function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;
console.log('z',cityName);
  // Get all elements with class="tabcontent" and hide them
   $(".tabvetcontent").hide();
  $(".tablinks").removeClass("active");
  $("."+cityName).show();  

  // Get all elements with class="tablinks" and remove the class "active"
//   tablinks = document.getElementsByClassName("tablinks");
//   for (i = 0; i < tablinks.length; i++) {
//     tablinks[i].className = tablinks[i].className.replace(" active", "");
//   }

//   // Show the current tab, and add an "active" class to the link that opened the tab
//   document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
  

}

$(document).ready(function(){
     
  $(".hdlink").click(function(){
   
    $('.hdlink').css("color","#000000")
    $(this).css("color","#E05946");
   
    var id = $(this).attr('hds');
    
    $('.hdv').hide();
    $("."+id).show();
  
  })
  
  })