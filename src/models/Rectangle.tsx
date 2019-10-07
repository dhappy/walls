export class Rectangle {
  public x:number = 0
  public y:number = 0
  public width:number = 1
  public height:number = 1

  constructor(props:any) {
    Object.assign(this, props)
  }
}