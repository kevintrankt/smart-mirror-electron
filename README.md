# Smart Mirror

[![License](http://img.shields.io/badge/Licence-MIT-brightgreen.svg)](LICENSE)

# Introduction

Smart Mirror frontend build with Angular 6(+) and Electron (Typescript + SASS + Hot Reload).

- Angular v6.1.2
- Electron v2.0.7
- Electron Builder v20.28.1

## Getting Started

Clone this repository locally and install dependencies with npm :

```bash
git clone https://github.com/kevintrankt/smart-mirror-electron.git
cd smart-mirror-electron
npm install -g @angular/cli
npm install
```

## To build for development

- **in a terminal window** -> npm start
### How to Make a Widget
1. Modify `/src/assets/config.json` to include any API keys or user information needed.
2. Modify `/src/app/data.service.ts` to make any API calls.
	```javascript
	getXXX() {
		const apiKey = this.config.apiKeys.yourAPIKey;
		const userParameter = this.activeUser.yourUserParameter;
		const url  = `https://example.com_apikey=${apiKey}&example=${userParameter}`;
		return this.http.get(url);
	}
	```
3. Run `ng g c WIDGETNAME` in the root directory of the Electron project.
4. Replace the contents of `/src/app/WIDGETNAME/WIDGETNAME.component.html` with
	```html
	<div  ngDraggable  ngResizable  class="widget-body">{{greeting}} {{response}}</div>
	```
5. Modify `/src/app/WIDGETNAME/WIDGETNAME.component.ts` to import the Data service
	```typescript
	import { DataService } from '../data.service';
	```
6. In the same file, replace everything below `export class WIDGETNAME...` with the following:
	```typescript
		constructor(private data: DataService) {}
		greeting = 'Widget Works!';
		response;
		ngOnInit() {
			setInterval(()  =>  {
				this.data.getDuration().subscribe(
					data => {this.response = data;},
					error => console.log(error),
					()=>{
						console.log(this.response);
					}
				);
			},  60);
		}
	}
	```
	You can modify the `setInterval` method to indicate how often the Smart Mirror will make an API call.
	
7. Modify `/src/app/components/home/home.component.html` to recognize the new widget in `config.json`.

	Add the following line to the widget set 1 block:
	```html
	<app-WIDGETNAME *ngIf="widget == X" [ngClass]="'widget-' + i"></app-WIDGETNAME>
	```
	And the following line to the widget set 2 block:
	```html
	<app-WIDGETNAME *ngIf="widget == X" [ngClass]="'widget2-' + i"></app-WIDGETNAME>
	```
	Where X is equal to the number of existing widgets + 2. This value will represent the widget's ID.

## Commands

| Command                    | Description                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| `npm run ng:serve:web`     | Execute the app in the browser                                                                   |
| `npm run build`            | Build the app. Built files are in the /dist folder.                                              |
| `npm run build:prod`       | Build the app with Angular aot. Built files are in the /dist folder.                             |
| `npm run electron:local`   | Builds application and start electron                                                            |
| `npm run electron:linux`   | Builds application and creates an app consumable on linux system                                 |
| `npm run electron:windows` | On a Windows OS, builds application and creates an app consumable in windows 32/64 bit systems   |
| `npm run electron:mac`     | On a macOS, builds application and generates a `.app` file of application that can be run on Mac |
