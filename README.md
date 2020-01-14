# Template Build Preview

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.19.

* Clone the repo
* Run npm install
* Run ng serve
* Open http://localhost:4200/templates/demo
* Clone TEMPLATE_BUILD repo as well
* Run npm install
* No need to run ng serve

## Convert html page to angular component

* Create a new component in templates folder for a new template
* Create a path to the new template in pages-routing.module.ts
* Copy body of html to component html
* Mark section in html (refer to wiki for section names called class in wiki and values https://github.com/yitaolee/chumiweb/wiki/add-class-detail)
* Replace all values in html with data.section.someValue
* Replace repeated structure with ngFor
* Copy css to component css
* Upload js files to s3 and use loadScripts function to load them in ngOnInit

## Build Web Element

* Copy all methods of ts to test.component.ts under TEMPLATE_BUILD project
* Variable data does not need to be copied (required later in Test Web Element)
* Copy contents of css to test.component.scss under TEMPLATE_BUILD project
* Copy contents of html to test.component.html under TEMPLATE_BUILD project
* Run npm run build:ce
* chumi-element.js will be created in elements folder

## Test Web Element

* Go back to TEMPLATE_BUILD_PREVIEW project
* Copy the web element created from previous step to assets folder
* data need to be put in DefaultTemplateData class as a new public static readonly member
* Put a new case someTemplateName in getDefaultData in TemplateComponent Class
* Use http://localhost:4200/preview/someTemplateName to check if the page is loaded succesfully
* Rename it (e.g. chumi-someTemplateName.js) and upload to s3