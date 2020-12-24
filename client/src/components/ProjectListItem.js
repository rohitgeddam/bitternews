import caret from '../assets/images/bleach.png'; // Tell webpack this JS file uses this image

function ProjectListItem(props) {
    return (
  
  <div class="box project-list-item__box">
  <article class="media">
    <div class="media-left upvote-container">
     <button class="upvote-container__button"><img src={caret} width="16px"/></button>
     <small>{props.voteCount}</small>
    </div>
    <div class="media-content">
      <div class="content">
        <p>
          <strong>{props.title}</strong> <small>@{props.postedBy}</small>
          <br/>
            {props.description}
        </p>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item" aria-label="reply">
            <span class="icon is-small">
              <i class="fas fa-reply" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="retweet">
            <span class="icon is-small">
              <i class="fas fa-retweet" aria-hidden="true"></i>
            </span>
          </a>
          <a class="level-item" aria-label="like">
            <span class="icon is-small">
              <i class="fas fa-heart" aria-hidden="true"></i>
            </span>
          </a>
        </div>
      </nav>
    </div>
  </article>
</div>

    );
  }
  
  export default ProjectListItem;
  