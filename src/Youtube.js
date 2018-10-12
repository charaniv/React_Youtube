import React, {Component} from 'react';
import YTSearch from 'youtube-api-search';

const API = 'AIzaSyA3NTMRiAIjg0qSftu4XfE7MISRRoDD9uM';

class Youtube extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchTerm: '',
            resultvideos: [],
            liked_videos: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.clicked = this.clicked.bind(this);
        this.postLikes = this.postLikes.bind(this);
    }

    videoSearch(searchTerm) {
        YTSearch({key: API, term: searchTerm}, (data) => {
            this.setState({
                resultvideos: data.map(obj => obj.id.videoId),
            });
        });
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({searchTerm: value});
    }

    
    clicked() {
        this.videoSearch(this.state.searchTerm);
    }

    componentDidMount() {
        fetch(`http://localhost:3000/liked_videos`).then(result => result.json()).then((resJSON) => {
            console.log(resJSON);
            this.setState({liked_videos: resJSON.map(obj => obj.id)});
        })
    }

    postLikes(e, link) {
        fetch('http://localhost:3000/post_likes', {
            method: 'post',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                id: link
            })
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log('Request failed', error)
        });
    }



    render() {
        return(
            <div>
             <input type="text" value = {this.state.searchTerm} onChange = {this.handleChange} />
             <button onClick={this.clicked}>Get Youtube Videos</button>
             {
                   
                 this.state.resultvideos.map((link, i) => {
                     var frame = <div key = {i}>
                     <iframe width="560" height="315" src={`https://www.youtube.com/embed/${link}`}
                     frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                     <button disabled = {this.state.liked_videos.includes(link)} onClick = {(e) => this.postLikes(e,link)}>Like</button>
                     <button>Display Comments</button>
                    </div>
                    console.log(this.state.liked_videos);
                    console.log(link + this.state.liked_videos.includes(link));
                    return frame;
                 })
             }
             {this.frame}
            </div>
        );
    }
}

export default Youtube;