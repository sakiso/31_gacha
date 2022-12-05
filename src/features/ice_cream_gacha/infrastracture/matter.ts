import Matter from 'matter-js'

// モジュール各種
const Engine = Matter.Engine
const Render = Matter.Render // 未使用
const Runner = Matter.Runner
const Body = Matter.Body // 未使用
const Bodies = Matter.Bodies
const Bounds = Matter.Bounds // 未使用
const Common = Matter.Common // 未使用
const Composite = Matter.Composite
const Composites = Matter.Composites // 未使用
const Constraint = Matter.Constraint // 未使用
const Events = Matter.Events // 未使用
const Mouse = Matter.Mouse // 未使用
const MouseConstraint = Matter.MouseConstraint // 未使用
const World = Matter.World // 未使用

// 物理エンジン本体のクラス
const engine = Engine.create()

// 物理世界のキャンバスのサイズ
const width: number = 145
const height: number = 450

export function initMatterJs(): void {
  // NOTE: 開発時に物理世界の画面を描画する場合は以下をコメント解除する
  // const render = Render.create({
  //   element: document.body,
  //   engine: engine,
  //   options: {
  //     width: width,
  //     height: height,
  //     showAngleIndicator: true,
  //     showCollisions: true,
  //     showDebug: false,
  //     showIds: false,
  //     showVelocity: true,
  //     hasBounds: true,
  //     wireframes: true, // Important!!
  //   },
  // })
  // Render.run(render)

  // 地面を用意
  const ground = Bodies.rectangle(width / 2, height, height , 50, {
    isStatic: true,
  })

  // 左右の壁を用意
  const leftWall = Bodies.rectangle(0, height / 2, 15, height, {
    isStatic: true,
  })
  const rightWall = Bodies.rectangle(width, height / 2, 15, height, {
    isStatic: true,
  })

  // コーンの傾斜を再現
  const leftSlope = Bodies.rectangle(20, height, 200, 90, {
    isStatic: true,
    angle: 45
  })
  const rightSlope = Bodies.rectangle(width - 15, height, 200, 90, {
    isStatic: true,
    angle: 90
  })

  // circleと地面を配置する
  Composite.add(engine.world, [ground, leftWall, rightWall, leftSlope, rightSlope])

  // 物理世界の更新
  const runner = Runner.create()
  Runner.run(runner, engine)
}

export function addCircle(callback: Function): void {
  // 物理世界に円を投下
  const circle = Bodies.circle(width / 2, 0, 45, {
    restitution: 0.9, // 反発係数
    friction: 0.5, // 摩擦係数
    timeScale: 1.0,
  })

  // 物理世界の座標送信
  Matter.Events.on(engine, 'afterUpdate', () => {
    callback(circle.position) // コールバック実行
  })

  Composite.add(engine.world, circle)
}

export function removeCircle(): void {
  // 物理世界の円オブジェクトをすべて削除する
  const allBodies = Matter.Composite.allBodies(engine.world)
  const allCircles = allBodies.filter(el=> el.label === "Circle Body")
  Composite.remove(engine.world, allCircles)
}