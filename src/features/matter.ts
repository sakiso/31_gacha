// todo: オニオンアーキ的なディレクトリにうつす
import Matter from 'matter-js'
import img from './dummy.png'

export function renderObject(path): void {
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
  const width: number = 480
  const height: number = 600

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

  // 落下するcircleを用意
  const circle = Bodies.circle(width / 2, 10, 60, {
    restitution: 0.8, // 反発係数
    friction: 0.5, // 摩擦係数
    timeScale: 1.5,
    render: {
      visible: true,
      wireframes: false,
      // todo: ↑までは設定が渡ってる 他のオプションが渡ってない？
      sprite: {
        texture: '/src/features/dummy.png',
			},
    }
  })
  // 地面を用意
  const ground = Bodies.rectangle(width / 2, height, width, 50, {
    isStatic: true,
  })

  // circleと地面を配置する
  Composite.add(engine.world, [circle, ground])

  // 物理世界の更新
  const runner = Runner.create()
  Runner.run(runner, engine)


  // 物理世界の座標送信
  let last_position = {x: 0, y: 0}
  Matter.Events.on(engine, 'afterUpdate', () => {
    if(Math.floor(last_position.x) === Math.floor(circle.position.x) &&
    Math.floor(last_position.y) === Math.floor(circle.position.y)
      ){
      Matter.Events.off(engine, 'afterUpdate') // 物体が停止したらコールバック停止
    }
    last_position = Matter.Vector.clone(circle.position)
  })
}