<template>
  <div class="home">
    <FlashCard :backtext="card.backtext" :fronttext="card.fronttext" :source="card.source" :page="card.page" />
    <button @click="getCard()">
      Next
    </button>
    <table>
      <thead>
        <tr>
          <th colspan=3>Filter to cards</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <button @click="filterTo('book1', null)">Book 1</button>
          </td>
          <td>
            <button @click="filterTo('book2', null)">Book 2</button>
          </td>
          <td>
            <button @click="filterTo('book2', 80)">Level 3</button>
          </td>
          <td>
            <button @click="filterTo('class', null)">Class slides</button>
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
const BigInteger = require('jsbn').BigInteger

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
      seen: [],
      flashcards: cards,
      card: {}
    }
  },
  methods: {
    getCard: function () {
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
      this.card = card

      for (let index = 0; index < originals.length; index++) {
        const element = originals[index]
        if (element.fronttext === card.fronttext && element.backtext === card.backtext) {
          this.seen.push(index)
        }
      }
      document.cookie = `seen=${this.encodeSeen()}; max-age=${60 * 60 * 24 * 30}`
    },
    encodeSeen () {
      let bitString = new BigInteger('0')
      for (let index = 0; index < this.seen.length; index++) {
        const indexSeen = this.seen[index]
        const bitToEnable = new BigInteger('2').pow(indexSeen)
        bitString += bitToEnable
      }
      return bitString
    },
    decodeCodeSeen: function (bigInteger) {
      const bitString = bigInteger.toString(2)
      const decodedSeen = []
      for (let index = bitString.length - 1; index >= 0; index--) {
        const element = bitString[index]
        if (element === '1') {
          decodedSeen.push(bitString.length - 1 - index)
        }
      }
      return decodedSeen
    },
    filterTo: function (source, upToPage) {
      const newArray = []
      for (let index = 0; index < originals.length; index++) {
        const element = originals[index]
        if (
          (element.source === source && upToPage === null) ||
          (element.source === source && element.page && upToPage && element.page < upToPage)
        ) {
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
      this.seen = []
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
    this.cards = originals
    if (this.cookie) {
      const encodedSeen = new BigInteger(this.cookie)
      this.seen = this.decodeCodeSeen(encodedSeen)
      /* We now have indices we've seen before, so make a version of the originals that has these removed */
      this.flashcards = this.cards.filter((value, index) => {
        return this.seen.indexOf(index) === -1
      })
    }
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
    },
    cookie: function () {
      const cookieArray = document.cookie.split(';')
      for (let index = 0; index < cookieArray.length; index++) {
        const element = cookieArray[index]
        const cookieName = element.split('=')[0]
        if (cookieName === 'seen') {
          return element.split('=')[1]
        }
      }
      return '0'
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
