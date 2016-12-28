<template>
  <div class="other">
    <section class="pagehead">
      <h2>Other</h2>
    </section>
    <p>{{ message }}</p>
  </div>
</template>


<script>
  export default {
    name: 'message',
    data() {
      return {
        message: '',
      }
    },
    mounted() {
      this.fetchmessage()
    },
    methods: {
      fetchmessage() {
        let vm = this
        vm.$http.get('http://localhost:8001/api').then((response) => {
          vm.message += response.body.message
        })
      }
    }
  }
</script>