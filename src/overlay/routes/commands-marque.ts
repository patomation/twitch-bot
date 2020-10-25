import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'
import { State, subscribe } from '../store/state'
import { render } from '../lib/render'
import { getSoundCommands } from '../store/actions'

const marqueCss = `
.marquee {
  position: relative;
  overflow: hidden;
  --offset: 20vw;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));
}

.marquee__inner {
  width: fit-content;
  display: flex;
  position: relative;
  transform: translate3d(var(--move-initial), 0, 0);
  animation: marquee 20s linear infinite;
  animation-play-state: running;
}

.marquee span {
  font-size: 2.5rem;
  padding: 0 2vw;
}

@keyframes marquee {
  0% {
      transform: translate3d(var(--move-initial), 0, 0);
  }

  100% {
      transform: translate3d(var(--move-final), 0, 0);
  }
}
`

const view = ({ soundCommands }: State): VNode =>
  h('div.marquee', {
    style: {
      color: '#ffffff'
    }
  }, [
    h('div.marquee__inner', soundCommands.map((command) => h('span', `!${command}`))),
    h('style', marqueCss)
  ])

export const route = (): void => {
  subscribe((state) => {
    render(view(state))
  })
  getSoundCommands()
}
