# Template Build Preview

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

## Convert html page to angular component

* Create a new component in templates folder for a new template
* Copy body of html to component html
* mark section in html (refer to wiki for section names and values)
* replace all values in html with data.section.someValue
* replace repeated structure with ngFor
* Copy css to component css
* Upload js files to s3 and use loadScripts function to load them in ngOnInit

## Build Web Element

* copy all methods of ts to test.component.ts under TEMPLATE_BUILD project
* copy contents of css to test.component.scss under TEMPLATE_BUILD project
* copy contents of html to test.component.html under TEMPLATE_BUILD project
* npm run build:ce
* chumi-element.js will be created in elements folder, rename it (e.g. chumi-someTemplateName.js)

## Test Web Element

* Copy the web element to assets folder
* Use http://localhost:4200/preview/someTemplateName to check if the page is loaded succesfully
* Upload to s3