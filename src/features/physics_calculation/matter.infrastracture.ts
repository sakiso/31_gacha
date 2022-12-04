// todo: オニオンアーキ的なディレクトリにうつす
// TODO: AplicationServiveやDomainServiceの定義する型に依存するようにする
// todo: ファイル名いい感じにする
import Matter from 'matter-js'
// Matter.js
// モジュール各種
const Engine = Matter.Engine
const Render = Matter.Render
const Runner = Matter.Runner
const Body = Matter.Body
const Bodies = Matter.Bodies
const Bounds = Matter.Bounds
const Common = Matter.Common
const Composite = Matter.Composite
const Composites = Matter.Composites
const Constraint = Matter.Constraint
const Events = Matter.Events
const Mouse = Matter.Mouse
const MouseConstraint = Matter.MouseConstraint
const World = Matter.World

// 物理エンジン本体のクラス
const engine = Engine.create()

// キャンバスのサイズ
const width: number = 300
const height: number = 900 //todo: このへんの値はクラスにしてUIから受け取ったほうがいいかな

// これもExportしてviewで使うほうがいいかも
export type position = {
  x: number
  y: number
}

export function renderObject(): void {
  // 画面を描画する
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: width,
      height: height,
      showAngleIndicator: true,
      showCollisions: true,
      showDebug: false,
      showIds: false,
      showVelocity: true,
      hasBounds: true,
      wireframes: true, // Important!!
    },
  })
  Render.run(render)

  // 地面を用意
  const ground = Bodies.rectangle(width / 2, height, width, 50, {
    isStatic: true,
  })

  // 壁を用意
  const leftWall = Bodies.rectangle(0, height / 2, 15, height, {
    isStatic: true,
  })
  const rightWall = Bodies.rectangle(width, height / 2, 15, height, {
    isStatic: true,
  })

  // コーンの傾斜を再現
  const leftSlope = Bodies.rectangle(100, height, 400, 90, {
    isStatic: true,
    angle: 45
  })
  const rightSlope = Bodies.rectangle(width - 100, height, 400, 90, {
    isStatic: true,
    angle: 90
  })

  // circleと地面を配置する
  Composite.add(engine.world, [ground, leftWall, rightWall, leftSlope, rightSlope])

  // 物理世界の更新
  const runner = Runner.create()
  Runner.run(runner, engine)
}

export function addObject(callback: Function): void {
  // 物理世界に円を投下
  const circle = Bodies.circle(width / 2, 10, 95, {
    restitution: 0.9, // 反発係数
    friction: 0.5, // 摩擦係数
    timeScale: 1.1,
  })

  // 物理世界の座標送信
  Matter.Events.on(engine, 'afterUpdate', () => {
    callback(circle.position) // コールバック実行
  })

  Composite.add(engine.world, circle)
}
