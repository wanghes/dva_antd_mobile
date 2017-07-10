import PropTypes from 'prop-types';
import classnames from 'classnames';
// import styles from './oilVideo.less';
import videojs from 'video.js';

import './oilVideo.less';
// import GM from 'g2-mobile';
// import echarts from 'echarts';


class oilVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidMount () {
        let MV = videojs(this.refs.myVideo,{
        });
    }

    render() {
        let videoCalss = classnames({
            "video-js": true,
            "vjs-default-skin": true,
            "vjs-big-play-centered": true
        });
        let src = 'http://static.qiakr.com/movie/0060202.mp4';
        let preload = 'auto';//'auto' 'metadata'
        let poster = 'http://static.qiakr.com/app/full_res.jpg';
        return (
            <div className="video">
               <video ref="myVideo" style={{"display":"block","width": "100%","height": "100%"}}  className={videoCalss} controls preload={preload} poster={poster}>
                    <source id="sourceBox" src={src} type='video/mp4'/>
                    <p className="vjs-no-js">不支持播放</p>
                </video>
            </div>
        )
    }
}

export default oilVideo;

