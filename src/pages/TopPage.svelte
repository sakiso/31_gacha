<script lang="ts">
  import IceCreamStack from '../components/organisms/IceCreamStack.svelte'

  // reactive data
  let flavors: Array<string> = []

  // methods
  function gacha() {
    console.log('ガチャ実行')
    flavors = [...flavors, 'hoge']
    console.log(flavors)
  }
</script>

<h1>ガチャを引く！</h1>
<IceCreamStack {flavors} />
<div>
  <img
    src="src/assets/image/waffle_cone.png"
    alt="ワッフルコーン"
    height="300px"
  />
</div>
<button on:click={gacha}>ガチャ</button>

<style>
</style>
