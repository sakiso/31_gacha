<script lang="ts">
  // todo: コードが関心事単位のまとまりになっていない。
  import {
    renderObject,
    addCircle,
    removeCircle,
  } from '../../features/ice_cream_gacha/infrastracture/matter'
  import { onMount } from 'svelte'
  import Button, { Label } from '@smui/button'
  import List, { Item, Text } from '@smui/list'
  import type { IceCream, Position } from '../../features/ice_cream_gacha/types'
  const maxGachaTimes = 5

  // data
  let iceCreams: Array<IceCream> = []
  $: iceCreamsCount = iceCreams.length || 0
  $: ReversedIceCreams = [...iceCreams].reverse() // メニューリストは逆順で表示したいので反転させている
  let iceMenu: Array<String> = []
  let isImageLoading = true

  // main
  renderObject()

  // hook
  onMount(async () => {
    // jsonファイルからflavor名のArrayを作成
    await fetch('ice_menu.json')
      .then((res) => res.json())
      .then((data) => {
        iceMenu = Object.keys(data)
      })

    // 前Flavorの画像を先読みしておく
    await Promise.all(
      iceMenu.map((flavorName) => {
        fetch(`image/flavors/${flavorName}.png`)
      })
    ).then(() => (isImageLoading = false)) // todo: これがtrueになるまでかっこいいローディング画面だしたい
  })

  // methods
  function gacha() {
    if (iceCreamsCount >= maxGachaTimes) {
      return
    }
    const newIceCreamFlavor = sampleFromArray(iceMenu)

    // todo: これ処理切り出したい
    // todo: 最大5つまでにする
    let newIceCreamPositionX = 0
    let newIceCreamPositionY = 0

    let newIceCream: IceCream = {
      flavor: newIceCreamFlavor,
      position: { x: newIceCreamPositionX, y: newIceCreamPositionY },
    }

    iceCreams = [...iceCreams, newIceCream]

    // 物理演算世界に円オブジェクトを投下
    addCircle(updatePosition)

    function updatePosition(val: Position) {
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
  {#if isImageLoading}
    <div>Now Loading...</div>
    <!-- todo: イケてるロードアイコン出したい -->
  {:else}
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
      <Button
        variant="raised"
        on:click={gacha}
        disabled={iceCreamsCount >= maxGachaTimes}
      >
        <Label>ガチャ</Label>
      </Button>
      <span class="spacer" />
      <Button variant="outlined" color="secondary" on:click={reset}>
        <Label>Reset</Label>
      </Button>
    </div>
  {/if}
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
