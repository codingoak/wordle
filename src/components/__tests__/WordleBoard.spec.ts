import { mount } from '@vue/test-utils'
import WordleBoard from '@/components/WordleBoard.vue'
import { VICTORY_MESSAGE, DEFEAT_MESSAGE } from '@/settings'

describe('WordleBoard', () => {
  let wordOfTheDay = "TEST"
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(WordleBoard, { props: { wordOfTheDay } })
  })

  async function playerSubmitsGuess(guess: string) {
    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue(guess)
    await guessInput.trigger("keydown.enter")
  }

  describe("End of the game messages", () => {
    it('should show a victory message when the user makes a guess that matches the word of the day', async () => {
      await playerSubmitsGuess(wordOfTheDay)
  
      expect(wrapper.text()).toContain(VICTORY_MESSAGE)
    })
  
    it("should show a defeat message if the user makes a guess that is incorrect", async () => {
      await playerSubmitsGuess("WRONG")
  
      expect(wrapper.text()).toContain(DEFEAT_MESSAGE)
    })
  
    it("should not show an end-of-game message if the user has not made yet a guess", async () => {
      expect(wrapper.text()).not.toContain(VICTORY_MESSAGE)
      expect(wrapper.text()).not.toContain(DEFEAT_MESSAGE)
    })
  })

  describe("Rules for defining the word of the day", () => {
    it("should emit a warning if a provided word of the day does not have exactly 5 characters", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, { props: { wordOfTheDay: "FLY" } })
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    it("should emit a warning if the wordOfTheDay is not all in uppercase", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, { props: { wordOfTheDay: "FlIES" } })
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    it("should emit a warning if the wordOfTheDay is not a real English word", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, { props: { wordOfTheDay: "QWERT" } })
  
      expect(console.warn).toHaveBeenCalled()
    })
  
    it("should NOT emit a warning if the wordOfTheDay is a real uppercase English word with 5 characters", async () => {
      console.warn = vi.fn()
  
      wrapper = mount(WordleBoard, { props: { wordOfTheDay: "TESTS" } })
  
      expect(console.warn).not.toHaveBeenCalled()
    })
  })

  describe("Player input", () => {
    it.todo("should limit player guesses to 5 letters")
    it.todo("should only submit player guesses if they are real words")
    it.todo("should ensure that player guesses are not case-sensitive")
    it.todo("should ensure that player guesses can only contain lettters")
  })
})
