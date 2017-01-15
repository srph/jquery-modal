## jQuery Modal
[WIP] A small plugin to spawn modals with terse API that also handles Web Accessibility.

## Goals
- Simple yet customizable
- Terse API
- [Accessibility](https://gist.github.com/ryanflorence/fd7e987c832cc4efaa56)

## Usage
```
<button type="button" data-modal="#my-modal">
  Open Modal
</button>

<div id="my-modal">
  <!-- Modal Markup -->
  <button type="button" data-modal-close="my-modal">
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
- `$modal.on('modal:open')` - Triggered when modal is opened
- `$modal.on('modal:close')` - Triggered when modal is closed

## Contributing
```
npm run example:build # Build example
npm run example:start # Build example, and watch for changes
open examples/index.html
```