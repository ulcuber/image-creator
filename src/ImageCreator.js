import { Line, Polygon, Arrow } from './'

export default class {
  constructor(context) {
    this.context = context
    this.line = new Line(context)
    this.polygon = new Polygon(context)
    this.arrow = new Arrow(context)
  }
  set(key, value) {
    this.context[key] = value
    return this
  }
}
