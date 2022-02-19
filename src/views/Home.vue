<template>
  <div class="home">
    <FlashCard :backtext="card.backtext" :fronttext="card.fronttext" :source="card.source" :page="card.page" />
    <button @click="getCard()">
      Next
    </button>
    <table>
      <thead>
        <trow>
          <th colspan=3>Filter to cards</th>
        </trow>
      </thead>
      <tbody>
        <tr>
          <td>
            <button @click="filterTo('book1')">Book 1</button>
          </td>
          <td>
            <button @click="filterTo('book2')">Book 2</button>
          </td>
          <td>
            <button @click="filterTo('class')">Class slides</button>
          </td>
          <td>
            <button @click="filterKanji('kanji')">Has Kanji</button>
          </td>
          <td>
            <button @click="resetCards()">Reset</button>
          </td>
        </tr>
      </tbody>
      </table>
      <small>{{cardsLeft}} cards left</small>
  </div>
</template>

<script>
// @ is an alias to /src
import FlashCard from '@/components/FlashCard.vue'
import cards from '@/assets/flashcards.json'

const originals = []
for (let i = 0; i < cards.length; i++) {
  originals.push(cards[i])
}

export default {
  name: 'Home',
  components: {
    FlashCard
  },
  data () {
    return {
      seenToday: [],
      flashcards: cards,
      card: {}
    }
  },
  methods: {
    getCard: function () {
      console.log(this.flashcards)
      if (this.flashcards.length <= 0) {
        this.card = {
          fronttext: 'カードもなにもありません',
          backtext: 'No more cards',
          source: '...'
        }
        return
      }

      const idx = Math.floor(Math.random(100) * this.flashcards.length)
      const card = this.flashcards[idx]
      this.flashcards.splice(idx, 1)
      this.seenToday.push(card)
      this.card = card
    },
    filterTo: function (source) {
      const newArray = []
      for (let index = 0; index < originals.length; index++) {
        const element = originals[index]
        if (element.source === source) {
          newArray.push(element)
        }
      }
      this.flashcards = newArray
      this.getCard()
    },
    resetCards: function () {
      const newArray = []
      for (let index = 0; index < originals.length; index++) {
        const element = originals[index]
        newArray.push(element)
      }
      this.flashcards = newArray
      this.getCard()
    },
    filterKanji: function () {
      const newArray = []
      for (let index = 0; index < originals.length; index++) {
        const element = originals[index]
        if (element.kanji) {
          newArray.push(element)
        }
      }
      this.flashcards = newArray
      this.getCard()
    }
  },
  created () {
    this.getCard()
  },
  mounted () {
    this.cards = originals
  },
  computed: {
    cardsLeft: function () {
      if (!this.flashcards) {
        return 0
      }
      return this.flashcards.length
    }
  }
}
</script>

<style scoped>
  button {
    font-weight: bold;
    font-size: 3em;
    width: 100%;
    padding: 1em;
  }
  button:hover {
    cursor: pointer;
  }
</style>
