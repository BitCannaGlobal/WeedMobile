<template>
  <div>
    <p>
      Track function:
      <select v-model="selected">
        <option v-for="option in options" :key="option.text" :value="option">
          {{ option.text }}
        </option>
      </select>
      <v-select
        v-model="selected"
        :hint="`${selected.text}, ${selected.value}`"
        :items="options"
        item-title="text"
        item-value="value"
        label="Select"
        persistent-hint
        return-object
        single-line
      ></v-select>
    </p>

    <qrcode-stream :track="selected.value" @error="logErrors" />
    <p>result: {{ result }}</p>
  </div>
</template>

<script> 

export default { 

  data() {
    const options = [
      { text: 'nothing (default)', value: undefined },
      { text: 'outline', value: this.paintOutline },
      { text: 'centered text', value: this.paintCenterText },
      { text: 'bounding box', value: this.paintBoundingBox }
    ]

    const selected = options[1]
    let result = 'test'
    return { selected, options, result }
  },

  methods: {
    paintOutline(detectedCodes, ctx) { 
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },

    paintBoundingBox(detectedCodes, ctx) { 
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#007bff'
        ctx.strokeRect(x, y, width, height)
      }
    },

    paintCenterText(detectedCodes, ctx) {
      
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue
        const { boundingBox, rawValue } = detectedCode

        const centerX = boundingBox.x + boundingBox.width / 2
        const centerY = boundingBox.y + boundingBox.height / 2

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)
        console.log(boundingBox.width, ctx.canvas.width)

        ctx.font = `bold ${fontSize}px sans-serif`
        ctx.textAlign = 'center'

        ctx.lineWidth = 3
        ctx.strokeStyle = '#35495e'
        ctx.strokeText(detectedCode.rawValue, centerX, centerY)

        ctx.fillStyle = '#5cb984'
        ctx.fillText(rawValue, centerX, centerY)
      }
    },

    logErrors: console.error
  }
}
</script>