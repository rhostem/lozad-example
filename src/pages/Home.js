// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Header from '../components/layout/Header'
import styles from '../styles'
import styled from 'styled-components'
import { injectGlobal } from 'styled-components'
import ToastContainer from '../components/ToastContainer'
import { showToastMessage } from '../actions/toast'

const Main = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: ${styles.size.appMaxWidth};
  padding-top: ${styles.size.headerHeight};
  padding-left: ${styles.size.mainHoriPadding};
  padding-right: ${styles.size.mainHoriPadding};
`

injectGlobal`
  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade {
    animation-name: fade;
    animation-duration: 2s;
  }
  `

const Heading = styled.h2`
  text-align: center;
  font-size: 20px;
  margin: 0rem 0 3rem;
`

const LazyImage = styled.div`
  position: relative;
  min-height: 500px; /* 최소 높이를 지정하지 않으면 엘레멘트가 모두 viewport 안에 들어온 것으로 인식해버려 lazy load를 할 수 없다. */
  width: calc(100% - 2rem);
  margin: 20px auto;

  & > img {
    display: block;
    width: 100%;

    &.loaded + .loading-layer {
      display: none;
    }
  }
`

const LoadingLayer = styled.div.attrs({
  className: 'loading-layer',
})`
  position: absolute;
  content: ' ';
  width: 100%;
  height: 100%;
  background-color: #efefef;
  z-index: 1;
  top: 0;
  left: 0;
`

const IndexNo = styled.div`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 0.2rem;
`

type Props = {}
type State = {}

class Home extends React.Component {
  props: Props
  state: State

  static defaultProps = {}

  constructor(props: Props) {
    super(props)
    this.images = [
      'https://images.unsplash.com/photo-1504595403659-9088ce801e29?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=fb1b358809ab359c53baa7dab84b3c54',
      'https://images.unsplash.com/photo-1444212477490-ca407925329e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=bd1c88a32cc32669d2412b1f1889d0fb',
      'https://images.unsplash.com/photo-1455757618770-0a58b0b28ebd?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=c61a061428d153191396fc7d2c8629dd',
      'https://images.unsplash.com/photo-1493916665398-143bdeabe500?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=5e5d266c2a5c33fdbba50dc527153596',
      'https://images.unsplash.com/uploads/1412433710756bfa9ec14/d568362b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=630f45d267d7be067973f2217a9c037a',
      'https://images.unsplash.com/photo-1442605527737-ed62b867591f?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=317df4ad632853522be3f86901bd2e7b',
      'https://images.unsplash.com/photo-1437957146754-f6377debe171?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=ff6c262394fe6778b838855291c54738',
      'https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=d550886c271e4d1f871a599aec010c3c',
      'https://images.unsplash.com/photo-1424709746721-b8fd0ff52499?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=f6d03769f9ea2a1be1d5d725c4eaa534',
      'https://images.unsplash.com/photo-1505628346881-b72b27e84530?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=7d89802da15a2d27f1c1ff863ac0ebd1',
      'https://images.unsplash.com/photo-1475954704693-ac6850a71ee0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=d1cf079de91b8c69a05c974b2cdf7362',
      'https://images.unsplash.com/reserve/UzWklzFdRBSbkRKhEnvc_1-6128.jpg?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=1c8c28b7420d3fe1adaaee65890e7334',
      'https://images.unsplash.com/photo-1494913148647-353ae514b35e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=314f0256af666722733dce6a78e46ba4',
      'https://images.unsplash.com/photo-1480166423123-8170a170b376?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=30007dafe5745c9ff1196123f6df85c7',
      'https://images.unsplash.com/photo-1447768005573-3b54cdf058a2?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=29d2b48cf3b02c84193ae87122c6b947',
      'https://images.unsplash.com/photo-1433162653888-a571db5ccccf?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=5af0fb2de95e3e0007dd5d0ea9214822',
      'https://images.unsplash.com/photo-1477868433719-7c5f2731b310?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=931e6019c6554bb989fc26406510592d',
      'https://images.unsplash.com/photo-1497994187231-bc847a69dc76?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=b9a842f9c8697e7c2b37bd929cfd69a3',
      'https://images.unsplash.com/photo-1497994139250-caecb78f9df9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=0449e861f2b295a1233734bff0cf02be',
      'https://images.unsplash.com/photo-1425678013935-cafcfb4272c7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=fb973d234435bb7393c4ac59cf7d6c04',
    ]

    this.initOserver()
  }

  componentDidMount() {
    this.observer.observe()
  }

  initOserver() {
    this.observer = window.lozad('.lozad', {
      load: (el: HTMLElement) => {
        el.src = el.dataset.src
        el.onload = () => {
          el.classList.add('fade')
          el.classList.add('loaded')

          this.props.showToastMessage({
            title: 'Image Loaded',
            content: el.getAttribute('data-index'),
          })
        }
      },
    })
  }

  render() {
    return (
      <div>
        <Main>
          <ToastContainer />
          <Heading>
            <p>
              Lazy image loading example with{' '}
              <a
                href="https://www.npmjs.com/package/lozad"
                rel="noopener noreferrer"
                target="_blank">
                lozad.js
              </a>
            </p>
            <p>
              All photos are come from&nbsp;
              <a
                href="https://unsplash.com/"
                rel="noopener noreferrer"
                target="_blank">
                unsplash
              </a>
            </p>
          </Heading>
          {this.images.map((src, i) =>
            <LazyImage key={i}>
              <IndexNo>
                {i + 1}
              </IndexNo>
              <img
                data-index={i + 1}
                className="lozad"
                data-src={src}
                alt={i}
              />
              <LoadingLayer />
            </LazyImage>
          )}

          <Heading>
            <p>
              <a
                href="https://rhostem.github.io"
                rel="noopener noreferrer"
                target="_blank">
                rhostem.github.io
              </a>
            </p>
          </Heading>
        </Main>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  dataList: state.getIn(['data', 'list']),
})

const mapDispatchToProps = (dispatch: Function) =>
  bindActionCreators(
    Object.assign(
      {},
      {
        showToastMessage,
      }
    ),
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
