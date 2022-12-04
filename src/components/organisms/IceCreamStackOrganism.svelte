<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくないのか？
  // todo: コードが関心事単位のまとまりになっていない。
  import {
    renderObject,
    addObject,
    removeCircle,
  } from '../../features/physics_calculation/matter.infrastracture'
  import { onMount } from 'svelte'
  import Button, { Label } from '@smui/button'
  import List, { Item, Text } from '@smui/list'

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
  let iceCreams: Array<iceCream> = []
  $: iceCreamsCount = iceCreams.length || 0
  $: ReversedIceCreams = [...iceCreams].reverse() // メニューリストは逆順で表示したいので反転させる
  let iceMenu: Array<String> = []

  // main
  renderObject()

  // hook
  onMount(async () => {
    // jsonファイルからflavor名のArrayを作成
    fetch('ice_menu.json')
      .then((res) => res.json())
      .then((data) => {
        iceMenu = Object.keys(data)
      })
  })

  // methods
  function gacha() {
    if (iceCreamsCount >= 5) {
      // todo: iceCreamsCount >= 5 は上限個数みたい名前にして共通化
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
    addObject(updatePosition)

    function updatePosition(val: position) {
      newIceCream.position = val
      triggerRefIceCreams()
    }
  }

  function reset() {
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

<main>
  {#each iceCreams as iceCream, i}
    <img
      src="image/flavors/{iceCream.flavor}.png"
      alt="アイス画像"
      style="position: absolute;
             top: {iceCream.position.y + 50}px;
             left: {iceCream.position.x - 30}px;
             width: 100px"
    />
  {/each}

  <div class="ice-cream-flavors-list">
    <List dense>
      {#each ReversedIceCreams as iceCream, i}
        <Item>
          <Text>
            {iceCream.flavor}
          </Text>
        </Item>
      {/each}
    </List>
  </div>

  <div class="gacha-button-container">
    <Button variant="raised" on:click={gacha} disabled={iceCreamsCount >= 5}>
      <Label>ガチャ</Label>
    </Button>
    <span class="spacer" />
    <!-- ↑5回到達したらdisableに変える -->
    <Button variant="outlined" color="secondary" on:click={reset}>
      <Label>Reset</Label>
    </Button>
  </div>
</main>

<style scoped>
  .ice-cream-flavors-list {
    position: absolute;
    top: 220px;
    left: 175px;
  }

  .gacha-button-container {
    position: absolute;
    top: 700px;
    display: flex;
    width: 100%;
    max-width: 500px;
    justify-content: center;
  }

  .spacer {
    width: 15px;
  }
</style>
