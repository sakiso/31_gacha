<script lang="ts">
  import {
    initMatterJs,
    addCircle,
    removeCircle,
  } from '../../features/ice_cream_gacha/infrastracture/matter'
  import { onMount } from 'svelte'
  import Button, { Label } from '@smui/button'
  import List, { Item, Text } from '@smui/list'
  import type {
    IceCream,
    Position,
    IceMenu,
  } from '../../features/ice_cream_gacha/types/types'
  import {
    fetchAllFlavorImages,
    fetchIceMenu,
  } from '../../features/ice_cream_gacha/infrastracture/fetch_ice_menu_json'
  import { IceCreamGachaService } from '../../features/ice_cream_gacha/ice_cream_gacha_service'
  import LoadingIcon from '../molecules/LoadingIcon.svelte'

  // data
  const maxGachaTimes = 5
  let iceCreams: Array<IceCream> = []
  $: iceCreamsCount = iceCreams.length || 0
  $: ReversedIceCreams = [...iceCreams].reverse() // メニューリストは逆順で表示したいので反転させている
  let iceMenu: IceMenu = []
  let isImageLoading = true
  $: iceCreamGachaService = new IceCreamGachaService(iceMenu)

  // hook
  onMount(async () => {
    iceMenu = await fetchIceMenu()
    // ガチャ結果を瞬時に描画するため、全Flavorの画像を先読みしておく
    await fetchAllFlavorImages(iceMenu).then(() => (isImageLoading = false))

    initMatterJs()
  })

  // methods
  function gacha() {
    if (iceCreamsCount >= maxGachaTimes) {
      return
    }
    const newIceCreamFlavor = iceCreamGachaService.gacha()

    let newIceCream: IceCream = {
      flavor: newIceCreamFlavor,
      position: { x: 0, y: 0 },
    }
    iceCreams.push(newIceCream)

    // 物理演算世界にnewIceCreamに対応する円オブジェクトを投下し、
    // callbackでアイスと円オブジェクトの位置情報を同期し続ける
    addCircle((val: Position) => {
      newIceCream.position = val
      triggerReactiveIceCreams()
    })
  }

  function resetGachaResult() {
    iceCreams = []
    removeCircle()
  }

  function triggerReactiveIceCreams() {
    // アイスを自分自身に再代入することでリアクティブトリガーを引く
    iceCreams = iceCreams
  }
</script>

<main>
  {#if isImageLoading}
    <div class="loading-icon">
      <LoadingIcon />
    </div>
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
      <Button variant="outlined" color="secondary" on:click={resetGachaResult}>
        <Label>Reset</Label>
      </Button>
    </div>
  {/if}
</main>

<style scoped>
  .loading-icon {
    position: absolute;
    top: 30%;
    left: 30%;
  }

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
