<template>
  <div class="container">
    <div class="row">
      <form @submit.prevent="handleSubmit" class="col-md-6 mx-auto my-2">
        <label for="prompt" class="small">Generate Image from Prompt:</label>
        <div class="d-flex">
          <input type="text" name="prompt" class="form-control" placeholder="AI Prompt" required>
          <button class="btn btn-primary" type="submit">Generate</button>
        </div>
      </form>
    </div>
    <!-- yuo -->

    <div class="row my-3">
      <div v-if="loading">loading...</div>
      <div class="col-md-4 my-3" v-for="(i, x) in images">
        <div class="card">
          <img :src="i.url" alt="" srcset="">
          <div class="card-body">
            <p>
              <b>Variant: {{ x }}</b>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { api } from '../services/AxiosService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const images = ref([])
    const loading = ref(false)

    return {
      images,
      loading,
      async handleSubmit(e) {
        try {
          loading.value = true
          const val = e.target.prompt.value
          const res = await api.get(`/api/ai/image?prompt=${val}&n=6`)
          images.value = res.data
          loading.value = false
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
