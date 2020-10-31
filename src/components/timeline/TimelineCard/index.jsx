import React from 'react';
import CardBlog from './Types/Blog';
import CardImage from './Types/Image';
import CardQuestion from './Types/Question';
import CardUpdate from './Types/Update';
import CardVideo from './Types/Video';

export default function TimelineCard(props) {
  const getCardFromType = (type) => {
    return {
      picture: CardImage,
      video: CardVideo,
      updates: CardUpdate,
      question: CardQuestion,
      blog: CardBlog,
    }[type];
  };
  const { card, instance } = props;
  const Card = getCardFromType(card.type);
  return (
    <div className="item">
      <div className="timeline-icon" />
      <Card card={card} instance={instance} />
    </div>
  );
}
