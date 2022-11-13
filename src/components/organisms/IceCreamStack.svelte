<script lang="ts">
  // TODO: UIがインフラに直接アクセスしてるのでよくなさそう
  import renderObject from '../../features/physics_calculation/matter.infrastracture'

  // $: console.log(ice_cream_position)

  renderObject(hoge)

  function hoge(val) {
    console.log('hoge実行')
    console.log(val)
  }

  // props
  export let flavors: Array<String>
</script>

<div>
  <ul>
    {#each flavors as flavor, i}
      <li>
        {flavor}
      </li>
    {/each}
  </ul>
</div>
