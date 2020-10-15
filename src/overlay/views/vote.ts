import { h } from 'snabbdom/build/package/h'
import { VNode } from 'snabbdom/build/package/vnode'

export const voteView = ({
  topic,
  yes,
  no,
  time
}: Vote): VNode =>
  h('div.vote', {
    style: {
      background: 'gold',
      padding: '2rem',
      borderRadius: '10px',
      fontSize: '1rem'
    }
  }, [
    h('div.vote__title', {
      style: {
        fontSize: '2rem',
        paddingBottom: '1rem'
      }
    }, 'vote'),
    h('div.vote__topic', {
      style: {
        fontSize: '3rem'
      }
    }, topic),
    h('div.vote__results', {
      style: {
        fontSize: '4rem',
        // textAlign: 'center'
        paddingTop: '1rem'
      }
    }, [
      h('div.vote__yes', {
        style: {
          ...(yes > no ? { fontWeight: 'bold' } : null)
        }
      }, [
        h('span', {
          style: {
          // fontSize: '2.5rem',
            paddingRight: '1rem'
          }
        }, 'Yes'),
        h('span', {
          style: {
          // fontSize: '2rem'
          }
        }, yes)
      ]),
      h('div.vote__no', {
        style: {
          ...(no > yes ? { fontWeight: 'bold' } : null)
        }
      }, [
        h('span', {
          style: {
          // fontSize: '2.5rem',
            paddingRight: '1rem'
          }
        }, 'No'),
        h('span', {
          style: {
          // fontSize: '2rem'
          }
        }, no)
      ])
    ]),
    time > 0 ? h('div.vote__time', {
      style: {
        textAlign: 'right',
        fontSize: '3rem'
      }
    }, [
      h('span', {
        style: {
          fontSize: '80%'
        }
      }, 'time left'),
      h('span', {
        style: {
        // fontSize: '2rem',
          paddingLeft: '1rem',
          ...(time < 9 ? { color: 'red' } : null)
        }
      }, time),
      h('span', {
        style: {
          fontSize: '50%',
          ...(time < 9 ? { color: 'red' } : null)
        }
      }, 'sec')
    ]) : null,
    time > 0 ? h('div.vote__instructions', {
      style: {
        fontSize: '1.5rem',
        paddingTop: '1rem',
        textAlign: 'center'
      }
    }, 'instructions: chat 1 for yes 2 for no') : null
  ])
