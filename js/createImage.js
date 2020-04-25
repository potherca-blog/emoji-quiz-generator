const createImage = (window, urlSearchParams, html2canvas) => {
  const resizeFont = (subjectElement, container) => {
    const containerWidth = container.clientWidth
    const subjectWidth = subjectElement.clientWidth

    if (subjectWidth > containerWidth * 0.8) {
      // @FIXME: When font-size goes below 1/2 the subjectHeight, wrap across 2 lines (or 3, etc.)
      const fontSize = parseInt(window.getComputedStyle(subjectElement).fontSize, 10)
      const newFontSize = (fontSize * containerWidth * 0.8) / subjectWidth

      subjectElement.style.fontSize = newFontSize + 'px'
      subjectElement.style.margin = '0 0.35em'
      subjectElement.style.whiteSpace = 'normal'
    }
  }

  const resizeCanvas = (sourceCanvas, size) => {
    const targetCanvas = document.createElement('canvas')

    targetCanvas.width = size
    targetCanvas.height = size

    targetCanvas
      .getContext('2d')
      .drawImage(
        sourceCanvas,
        0,
        0,
        sourceCanvas.width,
        sourceCanvas.height,
        0,
        0,
        size,
        size
      )

    return targetCanvas
  }

  resizeFont(document.querySelector('.js-emoji'), document.querySelector('.emoji-song-quiz'))

  if (urlSearchParams.toString() == '') {
    // If no params are given, don't show the canvas but the form
    urlSearchParams.set('no-canvas', true)
    document.querySelector('.emoji-song-quiz').style.display = 'none'
    document.querySelector('.js-instructions').style.display = 'block'
  }

  const canvasContainer = document.querySelector('.canvas-container')

  if (urlSearchParams.has('no-canvas') === false) {
    canvasContainer.style.display = 'initial'
    const element = document.querySelector('.emoji-song-quiz')

    html2canvas(element).then(canvas => {
      canvas = resizeCanvas(canvas, 2560)
      canvasContainer.appendChild(canvas)
    })
  }
}
