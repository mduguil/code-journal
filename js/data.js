/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataEntry = localStorage.getItem('data-entries');

if (previousDataEntry !== null) {
  data = JSON.parse(previousDataEntry);
}

window.addEventListener('beforeunload', function (event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('data-entries', dataJSON);
});
