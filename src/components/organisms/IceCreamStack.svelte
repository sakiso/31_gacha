<script lang="ts">
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

  // 物理エンジン本体のクラス
  const engine = Engine.create()

  // キャンバスのサイズ
  const width: number = 480
  const height: number = 600

  // Boxを用意
  const box = Bodies.rectangle(width / 2, 0, 80, 80, {
    restitution: 0.8,
    friction: 0.1,
    angle: Common.random(0, 360),
  })

  // 地面を用意
  const ground = Bodies.rectangle(width / 2, 0, 80, 80, {
    restitution: 0.8,
    friction: 0.1,
    angle: Common.random(0, 360),
  })

  // Boxと地面を配置する
  Composite.add(engine.world, [box, ground])

  // 画面を描画するクラス
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: width,
      height: height,
      showAngleIndicator: true,
      showCollisions: true,
      showDebug: false,
      showIds: true,
      showVelocity: true,
      hasBounds: true,
      wireframes: true, // Important!!
    },
  })
  Render.run(render)

  // props
  export let flavors: Array<String>
</script>

<div>
  <ul>
    {#each flavors as flavor, i}
      <li>
        {flavor}
      </li>
    {/each}
  </ul>
</div>
