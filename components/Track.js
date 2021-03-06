import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Row, Col } from 'react-styled-flexboxgrid'
import { formattedTime } from '../lib/utils'

const TrackItem = styled(Col)`
  margin-bottom: 1em;
  color: ${props => props.theme.color.grayB};
  border-bottom: 1px solid ${props => props.theme.color.grayA};
  cursor: pointer;
  transition: .3s;
  padding: 0;
  &:hover {
    background: ${props => props.theme.color.grayB};
    color: ${props => props.theme.color.grayA};
  }
`
const Album = styled.div`
  font-weight: bold;
  display: flex;
  align-items: center;
  color ${props => props.theme.color.grayB};
  img {
    min-width: 70px;
  }
  span {
    margin-left: 1em;
    display: inline-block;
  }
`
const Time = styled.div`
  text-align: right;
  padding-right: 1em;
`

class Track extends Component {

  handleClick = () => {
    this.props.dispatch({
      type: 'SET_PLAYLIST',
      payload: {
        playlist: [{ ...this.props }],
      },
    })
    this.props.dispatch({
      type: 'SET_CURRENT_TRACK',
      payload: {
        index: 0,
      },
    })
    this.props.dispatch({
      type: 'SET_ALBUM_DATA',
      payload: {
        data: this.props.album,
      },
    })
  }

  render() {
    return (
      <TrackItem xs={12} onClick={this.handleClick}>
        <Row middle="xs">
          <Col xs={12} sm={5}>
            <Album>
              <img
                src={this.props.album.images[1].url}
                width="70"
                height="70"
                alt={this.props.album.name}
              />
              <span>
                {this.props.name}
              </span>
            </Album>
          </Col>
          <Col xs={8} sm={5}>
            {this.props.album.name}
          </Col>
          <Col xs={4} sm={2}>
            <Time>
              {formattedTime(this.props.duration_ms)}
            </Time>
          </Col>
        </Row>
      </TrackItem>
    )
  }
}

Track.propTypes = {
  name: PropTypes.string.isRequired,
  album: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  duration_ms: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(null)(Track)
