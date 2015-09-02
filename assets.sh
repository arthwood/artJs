#!/bin/sh

sass css/artjs.sass css/artjs.css

assetspkg -c config/assets.dev.yml -r . --js-source src --css-source css --js-bundle-to ./bundled --css-bundle-to ./bundled --js-no-minify --js-indent 2
assetspkg -c config/assets.min.yml -r . --js-source src --css-source css --js-bundle-to ./bundled --css-bundle-to ./bundled
