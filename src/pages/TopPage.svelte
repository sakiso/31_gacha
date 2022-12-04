<script lang="ts">
  import IceCreamStackOrganism from '../components/organisms/IceCreamStackOrganism.svelte'
</script>

<h1>31ガチャ</h1>
<div>
  <img
    src="src/assets/image/waffle_cone_back.png"
    alt="ワッフルコーン(背面)"
    height="300px"
    class="waffle_cone"
  />
  <IceCreamStackOrganism />
  <img
    src="src/assets/image/waffle_cone_front.png"
    alt="ワッフルコーン(前面)"
    height="300px"
    class="waffle_cone"
  />
</div>

<style>
  .waffle_cone {
    position: absolute;
    top: 397px;
    left: 65px;
    width: 115px;
    height: auto;
  }
</style>
