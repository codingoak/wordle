import { mount } from '@vue/test-utils'
import WordleBoard from '../WordleBoard.vue'
import { VICTORY_MESSAGE } from '../../settings'

describe('WordleBoard', () => {
  it('should show a victory message when the user makes a guess that matches the word of the day', async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'TEST' } })

    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("TEST")
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain(VICTORY_MESSAGE)
  })

  it("should show a defeat message if the user makes a guess that is incorrect", async () => {
    const wrapper = mount(WordleBoard, { props: { wordOfTheDay: 'TEST' } })

    const guessInput = wrapper.find("input[type=text]")
    await guessInput.setValue("WRONG")
    await guessInput.trigger("keydown.enter")

    expect(wrapper.text()).toContain("Better luck next time!")
  })

  it.todo("should not show an end-of-game message if the user has not made yet a guess")
})
