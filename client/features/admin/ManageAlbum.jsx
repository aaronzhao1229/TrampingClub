import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAlbumAsync, removeAlbumAsync } from './albumSlice'
import { Card, Row, Col, Container, Button, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { convertDateToString } from '../../app/utils/utils'

export default function ManageAlbum() {
  const album = useSelector((state) => state.album)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAlbumAsync())
  }, [])
  if (album.album.length === 0) return <h6>No Album created.</h6>
  return (
    <Container fluid>
      <Row xs={1} md={4} className="g-4">
        {album.album.map((trip) => (
          <Col key={trip.albumId}>
            <Card>
              <Card.Img
                variant="top"
                src={trip.photoUrl}
                style={{ objectFit: 'contain' }}
              />
              <Card.Body>
                <Card.Title>{trip.albumName}</Card.Title>
                <Card.Text>{convertDateToString(trip.tripDate)}</Card.Text>
                <Row>
                  <Col>
                    <Button
                      onClick={() => navigate(`/manageAlbum/${trip.albumId}`)}
                      variant="primary"
                    >
                      Edit
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="danger"
                      onClick={() => dispatch(removeAlbumAsync(trip.albumId))}
                    >
                      {album.status === 'pendingRemoveAlbum' + trip.albumId ? (
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
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
