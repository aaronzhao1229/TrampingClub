import React, { useEffect } from 'react'

import { fetchVideosAsync, deleteVideoAsync } from './videoSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function ManageVideos() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const videos = useSelector((state) => state.videos)

  useEffect(() => {
    if (!videos.videosLoaded) dispatch(fetchVideosAsync())
  }, [dispatch, videos.videosLoaded])

  if (videos.videos.length === 0) return <h6>No video created.</h6>

  return (
    <Container>
      <Row xs={1} md={2} className="g-4">
        {[...videos.videos].reverse().map((video, i) => (
          <Col key={i}>
            <h6 className="mb-3">{video.videoTitle}</h6>

            {/* <video controls width="70%" src={videos.videoUrl}></video> */}
            <div className="ratio ratio-16x9">
              <iframe
                width="560"
                height="315"
                src={video.videoUrl}
                title={video.videoTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Row>
              <Col>
                <Button
                  onClick={() => navigate(`/editVideo/${video.videoId}`)}
                  variant="primary"
                >
                  Edit
                </Button>
              </Col>
              <Col>
                <Button
                  variant="danger"
                  onClick={() => dispatch(deleteVideoAsync(video.videoId))}
                >
                  {video.status === 'pendingDeleteVideo' + video.videoId ? (
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  ) : (
                    'Delete'
                  )}
                </Button>
              </Col>
            </Row>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
