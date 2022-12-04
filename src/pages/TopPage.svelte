<script lang="ts">
  import IceCreamStack from '../components/organisms/IceCreamStackOrganism.svelte'
  import { addObject } from '../features/physics_calculation/matter.infrastracture'

  // reactive data
  let flavors: Array<string> = []

  // methods
  function gacha() {
    console.log('ガチャ実行')
    flavors = [...flavors, 'hoge']
    console.log(flavors)

    // 物理演算世界に円オブジェクトを投下
    addObject()
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
