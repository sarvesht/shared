// Generated by CoffeeScript 1.6.3
(function() {
  var $,
    _this = this;

  $ = jQuery;

  $.widget("fbBoard.auth", {
    _create: function() {
      var _this;
      this.firebase = new Firebase('https://board.firebaseio.com');
      _this = this;
      this.auth = new FirebaseSimpleLogin(this.firebase, function(error, user) {
        if (error === null && user !== null) {
          _this.loggedInUser = user.email;
          return _this._loggedIn(user);
        } else if (error != null) {
          alert(error.message);
          return _this.loggedInUser = '';
        } else {
          return _this.loggedInUser = '';
        }
      });
      this.element.addClass("authenticator");
      this.element.html("<div class='container'>");
      this.element.find('.container').html("<div class='sup'><span class='signup'>Signup</span>&nbsp;&nbsp;<span class='login'>Login</span><span class='status'></span></div>");
      this.element.find('.container').append("<div class='auth' style='display: none'><table><tr><td><span class='authemail'>Email</span></td><td><input type='email' id='authemail'></td></tr><tr><td><span class='authpassword'>Password</span></td><td><input type='password' id='authpassword'></td></tr><tr><td colspan='2'><input type='button' id='authlogin' value='Login'>&nbsp;<span class='cancel'>(Cancel)</span></td></tr></table></div>");
      this.element.find('.container').append("<div class='reg' style='display: none'><table><tr><td><span class='regemail'>Email</span></td><td><input type='email' id='regmail' required></td></tr><tr><td><span class='regpassword'>Password</span></td><td><input type='password' id='regpassword' required></td></tr><tr><td colspan='2'><input type='button' id='regsubmit' value='Signup'>&nbsp;<span class='cancel'>(Cancel)</span></td></tr></table></div>");
      $('.signup').on('click', this._showLogin);
      $('.login').on('click', this._showAuth);
      $('.cancel').on('click', this._cancel);
      $('.logout').live('click', {
        context: this
      }, this._logout);
      $('#regsubmit').on('click', {
        context: this
      }, this._register);
      return $('#authlogin').on('click', {
        context: this
      }, this._login);
    },
    _loggedIn: function(user) {
      $('.auth').hide();
      $('.reg').hide();
      $('.signup').hide();
      $('.login').hide();
      $('#form').fadeIn();
      $('.status').html(user.email + " logged in. (<span class='logout'>Logout</span>)");
      return $("#listing").postViewer();
    },
    _cancel: function() {
      $('.auth').hide();
      $('.reg').hide();
      $('.signup').show();
      $('.login').show();
      return $('.status').html('');
    },
    _logout: function(event) {
      $('.signup').show();
      $('.login').show();
      $('.status').html('');
      $('#form').fadeOut();
      return event.data.context.auth.logout();
    },
    _showLogin: function() {
      $('.auth').hide();
      return $('.reg').show();
    },
    _showAuth: function() {
      $('.reg').hide();
      return $('.auth').show();
    },
    _register: function(event) {
      if ($("#regmail")[0].checkValidity() && $("#regpassword")[0].checkValidity()) {
        return event.data.context.auth.createUser($("#regmail").val(), $("#regpassword").val(), function(error, user) {
          if (!error) {
            return console.log('User Id: ' + user.id + ', Email: ' + user.email);
          } else {
            return alert(error);
          }
        });
      }
    },
    _login: function(event) {
      return event.data.context.auth.login('password', {
        email: $("#authemail").val(),
        password: $("#authpassword").val(),
        rememberMe: true
      });
    },
    GetCurrentUser: function() {
      return this.loggedInUser;
    }
  });

}).call(this);

/*
//@ sourceMappingURL=authenticationWidget.map
*/
