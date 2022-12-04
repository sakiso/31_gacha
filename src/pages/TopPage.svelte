<script lang="ts">
  import IceCreamStackOrganism from '../components/organisms/IceCreamStackOrganism.svelte'

  // reactive data
  let flavors: Array<string> = []
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
<IceCreamStackOrganism {flavors} />

<style>
  .waffle_cone {
    position: absolute;
    top: 650px;
    left: 45px;
  }
</style>
