import { Row } from 'react-bootstrap';
import CardFooter from '../../cardFooter';
import CardHeader from '../../cardHeader';
import CardTags from '../../cardTags';
import QuestionTitle from './cardDescription';

export default function CardQuestion({ card, instance }) {
  const {
    name,
    city,
    pro,
    abs_url: absUrl,
    created_at: createdAt,
    seen_count: seenCount,
  } = instance;
  const { nodeURL, is_new, profileURL } = card;

  const propsHeader = { profileURL, nodeURL, is_new, icon: 'question-circle' };
  const propsTags = { city, pro, map: false };
  const propsFooter = { absUrl, createdAt, seenCount };
  return (
    <div className="cbp_tmlabel">
      <CardHeader title={card.name} username={card.fullName} {...propsHeader} />
      <Row>
        <QuestionTitle name={name} nodeURL={nodeURL} />
        <CardTags {...propsTags} />
        <CardFooter {...propsFooter} />
      </Row>
    </div>
  );
}
