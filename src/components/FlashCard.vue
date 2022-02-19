<template>
  <div class="flashcard" @click="flipCard()">
    <p v-if="!flipped">
      {{fronttext}}
    </p>
    <p v-else>
      {{backtext}}
    </p>
    <p>
      <small>From: {{source}} <span v-if="page">Pg. {{page}}</span></small>
    </p>
  </div>
</template>

<script>
export default {
  name: 'FlashCard',
  props: {
    backtext: {
      type: String
    },
    fronttext: {
      type: String
    },
    source: {
      type: String
    },
    page: {
      type: String
    }
  },
  data () {
    return {
      flipped: false
    }
  },
  methods: {
    flipCard: function () {
      console.log('folip')
      this.flipped = !this.flipped
    }
  },
  watch: {
    backtext: {
      immediate: true,
      handler (val, oldVal) {
        this.flipped = false
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .flashcard {
    border: black 0.25em solid;
    font-size: 3em;
  }
  .flashcard:hover {
    border: rgb(66, 9, 9) 0.25em solid;
    background-color: darkcyan;
    cursor: pointer;
  }
</style>
