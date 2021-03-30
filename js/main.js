/* global data */
/* exported data */

var $form = document.querySelector('form');
var $imgPreview = document.querySelector('.img-preview');
var defaultImg = $imgPreview.getAttribute('src');
var $title = document.querySelector('#title');
var $imgUrl = document.querySelector('#img-url');
var $notes = document.querySelector('#notes');
// var $saveBtn = document.querySelector('.save');

$imgUrl.addEventListener('input', function (event) {
  $imgPreview.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  var entry = {
    title: $title.value,
    imgUrl: $imgUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };
  event.preventDefault();
  data.nextEntryId++;
  data.entries.push(entry);
  $imgPreview.setAttribute('src', defaultImg);
  $form.reset();
});
