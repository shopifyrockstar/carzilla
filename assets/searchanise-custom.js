document.addEventListener('Searchanise.Loaded', function() {
  (function($) {
    var items;
    $(document).on('Searchanise.DataRequestEnd', function(event, type, params, data) {
      if (type == 'autocomplete') {
        items = data.items;
      }
    });

    $(document).on('Searchanise.AutocompleteUpdated', function(event, input, container) {
      $.each(items, function(index, data) {
        var product_wishlist_data = {
          'du'  : 'https://' + window.location.host + data.link,
          'epi' : data.add_to_cart_id,
          'empi': data.product_id,
          'iu'  : data.image_link,
          'pr'  : data.price
        };
        
        product_wishlist_data = JSON.stringify(product_wishlist_data);

        $('#snize-ac-product-' + this.product_id).find('a.snize-item').append(
          '<button class="snize-button snize-action-button snize-add-to-cart-button" data-add-to-cart-id="' + this.add_to_cart_id + '">Add to cart</button>' + 
          '<button class="swym-button swym-add-to-wishlist-view-product product_'+ this.product_id +'" data-swaction="addToWishlist" data-product-id="'+ this.product_id +'" data-product-data=\''+product_wishlist_data+'\'></button>'
        );
      });
      
      $('.swym-add-to-wishlist-view-product', container).addClass('swym-loaded');

      Searchanise.AddToSwymWishlist();
      
      $('button.swym-add-to-wishlist-view-product', container).unbind().click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();

        var product_data;
        var swym_button = this;
        var product_id = $(swym_button).data('product-id');

        if (window.SwymViewProducts[product_id]) {
          product_data = JSON.parse(JSON.stringify(window.SwymViewProducts[product_id]));
        } else {
          product_data = $(swym_button).data('product-data');
        }

        if ($(swym_button).hasClass('swym-added')) {
          window._swat.removeFromWishList(product_data, function() {
            $(swym_button).removeClass('swym-added');
          });
        } else {
          product_data.et = window.SwymTracker.EventTypes.addToWishList;
          window._swat.addToWishList(product_data, function() {
            $(swym_button).addClass("swym-added");
          });
        }
      });

      $('button.snize-add-to-cart-button', container).unbind().click(function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();


        var target = $(e.target);

        if (target.hasClass('size-button-view-cart')) {

          window.location.href = '/cart';
          return;
        }

        var ajaxData = {
          url: '/cart/add.js',
          data: {
            id: $(this).data('addToCartId'),
            quantity: 1
          }
        };

        $.ajax($.extend({
          method: 'post',
          dataType: 'json',
          beforeSend: function() {
            target.prop('disabled', true).data('text', target.text()).css('width', target.width() + 'px').text('...');
          },
          error: function(jqXHR) {
          },
          success: function(data, textStatus, jqXHR) {
            target.prop('disabled', false).addClass('size-button-view-cart').text("View cart");
          },
        }, ajaxData));
       
        return false;
      });

    });
  })(window.Searchanise.$);
});