<main>
  <div>
    <div class="loading" />
  </div>
</main>

<style>
  .loading {
    border: 4px solid #f15186;
    border-top: 4px solid #ffffff;
    border-radius: 50%;
    width: 160px;
    height: 160px;
    margin: auto;
    animation: spin 2s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
