<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくないのか？
  import {
    renderObject,
    addObject,
  } from '../../features/physics_calculation/matter.infrastracture'

  type position = {
    // todo: この型infraと共通化したい 切り出したい
    x: number
    y: number
  }

  // data
  let iceCreamPosition: position = { x: 0, y: 0 }
  export let flavors: Array<String>
  $: iceCreamPositionX = iceCreamPosition.x // todo: 分割代入リファクタする
  $: iceCreamPositionY = iceCreamPosition.y // todo: 分割代入リファクタする

  // methods
  function gacha() {
    console.log('ガチャ実行')
    flavors = [...flavors, 'hoge']
    console.log(flavors)

    // 物理演算世界に円オブジェクトを投下
    addObject()
  }

  // main
  renderObject(updatePosition)
  function updatePosition(val: position) {
    iceCreamPosition = val
  }
</script>

<div>
  <button on:click={gacha}>ガチャ</button>

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
  top: {iceCreamPositionY}px; left:  {iceCreamPositionX}px"
  />
</div>
