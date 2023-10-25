import React from 'react'

const NewsItem = (props) => {
    let {title,description, imgurl, newsUrl,credit, date, channel}= props;
    return (
      <div className="my-3">
        <div className="card" style={{width: '19rem',marginLeft: '1rem'}}>
          <div className="d-flex position-absolute end-0">
            <span className="badge rounded-pill bg-danger" style={{left:"90%",}}>{channel}</span>
          </div>
            <img src={imgurl==="https://s0.wp.com/i/blank.jpg"?"https://www.brainstormcomics.com/wp-content/uploads/2019/05/breakingnews.jpg":imgurl} className="card-img-top" height="225" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {credit} on {new Date(date).toGMTString()}</small></p>
                <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
      </div>
    )
}

export default NewsItem