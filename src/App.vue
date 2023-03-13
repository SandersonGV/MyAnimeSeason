<script >
import { RouterLink, RouterView } from 'vue-router'
import { profileController } from './controllers/profileController'
export default{
  components:{
    RouterLink,
    RouterView
  },
  data() {
    return {
     profile:{},
     profileController: new profileController(),
    }
  },created() {
    this.profile = this.profileController.getProfile();

  },
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Anime Season APP</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
          <div class="navbar-nav ">
            <router-link class="nav-link" to="/season">Seasons</router-link>
            <router-link class="nav-link" to="/mylist">My List</router-link>
            <router-link class="nav-link" to="/calendar">Calendar</router-link>
            <div class="nav-item dropdown ">
              <button class="btn btn-dark dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                {{ profile.name }}
              </button>
              <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                <li>
                  <a class="dropdown-item" href="#">login</a> 
                </li>
                <li>            
                  <router-link class="dropdown-item" to="/config">Configurações</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
</template>

<style scoped>

</style>
