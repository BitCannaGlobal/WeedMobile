<template>
  <div class="ma-4">
    <!-- <p>
      Track function:
      <select v-model="selected">
        <option v-for="option in options" :key="option.text" :value="option">
          {{ option.text }}
        </option>
      </select>
      <v-select
        v-model="selected" 
        :items="options"
        variant="outlined"
        item-title="text"
        item-value="value"
        label="Select" 
        return-object
        single-line
      ></v-select>
    </p> -->

    <qrcode-stream v-if="!removeScan" :track="selected.value" @error="logErrors" /> 
    <v-textarea class="mt-2" label="Result" variant="outlined"  :model-value="result"> </v-textarea>
    <v-btn 
      block 
      color="#0FB786" 
      @click="retry()">Rescan
    </v-btn>
  </div>
</template>

<script> 

export default { 

  data() {
    const removeScan = false
    const options = [
      //{ text: 'nothing (default)', value: undefined },
      // { text: 'outline', value: this.paintOutline },
      //{ text: 'centered text', value: this.paintCenterText },
      { text: 'bounding box', value: this.paintBoundingBox }
    ]

    const selected = options[0]
    let result = ''
    return { selected, options, result, removeScan }
  },

  methods: {
    retry() {
      this.removeScan = false
      this.result = ''
    },
    paintOutline(detectedCodes, ctx) { 
      for (const detectedCode of detectedCodes) {
        this.result = detectedCode.rawValue
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'green'

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
        this.removeScan = true
        const {
          boundingBox: { x, y, width, height }
        } = detectedCode

        ctx.lineWidth = 2
        ctx.strokeStyle = '#00b786' 
        ctx.strokeRect(x, y, width, height)
      }
    },

    /* paintCenterText(detectedCodes, ctx) {
      
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
    }, */

    logErrors: console.error
  }
}
</script>