/*
 * xing-grunt-revise
 *
 * Copyright (c) 2014 Erick Ruiz de Chavez
 * Copyright (c) 2015 Logical Reality Design
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  // if grunt is not provided, then expose internal API
  if ('object' !== typeof(grunt)) {
    return require('./lib/xing-revise').init(require('grunt'));
  }

  var revise = require('./lib/xing-revise').init(grunt);

  grunt.registerMultiTask('xing-revise', 'String Replace Task.', function() {
    this.requiresConfig('replacementsPath');
    var done = this.async(),
      replacements = grunt.file.readJSON(this.options.get('replacementsPath'));

    replacements = revise.normalize_replacements(replacements);

    revise.replace(this.files, replacements, done);
  });
};
