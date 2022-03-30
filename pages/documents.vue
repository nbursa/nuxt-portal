<template>
  <div class="document">
    <div class="document-header">
      <h3>Nenad Bursac CV</h3>
      <a
        class="openpop"
        :href="`${publicPath}/docs/NenadBursac-cv.pdf`"
        @mouseover.native="linkOver"
        @mouseleave.native="linkLeave"
        download
        >Download</a
      >
    </div>
    <iframe
      class="document-file"
      :src="`${publicPath}/docs/NenadBursac-cv.pdf`"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'Document',
  middleware: "auth",
  data() {
    return {
      publicPath: process.env.BASE_URL
      // publicPath: 'http://localhost:3000',
    }
  },
}
</script>

<style lang="scss">
.document {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 150px auto;
  width: 78vw;
  height: calc(100vh - 17rem);
  overflow: hidden;
  &-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      cursor: none;
    }
  }
  &-file {
    width: 100%;
    height: calc(100vh - 17rem);
  }
}
</style>