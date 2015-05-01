native-msg-box
==============

Allows you to display a native MessageBox / Dialog.

By native we mean an OS level, not a browser level dialog.

Example:
--------

    var msgbox = require('native-msg-box');
    msgbox.prompt({
      msg: "Hunt the Wumpus?",
      title: "Game"
    }, function(err, result) {
      switch (result) {
        case msgbox.Result.YES:
          console.log("pressed yes");
          break;
        case msgbox.Result.NO:
          console.log("pressed no");
          break;
      }
    });


API:

*   prompt(options, callback)

    **options**

    `msg` {string} REQUIRED The message to display

    `title` {string} optional. Title for dialog (not available on all OSes ... yet?)

    **callback**

    The callback gets passed an `err` and a `result`. At the moment `err` should always
    be `null`. `result` is one of

        Result.YES
        Result.NO

    Why not just a simple `true` or `false`? Because the future possibility of
    more values like `Cancel`, `Retry`, etc..

Prerequisites
-------------

Currently the Linux verison requires `wmctrl` and `zentiy`.

To Do
-----

*   Add more dialog types. For example

    *    a single string prompt `"Enter Name: ____"`
    *    other buttons like "Ok", "Cancel"



