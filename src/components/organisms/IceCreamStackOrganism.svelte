<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくないのか？
  // todo: コードが関心事単位のまとまりになっていない。
  import {
    renderObject,
    addObject,
  } from '../../features/physics_calculation/matter.infrastracture'

  type position = {
    // todo: この型infraと共通化したい 切り出したい
    // todo: これをラップするアイスオブジェクトの情報全体の型も定義する。
    x: number
    y: number
  }

  // data
  let iceCreamPosition: position = { x: 0, y: 0 }
  let flavors: Array<string> = ['first flavor']
  $: iceCreamPositionX = iceCreamPosition.x // todo: 分割代入リファクタする
  $: iceCreamPositionY = iceCreamPosition.y // todo: 分割代入リファクタする

  // main
  renderObject(updatePosition)

  // methods
  function gacha() {
    flavors = [...flavors, 'hoge']

    // 物理演算世界に円オブジェクトを投下
    addObject()
  }
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

  {#each flavors as flavor, i}
    <img
      src="src/assets/image/flavors/キャラメルリボン.jpg"
      alt="アイス画像"
      style="position: absolute;
  top: {iceCreamPositionY}px; left:  {iceCreamPositionX}px"
    />
  {/each}
</div>
