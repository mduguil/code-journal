/* global data */
/* exported data */

var $imgUrl = document.querySelector('.img-url');
var $imgPreview = document.querySelector('.img-preview');

$imgUrl.addEventListener('input', function (event) {
  $imgPreview.setAttribute('src', event.target.value);
});
