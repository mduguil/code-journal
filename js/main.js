/* global data */
/* exported data */

var $form = document.querySelector('form');
var $imgPreview = document.querySelector('.img-preview');
// var $title = document.querySelector('.title');
var $imgUrl = document.querySelector('.img-url');
// var $notes = document.querySelector('.notes');
// var $saveBtn = document.querySelector('.save');

$imgUrl.addEventListener('input', function (event) {
  $imgPreview.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  // var entry = {
  //   title: $title.textContent,
  //   imgUrl: $imgUrl.textContent,
  //   notes: $notes.textContent
  // };
});
