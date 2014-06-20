/*
 * Copyright 2014, Gregg Tavares.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 * notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 * copyright notice, this list of conditions and the following disclaimer
 * in the documentation and/or other materials provided with the
 * distribution.
 *     * Neither the name of Gregg Tavares. nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";

var path = require('path');
var execFile = require('child_process').execFile;
var escapeString = require('escape-string-applescript');
var constants = require('../../constants');

//  "1": ["Ok", "Cancel"],
//  "2": ["Abort", "Retry", "Ignore"],
//  "3": ["Yes", "No", "Cancel"],
//  "4": ["Yes", "No"],
//  "5": ["Retry", "Cancel"],
//  "6": ["Cancel", "Try Again", "Continue"],

// stop: 0x10
// caution: 0x30
// question: 0x20

// Button results
// -1: no button
//  1: OK
//  2: Cancel button
//  3: Abort button
//  4: Retry button
//  5: Ignore button
//  6: Yes button
//  7: No button
// 10: Try Again button
// 11: Continue button

// native icons
// 0: stop
// 1: note ??
// 2: caution

var prompt = function(options, callback) {
  var icon = 0;

  switch (options.icon) {
    case constants.Icon.STOP:
      icon = 0x20;
      break;
    case constants.Icon.CAUTION:
      icon = 0x30;
      break;
  }

  var args = [];
  args.push(path.join(__dirname, 'prompt.vbs'));
  args.push('//Nologo');
  args.push(options.msg);
  args.push((options.type || 4) + icon);
  if (options.title) {
    args.push(options.title);
  }

  execFile('cscript.exe', args, function(err, stdout, stderr) {
    var result;
    if (!err) {
      var buttonPressed = stdout.toString().toLowerCase().trim();
      result = parseInt(buttonPressed);
    }
    if (!result) {
      result = 7; // No
      err = false;
    }
    callback(err, result);
  });
};

exports.prompt = prompt;
