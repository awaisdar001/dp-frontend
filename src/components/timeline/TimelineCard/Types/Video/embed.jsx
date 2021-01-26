import { Col, ResponsiveEmbed } from 'react-bootstrap';

export default function VideoEmbed({ source, videoUrl }) {
  const sourceToUrls = (source, videoUrl) => {
    return {
      Youtube: `https://www.youtube.com/embed/${videoUrl}?rel=0`,
      Vimeo: `//player.vimeo.com/video/${videoUrl}?title=0&byline=0&portrait=0&hd=true`,
      DailyMotion: `https://www.dailymotion.com/embed/video/${videoUrl}?autoplay=0&logo=0&info=0&hideInfos=0&start=0&syndication=226853&foreground=&highlight=&background=`,
    }[source];
  };

  return (
    <Col md={12}>
      <div style={{ width: '100%', height: 'auto' }}>
        {source && videoUrl && (
          <ResponsiveEmbed aspectRatio="16by9">
            <embed src={sourceToUrls(source, videoUrl)} />
          </ResponsiveEmbed>
        )}
      </div>
    </Col>
  );
}
