<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくないのか？
  // todo: コードが関心事単位のまとまりになっていない。
  import {
    renderObject,
    addObject,
  } from '../../features/physics_calculation/matter.infrastracture'

  type iceCream = {
    // todo: 型って型っぽい命名したほうがいいかな？
    // todo: 共通化する
    flavor: string
    position: position
  }
  type position = {
    // todo: この型infraと共通化したい 切り出したい
    x: number
    y: number
  }

  // data
  // let iceCreamPosition: position = { x: 0, y: 0 }
  let iceCreams: Array<iceCream> = []
  // $: iceCreamPositionX = iceCreamPosition.x // todo: 分割代入リファクタする
  // $: iceCreamPositionY = iceCreamPosition.y // todo: 分割代入リファクタする

  // main
  renderObject()

  // methods
  function gacha() {
    // todo: これ処理切り出したい
    // todo: 最大5つまでにする
    //todo: スコープ効いてるからリアクティブにならないとかあるか？
    let newIceCreamPositionX = 0
    let newIceCreamPositionY = 0

    let newIceCream: iceCream = {
      flavor: 'hoge',
      position: { x: newIceCreamPositionX, y: newIceCreamPositionY },
    }

    iceCreams = [...iceCreams, newIceCream]

    // 物理演算世界に円オブジェクトを投下
    // todo: updatePositionには今回追加されたflavorオブジェクトを渡して、中でflavorsの位置を更新する
    addObject(updatePosition)

    function updatePosition(val: position) {
      newIceCream.position = val
      // todo: iceCreams配列が更新されたことを伝えるトリガを引く
      triggerRefIceCreams()
    }
  }

  function triggerRefIceCreams() {
    // アイス配列を自身に再代入することで最新の配列の状態をDOMに伝える
    iceCreams = iceCreams
  }
</script>

<div>
  <button on:click={gacha}>ガチャ</button>
  <ul>
    {#each iceCreams as iceCream, i}
      <li>
        {iceCream.position.x}
        {iceCream.position.y}
      </li>
    {/each}
  </ul>

  {#each iceCreams as iceCream, i}
    <img
      src="src/assets/image/flavors/キャラメルリボン.png"
      alt="アイス画像"
      style="position: absolute;
             top: {iceCream.position.y}px;
             left:  {iceCream.position.x}px"
    />
  {/each}
</div>
