import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotosAsync } from '../admin/photosSlice'
import { useParams } from 'react-router-dom'
import { Container, Image, Row, Col } from 'react-bootstrap'
import LoadingComponent from '../../app/components/LoadingComponent'

export default function SingleAlbum() {
  const params = useParams()
  const albumId = params.albumId
  const photos = useSelector((state) => state.photos)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchPhotosAsync(albumId))
  }, [dispatch])
  if (!photos.photosLoaded)
    return <LoadingComponent message="Loading photos..." />

  return (
    <Container fluid style={{ marginTop: 50 }}>
      <Row xs={1} md={4} className="g-4">
        {photos.photos.map((photo, i) => (
          <Col key={i}>
            {/* <div className="photoFrame"> */}
            <Image
              className="photos"
              src={photo.url}
              onClick={() => window.open(photo.url)}
            />
            {/* </div> */}
          </Col>
        ))}
      </Row>
    </Container>
  )
}
