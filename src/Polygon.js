export default class {
  constructor(context) {
    this.context = context
    this.shadow = false
  }
  setHeight(height) {
    this.height = height
  }
  setWidth(width) {
    this.width = width
  }
  withShadow(shadow = true) {
    this.shadow = shadow
  }
  draw(points) {
    if(points.length == 2) {
      this.context.fillRect(points[0], points[1], this.height, this.width)
    } else {
      if(points.length == 4) {
        this.context.fillRect(points[0], points[1], points[2], points[3])
      } else {
        this.context.beginPath()
        this.context.moveTo(points[0], points[1])
        for (var i = 2; i <= points.length; i += 2) {
          this.context.lineTo(points[i], points[i+1])
        }
        this.context.lineTo(points[0], points[1])

        if (this.shadow) {
          this.setShadow(true)
        }
        this.context.fill()
        if (this.shadow) {
          this.setShadow()
          this.shadow = false
        }
      }
    }
  }

  setShadow(toggle) {
    this.context.shadowOffsetX = toggle ? 2 : 0
    this.context.shadowOffsetY = toggle ? 2 : 0
    this.context.shadowBlur = toggle ? 4 : 0
    this.context.shadowColor = toggle ? 'rgba(0, 0, 0, 0.5)' : null
  }
}
