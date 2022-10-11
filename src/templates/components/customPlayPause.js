import React, { Component } from 'react'
import { withMediaProps } from 'react-media-player'
import { Button } from '@material-ui/core'

class CustomPlayPause extends Component {

  shouldComponentUpdate({ media }) {
    return this.props.media.isPlaying !== media.isPlaying
    
  }

 
  _handlePlayPause = () => {

    
    console.log('hellooo',this.props.media.isPlaying);
    console.log('mediaii',this.props.Player);
  
    this.props.media.playPause()
  }

  render() {
    const { className, style, media } = this.props
    return (
      <Button
        type="button"
        className={className}
        style={style}
        onClick={this._handlePlayPause}
        
      >
        {media.isPlaying ? 'Pause' : 'Play'}
      </Button>
    )
  }
}
 
export default withMediaProps(CustomPlayPause)