import React from 'react';

import BlogCard from './types/blog';
import ImageCard from './types/image';
import QuestionCard from './types/question';
import UpdateCard from './types/update';
import VideoCard from './types/video';

export default function TimelineCard({ cardProps, instance }) {
  const getCard = (type) => {
    return {
      picture: ImageCard,
      video: VideoCard,
      updates: UpdateCard,
      question: QuestionCard,
      blog: BlogCard,
    }[type];
  };

  const Card = getCard(cardProps.state);
  return (
    <div className="item">
      <div className="timeline-icon" />
      <Card card={cardProps} instance={instance} />
    </div>
  );
}
