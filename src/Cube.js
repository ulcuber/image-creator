import ImageCreator from './ImageCreator'
import cubes from './cubes.json'

export class Cube {
  constructor(element, type, colors, width) {
    this.element = element
    this.cube = this.getCube(type)
    this.colors = colors.split('')
    this.width = width
    this.creator = new ImageCreator(element.getContext('2d'))
    this.oll = false
    this.pll = false
    this.init().draw()
  }
  getCube(type) {
    let end = type.slice(-3)
    if (end.slice(-2) === 'll') {
        this.oll = end.slice(1) === 'o'
        this.pll = end.slice(1) === 'p'
        end = 'll'
    } else {
        end = ''
    }
    return cubes[type + end]
  }
  init() {
    this.element.width = this.width
    this.element.height = this.width
    this.creator.context.scale(this.element.width/this.cube.width, this.element.height/this.cube.height)
    return this
  }
  draw() {
    this.drawFrame()
    this.drawStickers()
    this.drawUp()
    this.drawArrows()
  }
  drawFrame() {
    this.creator.set('fillStyle', this.cube.color)
    this.creator.polygon.draw(this.cube.frame)
  }
  drawStickers() {
    this.cube.stickers.forEach((item, index) => {
      this.creator.set('fillStyle', this.cube.colors[this.colors[index]])
      this.creator.polygon.draw(item)
    })
  }
  drawUp() {
    if (this.cube.up) {
      let length = this.cube.stickers.length
      this.cube.up.forEach((item, index) => {
        this.creator.set('fillStyle', this.cube.colors[this.colors[length]])
        this.creator.polygon.draw(item)
        if (this.oll) {
            length++
        }
      })
    }
  }
  drawArrows() {
    //
  }
}
