<script lang="ts">
  import IceCreamStackOrganism from '../components/organisms/IceCreamStackOrganism.svelte'
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar'
  import { onMount } from 'svelte'

  // hook
  // onMount(async () => {
  //   // 画像フォルダを先読み
  //   fetch('/image')
  // })
</script>

<main>
  <TopAppBar dense variant="static">
    <Row>
      <Section>
        <Title>31 gacha</Title>
      </Section></Row
    >
  </TopAppBar>
  <div id="main-content">
    <img
      src="image/waffle_cone_back.png"
      alt="ワッフルコーン(背面)"
      height="300px"
      class="waffle_cone"
    />
    <IceCreamStackOrganism />
    <img
      src="image/waffle_cone_front.png"
      alt="ワッフルコーン(前面)"
      height="300px"
      class="waffle_cone"
    />
  </div>
</main>

<style scoped>
  #main-content {
    margin: auto;
  }
  .waffle_cone {
    position: absolute;
    top: 447px;
    left: 35px;
    width: 115px;
    height: auto;
  }
</style>
