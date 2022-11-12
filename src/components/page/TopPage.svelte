<script lang="ts">
  import IceCreamStack from '../organism/IceCreamStack.svelte'

  let name: string = 'world'
</script>

<h1>ガチャを引く！</h1>
<IceCreamStack />
<div>
  <img
    src="src/assets/image/waffle_cone.png"
    alt="ワッフルコーン"
    height="300px"
  />
</div>
<button>ガチャ</button>

<style>
</style>
