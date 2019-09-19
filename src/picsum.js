const sketch = require('sketch')
const { DataSupplier, Settings } = sketch
const { toArray } = require('util')

import insertImage, { getImageFromURL } from 'sketch-image-downloader'

export function onStartup () {
  DataSupplier.registerDataSupplier('public.image', 'Lorem Picsum', 'SupplyRandomPhoto')
}

export function onShutdown () {
  DataSupplier.deregisterDataSuppliers()
}

export function onSupplyRandomPhoto (context) {
  const dataKey = context.data.key
  const items = toArray(context.data.items).map(sketch.fromNative)

  items.forEach((layer, index) => {
    let w = layer.frame.width
    let h = layer.frame.height
    let imageURL = `https://picsum.photos/${w}/${h}`
    getImageFromURL(imageURL).then(imagePath => {
      DataSupplier.supplyDataAtIndex(dataKey, imagePath, index)
    })
  })
}
