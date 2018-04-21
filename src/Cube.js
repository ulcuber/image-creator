import ImageCreator from './ImageCreator'
import cubes from './cubes.json'
import { nocube } from './exceptions'

export class Cube {
  constructor(element, type, colors, width) {
    this.element = element
    this.cube = this.getCube(type)
    this.colors = colors.split('')
    this.arrows = colors.match(/\d+.\d+./g)
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
      type = type.slice(0, -3) + 'll'
    }
    let cube = cubes[type]
    if (!cube) {
      console.log(nocube)
    }
    return cube
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
      if (this.cube.square) {
        this.creator.polygon.setWidth(this.cube.square).setHeight(this.cube.square)
      }
      let length = this.cube.stickers.length
      this.cube.up.forEach((item, index) => {
        this.creator.set('fillStyle', this.cube.colors[this.colors[length]])
        this.creator.polygon.draw(item)
        if (this.oll) {
          length++
        }
      })
      this.drawArrows()
    }
  }
  drawArrows() {
    if (this.arrows) {
      this.creator.arrow.draw(this.cube.up, this.arrows, this.cube.k)
    }
  }
}
