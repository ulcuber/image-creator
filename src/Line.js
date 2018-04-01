export default class {
  constructor(context) {
    this.context = context
  }
  from(x, y) {
    this.context.beginPath()
    this.context.moveTo(Math.round(x), Math.round(y))
    return this
  }
  to(x, y) {
    this.context.lineTo(Math.round(x),Math.round(y))
    this.context.stroke()
    return this
  }
}
