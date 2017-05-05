## jQuery Modal [![npm version](http://img.shields.io/npm/v/@srph/jquery-modal.svg?style=flat)](https://npmjs.org/package/jquery-modal)
Spawn modals with jQuery.

[Demo](http://submariner-boar-66106.netlify.com/)

## Why?
- [NIH](https://en.wikipedia.org/wiki/Not_invented_here)
- Most similar plugins out there seem to be feature-complete but complicated

## Goals
- Simple yet customizable
- Terse API
- Transitions
- [Accessible](https://gist.github.com/ryanflorence/fd7e987c832cc4efaa56)

## Unsupported
- Nested modals (will not work)
- Old browsers (may work)

## Usage
```js
<button type="button" data-modal="#my-modal">
  Open Modal
</button>

<div id="my-modal">
  <!-- Modal Markup -->
  <button type="button" data-modal-close="#my-modal">
  	Close
  </button>
</div>
```

## API
```js
var $modal = $('#modal')
$modal.modal(opts) // Init
$modal.modal('open') // Progamatically open
$modal.modal('close') // Programatically close
```

### Options
| key | description | type | default |
|-----|-------------|------|---------|
|backdrop|Flag whether to use a backdrop, and attach a modal-close event to the backdrop)|`string` with the selector name or `false` to disable backdrop|The modal itself|
|escapable|Close modal on escape|`boolean`|`true`|

## Events
- `$modal.on('modal:open', cb)` - Triggered when modal is opened
- `$modal.on('modal:close', cb)` - Triggered when modal is closed

## Contributing
```bash
npm run example:build # Build example
npm run example:start # Build example, and watch for changes
open examples/index.html
```
