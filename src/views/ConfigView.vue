<script >
import { profileController } from '../controllers/profileController'

export default {
  data: function () {
    return {
      Titulo: "Configurações",
      config: {
        server: "vidstreaming",
        quality: "default",
        lang: "Brazil",
        provider: "zoro",
      },
      servers: ["vidstreaming", "vidcloud"],
      providers: ["zoro", "enime", "gogoanime", "animepahe", "animefox"],
      quality: ["default", "1080p", "720p", "480p", "360p"],
      lang: ["English", "French", "Russian", "Spanish", "Brazil"],
      profileController: new profileController(),
    }
  }, methods: {
    async saveConfig() {
      this.profileController.saveConfig(this.config)
    }
  },
  created() {
    this.config = this.profileController.getConfig()
  },
}
</script>

<template>
  <main>
    <div class="p-3 m-3">
      <h1>{{ Titulo }}</h1>
      <div class="card p-4">
        <form @submit.prevent="saveConfig">
          <div class="mb-3">
            <label class="form-label">Providers</label>
            <select v-model="config.provider" @change="" class="form-select">
              <option value="">Selecione</option>
              <option v-for="(item, index) in providers" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Servers</label>
            <select v-model="config.server" @change="" class="form-select">
              <option value="">Selecione</option>
              <option v-for="(item, index) in servers" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Quality</label>
            <select v-model="config.quality" @change="" class="form-select">
              <option value="">Selecione</option>
              <option v-for="(item, index) in quality" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label class="form-label">Languages</label>
            <select v-model="config.lang" @change="" class="form-select">
              <option value="">Selecione</option>
              <option v-for="(item, index) in lang" :key="index" :value="item">{{ item }}</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>
