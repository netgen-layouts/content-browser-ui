Netgen Content Browser user interface
=====================================

This repository contains the user interface for Netgen Content Browser.

Requirements
------------

* NodeJS
* NPM
* Grunt CLI (`npm install -g grunt-cli`)

First time build configuration
------------------------------

Before building the project for the first time, you need to fill some configuration
used by Grunt, namely domain and path prefix used to proxy requests to `/cb/api`
endpoints.

Copy `grunt.json.dist` file to `grunt.json` and change `domain` and `path_prefix` to
correct values. Usually, you will need to update only the domain, since the path is
preconfigured with a correct value.

Development build
-----------------

To build development assets and start watching files for changes, just run
Grunt without any arguments:

```
$ npm install
$ grunt
```

This will place all generated assets into `bundle/Resources/public/dev` folder.
Composer will symlink this folder to `bundles/contentbrowserui/dev` inside
Symfony's webroot.

Production build
----------------

To build the production assets, run Grunt with the following:

```
$ npm install
$ grunt build
```

This will place all generated assets into `bundle/Resources/public` folder.
Composer will symlink this folder to `bundles/contentbrowserui` inside
Symfony's webroot.
