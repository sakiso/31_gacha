<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくないのか？
  import { renderObject } from '../../features/physics_calculation/matter.infrastracture'
  type position = {
    // todo: この型infraと共通化したい 切り出したい
    x: number
    y: number
  }

  // data
  let iceCreamPosition: position = { x: 0, y: 0 }
  export let flavors: Array<String>
  let iceCreamPositionX = 0
  $: iceCreamPositionY = iceCreamPosition.y // todo: 分割代入リファクタする

  // main
  // var iceCreamElement = document.getElementById('hoge')
  // console.log('iceCreamElement')
  // console.log(iceCreamElement)

  renderObject(updatePosition)
  function updatePosition(val: position) {
    console.log(val)
    iceCreamPosition = val
  }
</script>

<div>
  アイス座標 x: {iceCreamPosition.x} y: {iceCreamPosition.y}
  <ul>
    {#each flavors as flavor, i}
      <li>
        {flavor}
      </li>
    {/each}
  </ul>

  <img
    src="src/assets/image/flavors/キャラメルリボン.jpg"
    alt="アイス画像"
    style="position: absolute;
  top: {iceCreamPositionY}px"
  />
</div>
