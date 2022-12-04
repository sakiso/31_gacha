<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくないのか？
  // todo: コードが関心事単位のまとまりになっていない。
  import {
    renderObject,
    addObject,
    removeCircle,
  } from '../../features/physics_calculation/matter.infrastracture'

  import { onMount } from 'svelte'

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
  $: iceCreamsCount = iceCreams.length || 0
  $: ReversedIceCreams = [...iceCreams].reverse() // メニューリストは逆順で表示したいので反転させる
  let iceMenu: Array<String> = []
  // $: iceCreamPositionX = iceCreamPosition.x // todo: 分割代入リファクタする
  // $: iceCreamPositionY = iceCreamPosition.y // todo: 分割代入リファクタする

  // main
  renderObject()

  // hook
  onMount(async () => {
    // jsonファイルからflavor名のArrayを作成
    fetch('public/ice_menu.json')
      .then((res) => res.json())
      .then((data) => {
        iceMenu = Object.keys(data)
      })
  })

  // methods
  function gacha() {
    if (iceCreamsCount >= 5) {
      return
    }
    const newIceCreamFlavor = sampleFromArray(iceMenu)

    // todo: これ処理切り出したい
    // todo: 最大5つまでにする
    let newIceCreamPositionX = 0
    let newIceCreamPositionY = 0

    let newIceCream: iceCream = {
      flavor: newIceCreamFlavor,
      position: { x: newIceCreamPositionX, y: newIceCreamPositionY },
    }

    iceCreams = [...iceCreams, newIceCream]

    // 物理演算世界に円オブジェクトを投下
    // todo: updatePositionには今回追加されたflavorオブジェクトを渡して、中でflavorsの位置を更新する
    addObject(updatePosition)

    function updatePosition(val: position) {
      newIceCream.position = val
      triggerRefIceCreams()
    }
  }

  function reset() {
    // todo: 物理世界もリセットしないといけない
    iceCreams = []
    removeCircle()
  }

  function sampleFromArray(targetArray: Array<any>) {
    const targetIndex = Math.floor(Math.random() * targetArray.length)
    return targetArray[targetIndex]
  }

  function triggerRefIceCreams() {
    // アイス配列を自身に再代入することで最新の配列の状態をDOMに伝える
    iceCreams = iceCreams
  }
</script>

<div>
  <button on:click={gacha}>ガチャ</button>
  <button on:click={reset}>リセット</button>

  {#each iceCreams as iceCream, i}
    <img
      src="src/assets/image/flavors/{iceCream.flavor}.png"
      alt="アイス画像"
      style="position: absolute;
             top: {iceCream.position.y}px;
             left: {iceCream.position.x}px;
             width: 100px"
    />
  {/each}

  <ul class="ice-cream-flavors-list">
    {#each ReversedIceCreams as iceCream, i}
      <li>
        {iceCream.flavor}
      </li>
    {/each}
  </ul>
</div>

<style scoped>
  .ice-cream-flavors-list {
    position: absolute;
    top: 150px;
    left: 190px;
  }
</style>
