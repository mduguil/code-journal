/* global data */
/* exported data */
var $formContainer = document.querySelector('#entry-form');
var $form = document.querySelector('form');
var $imgPreview = document.querySelector('.img-preview');
var defaultImg = $imgPreview.getAttribute('src');
var $title = document.querySelector('#title');
var $imgUrl = document.querySelector('#img-url');
var $notes = document.querySelector('#notes');
var $navbarEntries = document.querySelector('.nav-entries');
var $addEntryBtn = document.querySelector('.add-btn-container');
var $entryContainer = document.querySelector('.entry-container');
var $placeholderText = document.querySelector('.placeholder-container');

$imgUrl.addEventListener('input', function (event) {
  $imgPreview.setAttribute('src', event.target.value);
});

$navbarEntries.addEventListener('click', function (event) {
  $formContainer.className = 'hidden';
  $addEntryBtn.className = 'add-btn-container';
});

$addEntryBtn.addEventListener('click', function (event) {
  $formContainer.className = 'entry-form';
  $addEntryBtn.className = 'add-btn-container hidden';
});

if (data.entries.length === 0) {
  $placeholderText.className = 'placeholder-container';
}

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  var entry = {
    title: $title.value,
    imgUrl: $imgUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(entry);
  $imgPreview.setAttribute('src', defaultImg);
  $form.reset();
});

function addEntries(entry) {

  var $ul = document.createElement('ul');

  var $containerRow = document.createElement('div');
  $containerRow.setAttribute('class', 'row');
  $ul.appendChild($containerRow);

  var $containerColumn1 = document.createElement('div');
  $containerColumn1.setAttribute('class', 'column-half');
  $containerRow.appendChild($containerColumn1);

  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.imgUrl);
  $containerColumn1.appendChild($entryImg);

  var $containerColumn2 = document.createElement('div');
  $containerColumn2.setAttribute('class', 'column-half');
  $containerRow.appendChild($containerColumn2);

  var $entryTitle = document.createElement('li');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.textContent = entry.title;
  $containerColumn2.appendChild($entryTitle);

  var $entryNotes = document.createElement('li');
  $entryNotes.setAttribute('class', 'entry-notes');
  $entryNotes.textContent = entry.notes;
  $containerColumn2.appendChild($entryNotes);

  return $ul;
}

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $entryContainer.appendChild(addEntries(data.entries[i]));
  }
});
