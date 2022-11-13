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

<h1>31ガチャ</h1>
<div>
  <img
    src="src/assets/image/waffle_cone.png"
    alt="ワッフルコーン"
    height="300px"
    class="waffle_cone"
  />
</div>
<IceCreamStack {flavors} />
<button on:click={gacha}>ガチャ</button>

<style>
  .waffle_cone {
    position: absolute;
    top: 650px;
    left: 45px;
  }
</style>
