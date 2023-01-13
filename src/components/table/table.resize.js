import $ from '../../core/dom'

export default function resize(event, $root) {
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
    if (type === 'col') {
      const val = coords.width + delta
      $parent.css({ width: toPx(val) })
      $root.findAll(`[data-col="${$parent.data.col}"]`)
        .forEach(el => $(el).css({ width: toPx(val) }))
    } else {
      const val = coords.height + delta
      $parent.css({ height: toPx(val) })
    }
    $resizer.css({
      opacity: 0,
      right: 0,
      bottom: 0,
    })
  }
}

function toPx(value) {
  return `${value}px`
}
