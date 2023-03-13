<script >
import { Planner } from '../helpers/planner'
export default {
  props: {
    myAnimes: Array
  },
  data: function () {
    return {
      myPlanner: {},
    }
  },
  created() {
    this.myPlanner = new Planner();
    this.myAnimes.forEach(anime => {
      this.myPlanner.addEvent(anime.broadcast.day, anime);
    });
  },
  mounted() {
    let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
      return new bootstrap.Tooltip(tooltipTriggerEl)
    })
  },
}
</script>

<template>
  <div class="calendar">
    <div class="timeline">
      <div class="spacer"></div>
    </div>
    <div class="days">
      <div v-for="(wday, idx) in myPlanner.weekDays" :key="idx" :class="'border-end day ' + wday">
        <div class="date">
          <p class="date-day">{{ wday.slice(0, 3) }}</p>
        </div>
        <div class="events">
          <div class="event" v-for="(event, idx2) in myPlanner.planner[wday]" :key="idx2">
            <a href="#" @click="$emit('click', event)" data-bs-toggle="tooltip" :data-bs-title="event.title">
              <img :src="event.images.jpg.image_url" class="card-img rounded-0 h-100">
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  display: grid;
  gap: 10px;
  grid-template-columns: auto 1fr;
  margin: 2rem;
}

.timeline {
  display: grid;
  grid-template-rows: repeat(8, 80px);
}

.days {
  display: grid;
  grid-column: 2;
  gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
}


.start-10 {
  grid-row-start: 2;
}

.start-12 {
  grid-row-start: 4;
}

.start-1 {
  grid-row-start: 5;
}

.start-2 {
  grid-row-start: 6;
}

.end-12 {
  grid-row-end: 4;
}

.end-1 {
  grid-row-end: 5;
}

.end-3 {
  grid-row-end: 7;
}

.end-4 {
  grid-row-end: 8;
}

.end-5 {
  grid-row-end: 9;
}

.title {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.event {
  border: 1px solid #f2d3d8;
  border-radius: 5px;
  padding: 0.5rem;
  margin: 0.3rem 0.5rem;
  background: white;
}

.space,
.date {
  height: 60px
}

.date {
  display: flex;
  gap: 1em;
}

.date-num {
  font-size: 3rem;
  font-weight: 600;
  display: inline;
}

.date-day {
  display: inline;
  font-size: 3rem;
  font-weight: 100;
}
</style>
