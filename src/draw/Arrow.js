export class Arrow {
  constructor(context) {
    this.context = context
    this.color = '#5B5A60'
    this.width = 10
  }
  setColor(color) {
    this.color = color
  }
  setWidth(width) {
    this.width = width
  }
  draw(t, s, k) {
    if (s) {
      var k1 = 0, i, j
      for(i = 0; i < s.length; i++) {
        var t1 = []
        var f = []
        var le
        f[0] = s[i].slice(0,1) - 1
        f[1] = s[i].slice(2,3) - 1
        if (k) {
          k1 = 0.1*k
          t1[0] = t[f[0]][0]+k
          t1[1] = t[f[0]][1]+k
          t1[2] = t[f[1]][0]+k
          t1[3] = t[f[1]][1]+k
        } else {
          t1[0] = 0
          t1[1] = 0
          t1[2] = 0
          t1[3] = 0
          le = t[f[0]].length - 2
          for (j = 0; j <= le; j += 2) {
            t1[0] += t[f[0]][j]
            t1[1] += t[f[0]][j+1]
          }
          le += 2
          le /= 2
          t1[0] /= le
          t1[1] /= le
          le = t[f[1]].length-2
          for (j = 0; j <= le; j += 2) {
            t1[2] += t[f[1]][j]
            t1[3] += t[f[1]][j+1]
          }
          le += 2
          le /= 2
          t1[2] /= le
          t1[3] /= le
          k1 = (Math.abs(t1[2]-t1[0]) + Math.abs(t1[3]-t1[1]))*0.1
        }
        f[0] = s[i].slice(1,2)
        f[1] = s[i].slice(3,4)
        this.arrow(t1, f, k1)
      }
    }
  }
  arrow(t, f, k) {
    this.space(t, k)
    this.triangle(t, f)
    this.line(t, k)

  }
  space(t, k) {
    if (t[0]-t[2] > 40) {
      t[0] -= k
      t[2] += k
    } else {
      if (t[2]-t[0] > 40) {
        t[0] += k
        t[2] -= k
      }
    }
    if (t[1]-t[3] > 40) {
      t[1] -= k
      t[3] += k
    } else {
      if (t[3]-t[1] > 40) {
        t[1] += k
        t[3] -= k
      }
    }
  }
  triangle(t, f) {
    for(var j = 0; j <= 2; j += 2) {
      if(f[j/2] === '+') {
        var x1 = t[j]
        var y1 = t[j+1]
        var angle = Math.atan2(-t[j+1] + t[3-j], t[j] - t[2-j]) + Math.PI*5/6
        this.context.beginPath()
        this.context.moveTo(Math.round(x1), Math.round(y1))
        for(var i = 0; i <= 2; i++) {
          x1 += 60*Math.cos(angle)
          y1 -= 60*Math.sin(angle)
          this.context.lineTo(Math.round(x1), Math.round(y1))
          angle += Math.PI*2/3
        }
        this.context.lineTo(t[0], t[1])
        this.context.fillStyle = this.color
        this.context.fill()
      }}
  }
  line(t, k) {
    this.context.beginPath()
    this.context.strokeStyle = this.color
    this.context.lineWidth = this.width
    this.space(t, k)
    this.context.moveTo(Math.round(t[0]), Math.round(t[1]))
    this.context.lineTo(Math.round(t[2]), Math.round(t[3]))
    this.context.stroke()
  }
}
