// Generated by CoffeeScript 1.6.3
(function() {
  var $,
    _this = this;

  $ = jQuery;

  $.widget("fbBoard.postViewer", {
    _create: function() {
      this.firebase = new Firebase('https://board.firebaseio.com');
      return this.element.addClass("postViewer");
    },
    _init: function() {
      var _this = this;
      this.element.html('');
      this.element.html("<ul></ul>");
      _this = this;
      this.firebase.off('child_added');
      this.firebase.on('child_added', function(snapshot) {
        var html, key;
        key = _this._removeSpecialCharacters(snapshot.val().key);
        html = "<li class='" + key + "'><div><header><a href='" + (snapshot.val().url) + "' target='_blank'>" + (snapshot.val().url) + "</a></header><section>" + (snapshot.val().description) + "<img src='http://api.thumbalizr.com/?url="+ snapshot.val().url+"&width=100'</section><footer>Posted by " + (snapshot.val().user);
        if (snapshot.val().user === $("#authentication").auth('GetCurrentUser')) {
          html = html + ("&nbsp;<span class='delete' data-key='" + (snapshot.val().key) + "'>(Delete)</span>");
        }
        html = html + "</footer></div></li>";
        _this.element.append(html);
        return $('.delete').live('click', {
          context: _this
        }, _this._deletePost);
      });
      return this.firebase.on('child_removed', function(snapshot) {
        return $('.' + _this._removeSpecialCharacters(snapshot.val().key)).remove();
      });
    },
    _deletePost: function(event) {
      var ref;
      ref = new Firebase('https://board.firebaseio.com/' + $(event.target).data('key'));
      return ref.remove();
    },
    _triggerClick: function(event) {
      var descVal, urlVal;
      event.preventDefault();
      event.stopPropagation();
      urlVal = $(event.target.form.postURL).val();
      descVal = $(event.target.form.postDescription).val();
      return event.data.context.firebase.addPost({
        key: event.data.context._escapeSpecialCharacters(urlVal),
        url: urlVal,
        description: descVal
      });
    },
    _escapeSpecialCharacters: function(str) {
      if (!str) {
        return false;
      }
      str = str.toLowerCase();
      return str = str.replace(/\./g, ',');
    },
    _removeSpecialCharacters: function(str) {
      if (!str) {
        return false;
      }
      str = str.toLowerCase();
      return str = str.replace(/\,/g, '');
    }
  });

}).call(this);

/*
//@ sourceMappingURL=postViewer.map
*/
