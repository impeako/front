<template>
    <section>
        <footer class="footer">
            <div class="container">
                <p>Copyright © {{ this.currentYear }} Vermeg. All rights reserved.</p>
            </div>
    </footer>
    </section>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  }
};
</script>

<style scoped>
.footer {
  background-color: #317cc7;
  color: white;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 12px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
}
</style>