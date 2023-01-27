import $ from '../../core/dom'

export default function resize(event, $root) {
  return new Promise(resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'col' ? 'bottom' : 'right'

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    })

    let delta = 0
    document.onmousemove = e => {
      if (type === 'col') {
        delta = e.x - coords.right
        $resizer.css({ right: toPx(-delta) })
      } else {
        delta = e.y - coords.bottom
        $resizer.css({ bottom: toPx(-delta) })
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      let val = null
      if (type === 'col') {
        val = coords.width + delta
        $parent.css({ width: toPx(val) })
        $root.findAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => $(el).css({ width: toPx(val) }))
      } else {
        val = coords.height + delta
        $parent.css({ height: toPx(val) })
      }

      $resizer.css({
        opacity: 0,
        right: 0,
        bottom: 0,
      })

      resolve({
        value: val,
        type,
        id: $parent.data[type],
      })
    }
  })
}

function toPx(value) {
  return `${value}px`
}
