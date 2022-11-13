<script lang="ts">
  import { renderObject } from '../../features/matter'
  renderObject('../../features/8591b64b500d-20220830.png')
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
