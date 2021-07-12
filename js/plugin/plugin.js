jQuery.fn.extend({
  getText: function () {
      return this.text()
  },
  getId: function () {
      return this.data('id');
  },
  // urlParam: function (name) {
  //   var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  //   if (results == null) {
  //     return null;
  //   }
  //   return decodeURI(results[1]) || 0;
  // }
})

$.urlParam = function (name) {
  var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  if (results == null) {
    return null;
  }
  return decodeURI(results[1]) || 0;
}

