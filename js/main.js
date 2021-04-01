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
var $ul = document.querySelector('ul');

function showEntries(event) {
  $formContainer.className = 'hidden';
  $addEntryBtn.className = 'add-btn-container';
  $entryContainer.className = 'container entry-container';
  data.view = 'entries';

  if (data.entries.length === 0) {
    $placeholderText.className = 'placeholder-container';
  }
}

function showForm(event) {
  $formContainer.className = 'entry-form';
  $addEntryBtn.className = 'add-btn-container hidden';
  $entryContainer.className = 'container entry-container hidden';
  data.view = 'entry-form';
}

function hidePlaceholder(event) {
  $placeholderText.className = 'placeholder-container hidden';
}

function submitEntry(event) {
  event.preventDefault();

  var entry = {
    title: $title.value,
    imgUrl: $imgUrl.value,
    notes: $notes.value,
    entryId: data.nextEntryId
  };

  data.nextEntryId++;
  data.entries.unshift(entry);
  data.view = 'entries';
  $imgPreview.setAttribute('src', defaultImg);
  $form.reset();
  $ul.prepend(addEntries(entry));
  showEntries();
  hidePlaceholder();
}

function addEntries(entry) {
  var $containerRow = document.createElement('div');
  $containerRow.setAttribute('class', 'row');
  $ul.prepend($containerRow);

  var $containerColumn1 = document.createElement('div');
  $containerColumn1.setAttribute('class', 'column-half');
  $containerRow.appendChild($containerColumn1);

  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('src', entry.imgUrl);
  $containerColumn1.appendChild($entryImg);

  var $containerColumn2 = document.createElement('div');
  $containerColumn2.setAttribute('class', 'column-half');
  $containerRow.appendChild($containerColumn2);

  var $titleContainer = document.createElement('div');
  $titleContainer.setAttribute('class', 'title-container');
  $containerColumn2.appendChild($titleContainer);

  var $entryTitle = document.createElement('li');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.setAttribute('data-entry-id', entry.entryId);
  $entryTitle.textContent = entry.title;
  $titleContainer.appendChild($entryTitle);

  var $editIconContainer = document.createElement('div');
  $editIconContainer.setAttribute('class', 'edit-icon-container');
  $titleContainer.appendChild($editIconContainer);

  var $editIcon = document.createElement('i');
  $editIcon.setAttribute('class', 'fas fa-pen');
  $editIconContainer.appendChild($editIcon);

  var $entryNotes = document.createElement('li');
  $entryNotes.setAttribute('class', 'entry-notes');
  $entryNotes.textContent = entry.notes;
  $containerColumn2.appendChild($entryNotes);

  return $containerRow;
}

$navbarEntries.addEventListener('click', showEntries);

$addEntryBtn.addEventListener('click', showForm);

$imgUrl.addEventListener('input', function (event) {
  $imgPreview.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', submitEntry);

$entryContainer.addEventListener('click', function (event) {});

window.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(addEntries(data.entries[i]));
  }

  if (data.view === 'entries') {
    showEntries();
  } else {
    showForm();
  }
});
