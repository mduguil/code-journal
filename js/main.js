/* global data */
/* exported data */
var $formContainer = document.querySelector('#entry-form');
var $formHeader = document.querySelector('h1');
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
  $formHeader.textContent = 'New Entry';
  data.editing = null;
  data.view = 'entry-form';

  $form.elements.title.value = null;
  $form.elements.img.value = null;
  $form.elements.notes.value = null;
  $imgPreview.setAttribute('src', defaultImg);
}

function showEditEntries(event) {
  $formContainer.className = 'entry-form';
  $addEntryBtn.className = 'add-btn-container hidden';
  $entryContainer.className = 'container entry-container hidden';
  $formHeader.textContent = 'Edit Entry';
}

function hidePlaceholder(event) {
  $placeholderText.className = 'placeholder-container hidden';
}

function editEntry(event) {
  if (event.target.matches('i')) {
    showEditEntries();

    var $entryRow = event.target.closest('.entry-id');
    var $entryId = $entryRow.getAttribute('data-entry-id');

    for (var i = 0; i < data.entries.length; i++) {
      if (Number(data.entries[i].entryId) === Number($entryId)) {
        data.editing = data.entries[i];

        $form.elements.title.value = data.editing.title;
        $form.elements.img.value = data.editing.imgUrl;
        $form.elements.notes.value = data.editing.notes;
        $imgPreview.setAttribute('src', data.editing.imgUrl);
      }
    }
  }
}

function saveEntry(event) {
  event.preventDefault();

  if (data.editing === null) {
    var entry = {
      title: $title.value,
      imgUrl: $imgUrl.value,
      notes: $notes.value,
      entryId: data.nextEntryId
    };

    data.nextEntryId++;
    data.entries.unshift(entry);
    $ul.prepend(addEntries(entry));
  } else {
    for (var i = 0; i < data.entries.length; i++) {
      var currentId = data.editing.entryId;

      if (Number(data.entries[i].entryId) === Number(currentId)) {
        var currentEntryData = data.entries[i];
        currentEntryData.title = $form.elements.title.value;
        currentEntryData.img = $form.elements.img.value;
        currentEntryData.notes = $form.elements.notes.value;
        currentEntryData.entryId = currentId;

        var $entryList = document.querySelectorAll('.entry-id');
        $entryList[i].replaceWith(addEntries(currentEntryData));
      }
    }
  }

  data.editing = null;
  data.view = 'entries';
  $form.reset();
  showEntries();
  hidePlaceholder();
}

function addEntries(entry) {
  var $containerRow = document.createElement('div');
  $containerRow.setAttribute('class', 'row entry-id');
  $containerRow.setAttribute('data-entry-id', entry.entryId);

  var $containerColumn1 = document.createElement('div');
  $containerColumn1.setAttribute('class', 'column-half');
  $containerRow.appendChild($containerColumn1);

  var $entryImg = document.createElement('img');
  $entryImg.setAttribute('class', 'entry-img');
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

$form.addEventListener('submit', saveEntry);

$entryContainer.addEventListener('click', editEntry);

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
