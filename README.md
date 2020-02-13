# gulp-dev

Automating frontend task using gulp4


## Getting Started

### Installing Dependencies
```bash
npm install
```

### `src` folder
Put your frontend files here
```bash
|── dist                # Distribution folder
|── src                 # Developement folder
|   |── **              # css, js, fonts, images, etc.
|   |── index.html      # Website entry file
|── gulpfile.js         # Automating scripts
```

### Bundling js files
** used for building distribution

```html
<!-- In your html files (etc. index.html, ...) -->
<!-- build:js js/main.min.js -->
    ... your js src files
<!-- endbuild -->
```

### Bundling css files
** used for building distribution

```html
<!-- In your html files (etc. index.html, ...) -->
<!-- build:css css/main.min.css -->
    ... your css href files
<!-- endbuild -->
```

### Running Development
** hot reload
```bash
gulp
```

### Build distribution
Folder path: `./dist`

```bash
gulp build
```

### Running Distribution
```bash
gulp serve:dist
```












